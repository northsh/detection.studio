<script lang="ts" setup>
import {computed, onUnmounted, ref, watch} from "vue";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {AlertCircleIcon, AlertTriangleIcon, FlaskConicalIcon, LoaderIcon, SearchIcon, XIcon} from "lucide-vue-next";
import {Button} from "@/components/ui/button";

import {Input} from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

const workspace = useWorkspaceStore();
const data = computed(() => workspace.currentWorkspace?.dataStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());
const activeTab = ref("summary");
const rowsPerPage = ref(10);
const currentPage = ref(0);
const showErrorDetails = ref(false);

// Access rsigma evaluation results from the sigma store
const searchResults = computed(() => sigma.value?.search_results ?? null);

// Validation metadata from auto-loaded SigmaHQ regression test data
const validationMetadata = computed(() => data.value?.validation_metadata ?? null);
const validationLoading = computed(() => sigma.value?.validation_loading ?? false);
const validationError = computed(() => sigma.value?.validation_error ?? "");

// Compare actual match count vs expected match count from validation metadata
const validationResult = computed(() => {
    if (!validationMetadata.value || !searchResults.value) return null;
    const expected = validationMetadata.value.expectedMatchCount;
    const actual = searchResults.value.stats?.totalMatches ?? 0;
    return {
        expected,
        actual,
        passed: actual === expected,
    };
});

// Extract the matched event field names so we can highlight them in the table.
const matchedFieldNames = computed(() => {
    const fields = new Set<string>();
    if (!searchResults.value?.matches) return fields;
    for (const m of searchResults.value.matches) {
        for (const rule of m.matched_rules) {
            for (const f of rule.matched_fields) {
                fields.add(f.field);
            }
        }
    }
    return fields;
});

// Field analysis from rsigma
const fieldAnalysis = computed(() => searchResults.value?.fieldAnalysis ?? null);

// Flatten matched events for display: each row is the original event object
const tableData = computed(() => {
    if (!searchResults.value?.matches) return [];
    return searchResults.value.matches.map((m: any) => m.event);
});

// Column names derived from the first matched event
const columnKeys = computed(() => {
    if (tableData.value.length === 0) return [];
    return Object.keys(tableData.value[0]);
});

// Simple pagination
const totalPages = computed(() => Math.ceil(tableData.value.length / rowsPerPage.value));
const paginatedRows = computed(() => {
    const start = currentPage.value * rowsPerPage.value;
    return tableData.value.slice(start, start + rowsPerPage.value);
});
const canPrevious = computed(() => currentPage.value > 0);
const canNext = computed(() => currentPage.value < totalPages.value - 1);
const showingFrom = computed(() => currentPage.value * rowsPerPage.value + 1);
const showingTo = computed(() => Math.min((currentPage.value + 1) * rowsPerPage.value, tableData.value.length));

function formatCellValue(value: any, key: string): string {
    if (value === undefined || value === null) return '';
    const str = typeof value === 'object' ? JSON.stringify(value) : String(value);
    if (matchedFieldNames.value.has(key)) {
        return `<span class="matched-cell">${str}</span>`;
    }
    return str;
}

// Format bytes to human-readable format
function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// ── Raw Data tab: line-based preview with regex search (off main thread) ──

const RAW_LINES_PER_PAGE = 200;
const rawSearchQuery = ref("");
const rawSearchError = ref("");
const rawVisibleLines = ref(RAW_LINES_PER_PAGE);
const rawSearching = ref(false);

// Reactive results populated by the worker
const rawDisplayLines = ref<{ lineNo: number; text: string; html: string }[]>([]);
const rawMatchCount = ref<number | null>(null);
const totalLineCount = ref(0);

// ── Worker lifecycle ────────────────────────────────────────────────
let rawWorker: Worker | null = null;
let nextSearchId = 0;
let activeSearchId = -1; // id of the most recent request so we can ignore stale responses
let searchDebounce: ReturnType<typeof setTimeout> | null = null;
// Track the raw text we last sent so we only transfer it when it changes.
let lastSentRaw: string | undefined;

