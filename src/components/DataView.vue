<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {useFileDialog} from "@vueuse/core";
import {AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, LoaderIcon, PlusIcon, SearchIcon, XIcon} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {Badge} from "@/components/ui/badge";
import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

const workspace = useWorkspaceStore();
const data = computed(() => workspace.currentWorkspace?.dataStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());
const activeTab = ref("summary");
const rowsPerPage = ref(10);
const currentPage = ref(0);
const showErrorDetails = ref(false);

// @ts-ignore
const {open, onChange} = useFileDialog({
    accept: 'application/json,.ndjson,.jsonl',
    directory: false,
})

onChange(async (files: FileList | null) => {
    if (!files?.length || !data.value) return;
    data.value.current_data_frame = await files[0].text();
})

// Access rsigma evaluation results from the sigma store
const searchResults = computed(() => sigma.value?.search_results ?? null);

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
        return `<span class="text-primary-500 font-semibold">${str}</span>`;
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

// ── Raw Data tab: line-based preview with regex search ──────────────
const RAW_LINES_PER_PAGE = 200;
const rawSearchQuery = ref("");
const rawSearchError = ref("");
const rawVisibleLines = ref(RAW_LINES_PER_PAGE);

// Split raw data into lines (cached computed — only runs when data changes)
const rawLines = computed(() => {
    const raw = data.value?.current_data_frame;
    if (!raw) return [];
    return raw.split("\n");
});

const totalLineCount = computed(() => rawLines.value.length);

// Compile regex from search input (debounced via the ref)
const rawSearchRegex = computed<RegExp | null>(() => {
    const q = rawSearchQuery.value.trim();
    if (!q) {
        rawSearchError.value = "";
        return null;
    }
    try {
        const re = new RegExp(q, "i");
        rawSearchError.value = "";
        return re;
    } catch (e) {
        rawSearchError.value = e instanceof SyntaxError ? e.message : String(e);
        return null;
    }
});

// When searching, filter lines; otherwise show the first N lines
const rawDisplayLines = computed<{ lineNo: number; text: string; html: string }[]>(() => {
    const lines = rawLines.value;
    const re = rawSearchRegex.value;
    const limit = rawVisibleLines.value;
    const result: { lineNo: number; text: string; html: string }[] = [];

    if (re) {
        // Search mode: scan all lines but cap output
        for (let i = 0; i < lines.length && result.length < limit; i++) {
            if (re.test(lines[i])) {
                result.push({
                    lineNo: i + 1,
                    text: lines[i],
                    html: highlightMatches(lines[i], re),
                });
            }
        }
    } else {
        // Preview mode: first N lines
        const end = Math.min(lines.length, limit);
        for (let i = 0; i < end; i++) {
            result.push({ lineNo: i + 1, text: lines[i], html: escapeHtml(lines[i]) });
        }
    }
    return result;
});

const rawMatchCount = computed(() => {
    const re = rawSearchRegex.value;
    if (!re) return null;
    let count = 0;
    for (const line of rawLines.value) {
        if (re.test(line)) count++;
    }
    return count;
});

const rawHasMore = computed(() => {
    if (rawSearchRegex.value) {
        return (rawMatchCount.value ?? 0) > rawDisplayLines.value.length;
    }
    return rawLines.value.length > rawVisibleLines.value;
});

function loadMoreRawLines() {
    rawVisibleLines.value += RAW_LINES_PER_PAGE;
}

// Reset visible lines when search changes
watch(rawSearchQuery, () => {
    rawVisibleLines.value = RAW_LINES_PER_PAGE;
});

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function highlightMatches(line: string, re: RegExp): string {
    const escaped = escapeHtml(line);
    // Re-run the regex on the escaped version (safe because we only escape &<>)
    const escapedRe = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
    return escaped.replace(escapedRe, (match) => `<mark class="bg-yellow-400/40 text-yellow-200 rounded-sm px-0.5">${match}</mark>`);
}
</script>