function initRawWorker() {
    if (rawWorker) return;
    rawWorker = new Worker(
        new URL("../workers/rawSearchWorker.ts", import.meta.url),
        { type: "module" },
    );
    rawWorker.onmessage = (e) => {
        const msg = e.data;
        // Ignore stale responses
        if (msg.id !== activeSearchId) return;

        rawSearching.value = false;

        if (msg.type === "error") {
            rawSearchError.value = msg.error;
            rawDisplayLines.value = [];
            rawMatchCount.value = null;
            return;
        }
        if (msg.type === "result") {
            rawSearchError.value = "";
            rawDisplayLines.value = msg.lines;
            rawMatchCount.value = msg.matchCount;
            totalLineCount.value = msg.totalLines;
        }
    };
}

function dispatchSearch(forceText = false) {
    if (!rawWorker) initRawWorker();

    const raw = data.value?.current_data_frame ?? "";
    const sendText = forceText || raw !== lastSentRaw;
    if (sendText) lastSentRaw = raw;

    const id = nextSearchId++;
    activeSearchId = id;
    rawSearching.value = true;

    rawWorker!.postMessage({
        type: "search",
        id,
        rawText: sendText ? raw : undefined,
        pattern: rawSearchQuery.value.trim(),
        limit: rawVisibleLines.value,
    });
}

// Debounced watcher: fires when query, visible-line limit, or underlying data changes.
function scheduleSearch(forceText = false) {
    if (searchDebounce) clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => dispatchSearch(forceText), 150);
}

watch(rawSearchQuery, () => {
    rawVisibleLines.value = RAW_LINES_PER_PAGE;
    scheduleSearch();
});

watch(rawVisibleLines, () => scheduleSearch());

// When the raw data itself changes (or on initial mount), send it to the worker.
watch(() => data.value?.current_data_frame, () => scheduleSearch(true), { immediate: true });

const rawHasMore = computed(() => {
    if (rawMatchCount.value !== null) {
        return rawMatchCount.value > rawDisplayLines.value.length;
    }
    return totalLineCount.value > rawVisibleLines.value;
});

function loadMoreRawLines() {
    rawVisibleLines.value += RAW_LINES_PER_PAGE;
}

onUnmounted(() => {
    if (searchDebounce) clearTimeout(searchDebounce);
    rawWorker?.terminate();
    rawWorker = null;
});
</script>