<template>
  <div class="h-full w-full rounded-xl bg-muted/5 flex flex-col gap-2 p-3 overflow-hidden">
    <!-- Empty state - no data uploaded -->
    <div
      v-if="!data?.current_data_frame"
      class="flex flex-col items-center justify-center h-full gap-2"
    >
      <h2 class="text-lg font-semibold">Sample Data</h2>
      <p class="text-sm text-muted-foreground mb-2">Upload sample data to evaluate your Sigma rules against</p>
      <Button class="h-8 flex gap-2" size="sm" @click="open">
        <PlusIcon class="h-3.5 w-3.5" />
        Upload JSON / NDJSON File
      </Button>
    </div>

    <!-- Data is loaded -->
    <template v-else>
      <!-- Header with stats -->
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <h2 class="text-sm font-semibold">Sample Data</h2>

          <!-- Data loaded indicator -->
          <Badge v-if="sigma?.is_data_loaded" class="bg-green-600 hover:bg-green-700">
            <CheckCircleIcon class="h-3 w-3 mr-1" />
            Ready for Analysis
          </Badge>

          <!-- Loading indicator -->
          <Badge v-else-if="!sigma?.data_loading_error" class="bg-orange-500 hover:bg-orange-600">
            <LoaderIcon class="h-3 w-3 mr-1 animate-spin" />
            Loading Data
          </Badge>

          <!-- Error indicator -->
          <Badge
            v-else
            class="bg-red-600 hover:bg-red-700 cursor-pointer"
            @click="showErrorDetails = !showErrorDetails"
          >
            <AlertCircleIcon class="h-3 w-3 mr-1" />
            Error Loading Data
          </Badge>

          <!-- Show error message - explicit error display -->
          <div
            v-if="showErrorDetails && sigma?.data_loading_error"
            class="absolute top-12 right-4 bg-red-900/90 text-white p-3 rounded-md text-xs z-10 max-w-md shadow-lg"
          >
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-semibold">Error Details</h4>
              <button class="text-white hover:text-red-200" @click="showErrorDetails = false">
                ×
              </button>
            </div>
            <div class="whitespace-pre-wrap">{{ sigma.data_loading_error }}</div>
          </div>
        </div>

        <Button
          class="h-7 flex gap-1"
          size="sm"
          variant="outline"
          @click="data.clearCurrentDataFrame()"
        >
          <PlusIcon class="h-3 w-3" />
          Clear
        </Button>
      </div>

      <!-- Data Analysis Tabs -->
      <Tabs v-model="activeTab" class="flex-1 min-h-0 flex flex-col items-start">
        <TabsList class="mb-2">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="matches">
            Matches
            <Badge v-if="searchResults?.stats?.totalMatches" class="ml-1">
              {{ searchResults?.stats?.totalMatches }}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="raw">Raw Data</TabsTrigger>
        </TabsList>

        <!-- Summary Tab -->
        <TabsContent
          class="flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col overflow-y-auto"
          value="summary"
        >
          <div class="flex flex-col gap-3">
            <!-- Status: error / searching -->
            <div
              v-if="sigma?.search_error"
              class="p-3 bg-red-500/10 border border-red-500/30 rounded-md"
            >
              <div class="flex items-center gap-2 text-red-500">
                <AlertCircleIcon class="h-4 w-4 shrink-0" />
                <h3 class="text-sm font-medium">Evaluation Error</h3>
              </div>
              <p class="text-xs mt-1 text-red-400">{{ sigma.search_error }}</p>
            </div>

            <div
              v-else-if="sigma?.is_searching"
              class="p-3 bg-blue-500/10 border border-blue-500/30 rounded-md"
            >
              <div class="flex items-center gap-2 text-blue-500">
                <LoaderIcon class="h-4 w-4 animate-spin" />
                <h3 class="text-sm font-medium">Evaluating...</h3>
              </div>
            </div>

            <!-- Stats row -->
            <div class="grid grid-cols-4 gap-3" v-if="searchResults">
              <Card class="p-3 flex flex-col">
                <span class="text-[10px] uppercase tracking-wider text-muted-foreground">Records</span>
                <span class="text-xl font-semibold mt-1">{{ searchResults.stats.totalRecords }}</span>
              </Card>
              <Card class="p-3 flex flex-col">
                <span class="text-[10px] uppercase tracking-wider text-muted-foreground">Matches</span>
                <span class="text-xl font-semibold mt-1" :class="searchResults.stats.totalMatches > 0 ? 'text-green-400' : ''">
                  {{ searchResults.stats.totalMatches }}
                </span>
              </Card>
              <Card class="p-3 flex flex-col">
                <span class="text-[10px] uppercase tracking-wider text-muted-foreground">Match Rate</span>
                <span class="text-xl font-semibold mt-1">
                  {{ searchResults.stats.totalRecords ? Math.round((searchResults.stats.totalMatches / searchResults.stats.totalRecords) * 100) : 0 }}%
                </span>
              </Card>
              <Card class="p-3 flex flex-col">
                <span class="text-[10px] uppercase tracking-wider text-muted-foreground">File Size</span>
                <span class="text-xl font-semibold mt-1">{{ formatBytes(data?.current_data_frame?.length || 0) }}</span>
              </Card>
            </div>

            <!-- Field coverage warning -->
            <div
              v-if="fieldAnalysis?.missingFields?.length"
              class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-md"
            >
              <div class="flex items-center gap-2 text-amber-500 mb-2">
                <AlertTriangleIcon class="h-4 w-4 shrink-0" />
                <h3 class="text-sm font-medium">
                  {{ fieldAnalysis.missingFields.length }} rule field{{ fieldAnalysis.missingFields.length > 1 ? 's' : '' }} not found in dataset
                </h3>
              </div>
              <p class="text-xs text-muted-foreground mb-2">
                The following fields are referenced in your Sigma rule's detection section but do not exist in any event in your sample data.
                This may indicate a field mapping issue -- consider adding a processing pipeline.
              </p>
              <div class="flex flex-wrap gap-1.5">
                <Badge
                  v-for="field in fieldAnalysis.missingFields"
                  :key="field"
                  variant="outline"
                  class="border-amber-500/50 text-amber-400 text-xs font-mono"
                >
                  {{ field }}
                </Badge>
              </div>
            </div>

            <!-- Field analysis detail -->
            <div
              v-if="fieldAnalysis && fieldAnalysis.ruleFields.length > 0"
              class="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <!-- Rule fields -->
              <Card class="p-3">
                <h3 class="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Rule Detection Fields</h3>
                <div class="flex flex-wrap gap-1.5">
                  <Badge
                    v-for="field in fieldAnalysis.ruleFields"
                    :key="field"
                    variant="outline"
                    class="text-xs font-mono"
                    :class="fieldAnalysis.missingFields.includes(field) ? 'border-amber-500/50 text-amber-400' : 'border-green-500/50 text-green-400'"
                  >
                    {{ field }}
                  </Badge>
                </div>
              </Card>

              <!-- Data fields (abbreviated) -->
              <Card class="p-3">
                <h3 class="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                  Dataset Fields
                  <span class="text-muted-foreground/60">({{ fieldAnalysis.dataFields.length }})</span>
                </h3>
                <div class="flex flex-wrap gap-1.5">
                  <Badge
                    v-for="field in fieldAnalysis.dataFields.slice(0, 30)"
                    :key="field"
                    variant="outline"
                    class="text-xs font-mono text-muted-foreground"
                  >
                    {{ field }}
                  </Badge>
                  <span
                    v-if="fieldAnalysis.dataFields.length > 30"
                    class="text-xs text-muted-foreground/60 self-center"
                  >
                    +{{ fieldAnalysis.dataFields.length - 30 }} more
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <!-- Matches Tab -->
        <TabsContent
          class="flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col"
          value="matches"
        >
          <div
            v-if="tableData.length > 0"
            class="flex-1 min-h-0 overflow-hidden"
          >
            <div class="flex flex-col flex-1 min-h-0">
              <div class="border rounded-md overflow-hidden flex-1 min-h-0 matches-table">
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead class="bg-muted/50">
                      <tr>
                        <th
                          v-for="col in columnKeys"
                          :key="col"
                          class="px-4 py-2 text-left font-medium text-muted-foreground"
                        >
                          {{ col }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(row, idx) in paginatedRows"
                        :key="idx"
                        class="border-t hover:bg-muted/30"
                      >
                        <td
                          v-for="col in columnKeys"
                          :key="col"
                          class="px-4 py-2 text-xs"
                          v-html="formatCellValue(row[col], col)"
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Pagination -->
              <div class="flex justify-between items-center py-2">
                <div class="text-xs text-muted-foreground">
                  Showing {{ showingFrom }} to {{ showingTo }}
                  of {{ tableData.length }} matches
                </div>
                <div class="flex items-center gap-2">
                  <Button
                    :disabled="!canPrevious"
                    size="sm"
                    variant="outline"
                    @click="currentPage--"
                  >
                    Previous
                  </Button>
                  <Button
                    :disabled="!canNext"
                    size="sm"
                    variant="outline"
                    @click="currentPage++"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <!-- No matches state -->
          <div
            v-else-if="sigma?.is_data_loaded && !sigma?.is_searching"
            class="flex flex-col items-center justify-center py-12"
          >
            <SearchIcon class="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 class="text-lg font-medium">No Matches Found</h3>
            <p class="text-sm text-muted-foreground mt-1">
              The current Sigma rule doesn't match any logs in your dataset.
            </p>
          </div>

          <!-- Loading state -->
          <div
            v-else-if="sigma?.is_searching"
            class="flex flex-col items-center justify-center py-12"
          >
            <LoaderIcon class="h-12 w-12 text-muted-foreground/50 mb-4 animate-spin" />
            <h3 class="text-lg font-medium">Searching...</h3>
            <p class="text-sm text-muted-foreground mt-1">Looking for matches in your dataset.</p>
          </div>

          <!-- Other states -->
          <div v-else class="flex flex-col items-center justify-center py-12">
            <AlertCircleIcon class="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 class="text-lg font-medium">No Data Available</h3>
            <p class="text-sm text-muted-foreground mt-1">
              {{
                                sigma?.data_loading_error || 'Please make sure you have a valid Sigma rule and data loaded.'
              }}
            </p>
          </div>
        </TabsContent>

        <!-- Raw Data Tab -->
        <TabsContent
          class="flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col"
          value="raw"
        >
          <!-- Search bar and stats -->
          <div class="flex items-center gap-2 mb-2">
            <div class="relative flex-1">
              <SearchIcon class="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                v-model="rawSearchQuery"
                class="h-8 pl-8 pr-8 text-xs font-mono"
                placeholder="Search with regex (e.g. CommandLine|whoami)"
              />
              <button
                v-if="rawSearchQuery"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                @click="rawSearchQuery = ''"
              >
                <XIcon class="h-3.5 w-3.5" />
              </button>
            </div>
            <div class="flex items-center gap-3 text-xs text-muted-foreground whitespace-nowrap">
              <span>{{ formatBytes(data?.current_data_frame?.length || 0) }}</span>
              <span>{{ totalLineCount.toLocaleString() }} lines</span>
              <span v-if="rawMatchCount !== null">
                <Badge variant="secondary" class="text-xs">{{ rawMatchCount.toLocaleString() }} matches</Badge>
              </span>
            </div>
          </div>

          <!-- Regex error -->
          <div v-if="rawSearchError" class="mb-2 px-2 py-1 text-xs text-red-400 bg-red-500/10 rounded">
            Invalid regex: {{ rawSearchError }}
          </div>

          <!-- Lines display -->
          <ScrollArea class="flex-1 min-h-0 w-full">
            <div class="text-xs rounded-md font-mono min-w-max">
              <table>
                <tbody>
                  <tr
                    v-for="line in rawDisplayLines"
                    :key="line.lineNo"
                    class="hover:bg-muted/30 align-top"
                  >
                    <td class="px-2 py-0.5 text-muted-foreground/50 select-none text-right whitespace-nowrap sticky left-0 bg-background/80 backdrop-blur-sm">{{ line.lineNo }}</td>
                    <td
                      class="px-2 py-0.5 text-slate-300 whitespace-pre"
                      v-html="line.html"
                    ></td>
                  </tr>
                </tbody>
              </table>

              <!-- Load more -->
              <div v-if="rawHasMore" class="flex justify-center py-3">
                <Button size="sm" variant="outline" class="text-xs" @click="loadMoreRawLines">
                  Load more lines
                </Button>
              </div>

              <!-- Empty search result -->
              <div v-else-if="rawSearchRegex && rawDisplayLines.length === 0" class="flex flex-col items-center py-8 text-muted-foreground">
                <SearchIcon class="h-8 w-8 mb-2 opacity-50" />
                <p class="text-sm">No lines match the pattern</p>
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </template>
  </div>
</template>

<style scoped>
:deep(.text-primary-500) {
    color: hsl(var(--primary) / 0.9);
}

/* Matches table: truncate long cell values */
:deep(.matches-table table) {
    border-collapse: collapse;
    width: 100%;
}

:deep(.matches-table table td) {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