<template>
  <div class="h-full w-full flex flex-col gap-0 overflow-hidden">
    <!-- Data is loaded -->
    <template v-if="data?.current_data_frame">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-border/60">
        <div class="flex items-center gap-3">
          <span class="text-xs font-medium text-foreground">Sample Data</span>

          <!-- Status pill: ready -->
          <span
            v-if="sigma?.is_data_loaded"
            class="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-[oklch(0.625_0.170_160)]"></span>
            Ready
          </span>

          <!-- Status pill: loading -->
          <span
            v-else-if="!sigma?.data_loading_error"
            class="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground"
          >
            <LoaderIcon class="w-2.5 h-2.5 animate-spin" />
            Loading
          </span>

          <!-- Status pill: error -->
          <button
            v-else
            class="inline-flex items-center gap-1 text-[10px] font-medium text-destructive hover:text-destructive/80 transition-colors"
            @click="showErrorDetails = !showErrorDetails"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-destructive"></span>
            Error
          </button>

          <!-- SigmaHQ validation pill -->
          <span
            v-if="validationMetadata"
            class="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground"
          >
            <FlaskConicalIcon class="w-2.5 h-2.5" />
            SigmaHQ
          </span>

          <!-- Validation loading pill -->
          <span
            v-if="validationLoading"
            class="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground"
          >
            <LoaderIcon class="w-2.5 h-2.5 animate-spin" />
            Test data
          </span>
        </div>

        <!-- Error detail popover -->
        <div
          v-if="showErrorDetails && sigma?.data_loading_error"
          class="absolute top-12 right-4 bg-popover border border-border text-popover-foreground p-3 rounded-lg text-xs z-10 max-w-md shadow-lg"
        >
          <div class="flex justify-between items-center mb-2">
            <span class="text-[10px] uppercase tracking-wider text-muted-foreground">Error Details</span>
            <button class="text-muted-foreground hover:text-foreground transition-colors ml-4" @click="showErrorDetails = false">
              <XIcon class="w-3 h-3" />
            </button>
          </div>
          <div class="whitespace-pre-wrap text-destructive font-mono">{{ sigma.data_loading_error }}</div>
        </div>

        <Button
          class="h-6 text-[11px] gap-1"
          size="sm"
          variant="ghost"
          @click="data.clearCurrentDataFrame()"
        >
          <XIcon class="h-3 w-3" />
          Clear
        </Button>
      </div>

      <!-- Tabs -->
      <Tabs v-model="activeTab" class="flex-1 min-h-0 flex flex-col">
        <div class="px-4 border-b border-border/60">
          <TabsList class="bg-transparent p-0 h-auto gap-0 rounded-none">
            <TabsTrigger
              value="summary"
              class="rounded-none border-b-2 border-transparent px-3 py-2 text-xs font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-colors"
            >
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="matches"
              class="rounded-none border-b-2 border-transparent px-3 py-2 text-xs font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-colors"
            >
              Matches
              <span
                v-if="searchResults?.stats?.totalMatches"
                class="ml-1.5 tabular-nums text-[10px] text-muted-foreground"
              >{{ searchResults.stats.totalMatches }}</span>
            </TabsTrigger>
            <TabsTrigger
              value="raw"
              class="rounded-none border-b-2 border-transparent px-3 py-2 text-xs font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-colors"
            >
              Raw
            </TabsTrigger>
          </TabsList>
        </div>

        <!-- Summary Tab -->
        <TabsContent
          class="flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col overflow-y-auto mt-0"
          value="summary"
        >
          <div class="flex flex-col gap-px">

            <!-- Evaluation error notice -->
            <div
              v-if="sigma?.search_error"
              class="mx-4 mt-4 flex items-start gap-2.5 p-3 rounded-md border border-destructive/25 bg-destructive/5"
            >
              <AlertCircleIcon class="h-3.5 w-3.5 shrink-0 text-destructive mt-0.5" />
              <div>
                <p class="text-xs font-medium text-foreground">Evaluation error</p>
                <p class="text-xs text-muted-foreground mt-0.5">{{ sigma.search_error }}</p>
              </div>
            </div>

            <!-- Searching indicator -->
            <div
              v-else-if="sigma?.is_searching"
              class="mx-4 mt-4 flex items-center gap-2 text-xs text-muted-foreground"
            >
              <LoaderIcon class="h-3 w-3 animate-spin shrink-0" />
              <span>Evaluating rule against dataset…</span>
            </div>

            <!-- Stats: with evaluation results -->
            <div v-if="searchResults" class="grid grid-cols-4 divide-x divide-border/60 border-b border-border/60 mt-0">
              <div class="px-4 py-4 flex flex-col gap-1">
                <span class="text-[10px] uppercase tracking-wider text-muted-foreground/70">Records</span>
                <span class="text-2xl font-semibold tabular-nums leading-none">{{ searchResults.stats.totalRecords.toLocaleString() }}</span>
              </div>
              <div class="px-4 py-4 flex flex-col gap-1">
                <span class="text-[10px] uppercase tracking-wider text-muted-foreground/70">Matches</span>
                <span
                  class="text-2xl font-semibold tabular-nums leading-none"
                  :class="searchResults.stats.totalMatches > 0 ? 'text-[oklch(0.625_0.170_160)]' : ''"
                >{{ searchResults.stats.totalMatches.toLocaleString() }}</span>
              </div>
              <div class="px-4 py-4 flex flex-col gap-1">
                <span class="text-[10px] uppercase tracking-wider text-muted-foreground/70">Match rate</span>
                <span class="text-2xl font-semibold tabular-nums leading-none">
                  {{ searchResults.stats.totalRecords ? Math.round((searchResults.stats.totalMatches / searchResults.stats.totalRecords) * 100) : 0 }}%
                </span>
              </div>
              <div class="px-4 py-4 flex flex-col gap-1">
                <span class="text-[10px] uppercase tracking-wider text-muted-foreground/70">File size</span>
                <span class="text-2xl font-semibold tabular-nums leading-none">{{ formatBytes(data?.current_data_frame?.length || 0) }}</span>
              </div>
            </div>

            <!-- Stats: data loaded, no rule active -->
            <div v-else class="grid grid-cols-2 divide-x divide-border/60 border-b border-border/60">
              <div class="px-4 py-4 flex flex-col gap-1">
                <span class="text-[10px] uppercase tracking-wider text-muted-foreground/70">File size</span>
                <span class="text-2xl font-semibold tabular-nums leading-none">{{ formatBytes(data?.current_data_frame?.length || 0) }}</span>
              </div>
              <div class="px-4 py-4 flex flex-col gap-1">
                <span class="text-[10px] uppercase tracking-wider text-muted-foreground/70">Lines</span>
                <span class="text-2xl font-semibold tabular-nums leading-none">{{ totalLineCount.toLocaleString() }}</span>
              </div>
            </div>

            <!-- No rule hint -->
            <div v-if="!searchResults" class="px-4 py-3 flex items-start gap-2.5">
              <SearchIcon class="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 mt-0.5" />
              <p class="text-xs text-muted-foreground">
                Open or create a Sigma rule to evaluate it against this dataset.
              </p>
            </div>

            <!-- SigmaHQ Validation -->
            <div v-if="validationMetadata" class="mx-4 my-4 rounded-md border border-border/60 overflow-hidden">
              <!-- Validation header row -->
              <div
                class="flex items-center justify-between px-3 py-2.5 border-b border-border/60"
                :class="validationResult?.passed ? 'bg-[oklch(0.625_0.170_160)]/5' : validationResult ? 'bg-destructive/5' : 'bg-muted/40'"
              >
                <div class="flex items-center gap-2">
                  <FlaskConicalIcon class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span class="text-xs font-medium text-foreground">SigmaHQ Regression Test</span>
                  <span v-if="validationMetadata.provider" class="text-[10px] text-muted-foreground/70">{{ validationMetadata.provider }}</span>
                </div>
                <span
                  v-if="validationResult"
                  class="text-[10px] font-medium"
                  :class="validationResult.passed ? 'text-[oklch(0.625_0.170_160)]' : 'text-destructive'"
                >
                  {{ validationResult.passed ? 'Passed' : 'Failed' }}
                </span>
              </div>

              <!-- Test name -->
              <div class="px-3 py-2 border-b border-border/60">
                <p class="text-[11px] text-muted-foreground font-mono">{{ validationMetadata.testName }}</p>
              </div>

              <!-- Expected vs actual counts -->
              <div class="grid grid-cols-2 divide-x divide-border/60">
                <div class="px-3 py-3 flex flex-col gap-0.5">
                  <span class="text-[10px] uppercase tracking-wider text-muted-foreground/70">Expected</span>
                  <span class="text-xl font-semibold tabular-nums leading-none">{{ validationMetadata.expectedMatchCount }}</span>
                </div>
                <div class="px-3 py-3 flex flex-col gap-0.5">
                  <span class="text-[10px] uppercase tracking-wider text-muted-foreground/70">Actual</span>
                  <span
                    class="text-xl font-semibold tabular-nums leading-none"
                    :class="validationResult?.passed ? 'text-[oklch(0.625_0.170_160)]' : validationResult ? 'text-destructive' : ''"
                  >
                    {{ validationResult ? validationResult.actual : '—' }}
                  </span>
                </div>
              </div>

              <p v-if="validationError" class="px-3 pb-3 text-[11px] text-destructive">{{ validationError }}</p>
            </div>

            <!-- Missing fields warning -->
            <div
              v-if="fieldAnalysis?.missingFields?.length"
              class="mx-4 mb-4 flex items-start gap-2.5 p-3 rounded-md border border-border/60 bg-muted/30"
            >
              <AlertTriangleIcon class="h-3.5 w-3.5 shrink-0 text-muted-foreground mt-0.5" />
              <div class="min-w-0">
                <p class="text-xs font-medium text-foreground mb-1">
                  {{ fieldAnalysis.missingFields.length }} rule {{ fieldAnalysis.missingFields.length > 1 ? 'fields' : 'field' }} not in dataset
                </p>
                <p class="text-[11px] text-muted-foreground mb-2">
                  These fields exist in the rule's detection section but not in your sample data. A field mapping pipeline may be needed.
                </p>
                <div class="flex flex-wrap gap-1">
                  <code
                    v-for="field in fieldAnalysis.missingFields"
                    :key="field"
                    class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted border border-border/60 text-muted-foreground"
                  >{{ field }}</code>
                </div>
              </div>
            </div>

            <!-- Field coverage grids -->
            <div
              v-if="fieldAnalysis && fieldAnalysis.ruleFields.length > 0"
              class="grid grid-cols-1 md:grid-cols-2 gap-px border-t border-border/60"
            >
              <!-- Rule fields -->
              <div class="px-4 py-4 border-r border-border/60">
                <p class="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-2.5">Rule detection fields</p>
                <div class="flex flex-wrap gap-1">
                  <code
                    v-for="field in fieldAnalysis.ruleFields"
                    :key="field"
                    class="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                    :class="fieldAnalysis.missingFields.includes(field)
                      ? 'bg-destructive/5 border-destructive/25 text-destructive'
                      : 'bg-[oklch(0.625_0.170_160)]/5 border-[oklch(0.625_0.170_160)]/25 text-[oklch(0.625_0.170_160)]'"
                  >{{ field }}</code>
                </div>
              </div>

              <!-- Dataset fields -->
              <div class="px-4 py-4">
                <p class="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-2.5">
                  Dataset fields
                  <span class="normal-case tracking-normal ml-1 text-muted-foreground/50">({{ fieldAnalysis.dataFields.length }})</span>
                </p>
                <div class="flex flex-wrap gap-1">
                  <code
                    v-for="field in fieldAnalysis.dataFields.slice(0, 30)"
                    :key="field"
                    class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted border border-border/60 text-muted-foreground"
                  >{{ field }}</code>
                  <span
                    v-if="fieldAnalysis.dataFields.length > 30"
                    class="text-[10px] text-muted-foreground/50 self-center"
                  >+{{ fieldAnalysis.dataFields.length - 30 }} more</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <!-- Matches Tab -->
        <TabsContent
          class="flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col mt-0"
          value="matches"
        >
          <!-- Table -->
          <div v-if="tableData.length > 0" class="flex-1 min-h-0 flex flex-col">
            <div class="flex-1 min-h-0 overflow-auto">
              <table class="w-full text-xs border-collapse">
                <thead class="sticky top-0 z-10 bg-muted/60 backdrop-blur-sm">
                  <tr>
                    <th
                      v-for="col in columnKeys"
                      :key="col"
                      class="px-4 py-2 text-left text-[10px] uppercase tracking-wider font-medium text-muted-foreground border-b border-border/60 whitespace-nowrap"
                    >
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border/40">
                  <tr
                    v-for="(row, idx) in paginatedRows"
                    :key="idx"
                    class="hover:bg-muted/20 transition-colors"
                  >
                    <td
                      v-for="col in columnKeys"
                      :key="col"
                      class="px-4 py-2 font-mono text-[11px] text-foreground max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap"
                      v-html="formatCellValue(row[col], col)"
                    ></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="flex justify-between items-center px-4 py-2 border-t border-border/60 shrink-0">
              <span class="text-[11px] text-muted-foreground tabular-nums">
                {{ showingFrom }}–{{ showingTo }} of {{ tableData.length }}
              </span>
              <div class="flex items-center gap-1.5">
                <Button
                  :disabled="!canPrevious"
                  size="sm"
                  variant="ghost"
                  class="h-7 text-xs"
                  @click="currentPage--"
                >Previous</Button>
                <Button
                  :disabled="!canNext"
                  size="sm"
                  variant="ghost"
                  class="h-7 text-xs"
                  @click="currentPage++"
                >Next</Button>
              </div>
            </div>
          </div>

          <!-- Empty: no matches -->
          <div
            v-else-if="sigma?.is_data_loaded && !sigma?.is_searching"
            class="flex-1 flex flex-col items-center justify-center gap-2 text-center px-8"
          >
            <SearchIcon class="h-8 w-8 text-muted-foreground/25" />
            <p class="text-sm font-medium text-muted-foreground">No matches</p>
            <p class="text-xs text-muted-foreground/60 max-w-xs">
              The current Sigma rule doesn't match any events in this dataset.
            </p>
          </div>

          <!-- Empty: searching -->
          <div
            v-else-if="sigma?.is_searching"
            class="flex-1 flex flex-col items-center justify-center gap-2"
          >
            <LoaderIcon class="h-6 w-6 text-muted-foreground/40 animate-spin" />
            <p class="text-xs text-muted-foreground">Searching…</p>
          </div>

          <!-- Empty: no data/rule -->
          <div v-else class="flex-1 flex flex-col items-center justify-center gap-2 text-center px-8">
            <AlertCircleIcon class="h-8 w-8 text-muted-foreground/25" />
            <p class="text-sm font-medium text-muted-foreground">No data available</p>
            <p class="text-xs text-muted-foreground/60 max-w-xs">
              {{ sigma?.data_loading_error || 'Load a Sigma rule and dataset to see matches here.' }}
            </p>
          </div>
        </TabsContent>

        <!-- Raw Data Tab -->
        <TabsContent
          class="flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col mt-0"
          value="raw"
        >
          <!-- Search bar -->
          <div class="px-4 py-2 border-b border-border/60 flex items-center gap-3">
            <div class="relative flex-1">
              <SearchIcon class="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/50" />
              <Input
                v-model="rawSearchQuery"
                class="h-7 pl-8 pr-7 text-[11px] font-mono bg-transparent border-border/60"
                placeholder="Filter with regex…"
              />
              <button
                v-if="rawSearchQuery"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                @click="rawSearchQuery = ''"
              >
                <XIcon class="h-3 w-3" />
              </button>
            </div>
            <div class="flex items-center gap-3 text-[11px] text-muted-foreground/60 whitespace-nowrap tabular-nums shrink-0">
              <span>{{ formatBytes(data?.current_data_frame?.length || 0) }}</span>
              <span>{{ totalLineCount.toLocaleString() }} lines</span>
              <span v-if="rawMatchCount !== null">{{ rawMatchCount.toLocaleString() }} matches</span>
            </div>
          </div>

          <!-- Regex error -->
          <div v-if="rawSearchError" class="px-4 py-1.5 text-[11px] text-destructive border-b border-destructive/20 bg-destructive/5">
            Invalid pattern: {{ rawSearchError }}
          </div>

          <!-- Lines -->
          <div class="flex-1 min-h-0 overflow-auto">
            <table class="w-full">
              <tbody>
                <tr
                  v-for="line in rawDisplayLines"
                  :key="line.lineNo"
                  class="group hover:bg-muted/20 align-top"
                >
                  <td class="pl-4 pr-3 py-px text-[10px] font-mono text-muted-foreground/30 select-none text-right whitespace-nowrap w-px sticky left-0 bg-background/90 backdrop-blur-sm group-hover:bg-muted/20 transition-colors">{{ line.lineNo }}</td>
                  <td
                    class="pl-1 pr-4 py-px text-[11px] font-mono text-foreground/80 whitespace-pre"
                    v-html="line.html"
                  ></td>
                </tr>
              </tbody>
            </table>

            <!-- Load more -->
            <div v-if="rawHasMore" class="flex justify-center py-4">
              <Button size="sm" variant="ghost" class="text-xs text-muted-foreground" @click="loadMoreRawLines">
                Load {{ RAW_LINES_PER_PAGE }} more lines
              </Button>
            </div>

            <!-- Empty search -->
            <div
              v-else-if="rawSearchQuery.trim() && !rawSearchError && !rawSearching && rawDisplayLines.length === 0"
              class="flex flex-col items-center py-12 gap-2 text-muted-foreground/50"
            >
              <SearchIcon class="h-6 w-6" />
              <p class="text-xs">No lines match this pattern</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </template>
  </div>
</template>

<style scoped>
/* Matched cell: primary accent, no background colour */
:deep(.matched-cell) {
    color: var(--primary);
    font-weight: 600;
}

/* Raw view: search match highlight — underline only, no fill */
:deep(mark) {
    background: transparent;
    text-decoration: underline;
    text-decoration-color: var(--primary);
    text-decoration-thickness: 1px;
    color: inherit;
    font-weight: 600;
}
</style>
