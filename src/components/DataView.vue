<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {useFileDialog} from "@vueuse/core";
import {AlertCircleIcon, CheckCircleIcon, LoaderIcon, PlusIcon, SearchIcon} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {Badge} from "@/components/ui/badge";
import {Card} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import type {ColumnDef} from '@tanstack/vue-table';
import {createTable, getCoreRowModel, getPaginationRowModel, useVueTable,} from '@tanstack/vue-table';

const workspace = useWorkspaceStore();
const data = computed(() => workspace.currentWorkspace?.dataStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());
const activeTab = ref("summary");
const rowsPerPage = ref(10);
const showErrorDetails = ref(false);

// Dynamic columns based on data content
const columns = ref<ColumnDef<any>[]>([]);

// @ts-ignore - Add type safety for useFileDialog
const {files, open, reset, onCancel, onChange} = useFileDialog({
    accept: 'application/json',
    directory: false,
})

onChange(async (files: FileList) => {
    data.value.current_data_frame = await files[0].text();
})

// Create table instance
const table = computed(() => {
    return createTable({
        data: sigma.value?.search_results.value?.matches || [],
        columns: columns.value,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination: {
                pageIndex: 0,
                pageSize: rowsPerPage.value,
            },
        },
    });
});

// Create table component with TanStack Table
const tableInstance = computed(() => {
    return useVueTable(table.value);
});

// Update table when search results change
watch(() => sigma.value?.search_results.value, (newResults) => {
    if (newResults?.matches?.length > 0) {
        // Generate columns from the first result
        updateTableColumns(newResults.matches);
    }
}, {deep: true});

// Helper to update columns based on data structure
function updateTableColumns(data: any[]) {
    if (!data || data.length === 0) return;

    const firstRecord = data[0];
    const newColumns: ColumnDef<any>[] = [];

    // Create columns from object keys
    Object.keys(firstRecord).forEach(key => {
        newColumns.push({
            id: key,
            accessorKey: key,
            header: key,
            cell: info => highlightMatchingField(info.getValue() as string, key)
        });
    });

    columns.value = newColumns;
}

// Highlight fields that match the search query
function highlightMatchingField(value: any, key: string) {
    if (value === undefined || value === null) return '';

    // Convert value to string for display
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

    // Check if this field is part of the matching criteria in the SQL query
    const sqlQuery = sigma.value?.siem_query.value || '';

    // Simple check if the field name appears in the WHERE clause
    if (sqlQuery.includes(key) &&
        (sqlQuery.includes(`${key}=`) ||
            sqlQuery.includes(`${key} =`) ||
            sqlQuery.includes(`\`${key}\`=`) ||
            sqlQuery.includes(`\`${key}\` =`))) {
        return `<span class="text-primary-500 font-semibold">${stringValue}</span>`;
    }

    return stringValue;
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
</script>

<template>
  <div class="h-full w-full rounded-xl bg-muted/50 flex flex-col gap-2 p-3 overflow-hidden">
    <!-- Empty state - no data uploaded -->
    <div
      v-if="!data?.current_data_frame"
      class="flex flex-col items-center justify-center h-full gap-2"
    >
      <h2 class="text-lg font-semibold">SIEM Sample Data</h2>
      <p class="text-sm text-muted-foreground mb-2">Upload sample data to test your SIEM queries</p>
      <Button class="h-8 flex gap-2" size="sm" @click="open">
        <PlusIcon class="h-3.5 w-3.5" />
        Upload JSON File
      </Button>
    </div>

    <!-- Data is loaded -->
    <template v-else>
      <!-- Header with stats -->
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <h2 class="text-sm font-semibold">SIEM Sample Data</h2>

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
      <Tabs v-model="activeTab" class="flex-1 min-h-0 flex flex-col">
        <TabsList class="mb-2">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="matches">
            Matches
            <Badge v-if="sigma?.search_results.value?.stats?.totalMatches" class="ml-1">
              {{ sigma?.search_results.value?.stats?.totalMatches }}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="raw">Raw Data</TabsTrigger>
        </TabsList>

        <!-- Summary Tab -->
        <TabsContent
          class="flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col"
          value="summary"
        >
          <Card class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Stats -->
              <div class="flex flex-col gap-2">
                <h3 class="text-sm font-medium">Data Summary</h3>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="flex flex-col">
                    <span class="text-muted-foreground">Total Records</span>
                    <span class="font-medium">{{
                                                sigma?.search_results.value?.stats?.totalRecords || 0
                    }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-muted-foreground">File Size</span>
                    <span class="font-medium">{{
                                                formatBytes(data?.current_data_frame?.length || 0)
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Query Results -->
              <div class="flex flex-col gap-2">
                <h3 class="text-sm font-medium">Query Results</h3>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="flex flex-col">
                    <span class="text-muted-foreground">Matches</span>
                    <span class="font-medium">{{
                                                sigma?.search_results.value?.stats?.totalMatches || 0
                    }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-muted-foreground">Match Rate</span>
                    <span class="font-medium">
                      {{
                                                sigma?.search_results.value?.stats?.totalRecords ?
                                                    Math.round((sigma?.search_results.value?.stats?.totalMatches / sigma?.search_results.value?.stats?.totalRecords) * 100) :
                                                    0


                      }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <!-- Status messages -->
          <div
            v-if="sigma?.search_error"
            class="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md"
          >
            <div class="flex items-center gap-2 text-red-500">
              <AlertCircleIcon class="h-4 w-4" />
              <h3 class="text-sm font-medium">Search Error</h3>
            </div>
            <p class="text-xs mt-1">{{ sigma.search_error }}</p>
          </div>

          <div
            v-else-if="sigma?.data_loading_error"
            class="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md"
          >
            <div class="flex items-center gap-2 text-red-500">
              <AlertCircleIcon class="h-4 w-4" />
              <h3 class="text-sm font-medium">Data Loading Error</h3>
            </div>
            <p class="text-xs mt-1">{{ sigma.data_loading_error }}</p>
          </div>

          <div
            v-else-if="sigma?.is_searching"
            class="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-md"
          >
            <div class="flex items-center gap-2 text-blue-500">
              <LoaderIcon class="h-4 w-4 animate-spin" />
              <h3 class="text-sm font-medium">Searching...</h3>
            </div>
          </div>
        </TabsContent>

        <!-- Matches Tab -->
        <TabsContent
          class="flex-1 min-h-0 data-[state=active]:flex data-[state=active]:flex-col"
          value="matches"
        >
          <div
            v-if="sigma?.search_results.value?.matches?.length"
            class="flex-1 min-h-0 overflow-hidden"
          >
            <!-- TanStack Table -->
            <div class="flex flex-col flex-1 min-h-0">
              <div class="border rounded-md overflow-hidden flex-1 min-h-0">
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead class="bg-muted/50">
                      <tr>
                        <th
                          v-for="header in tableInstance.getHeaderGroups()[0].headers"
                          :key="header.id"
                          class="px-4 py-2 text-left font-medium text-muted-foreground"
                        >
                          {{ header.column.columnDef.header }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="row in tableInstance.getRowModel().rows"
                        :key="row.id"
                        class="border-t hover:bg-muted/30"
                      >
                        <td
                          v-for="cell in row.getVisibleCells()"
                          :key="cell.id"
                          class="px-4 py-2 text-xs"
                          v-html="cell.column.columnDef.cell ?
                                                            cell.column.columnDef.cell(cell.getContext()) : 
                                                            cell.getValue()"
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Pagination -->
              <div class="flex justify-between items-center py-2">
                <div class="text-xs text-muted-foreground">
                  Showing
                  {{
                                        tableInstance.getState().pagination.pageIndex * tableInstance.getState().pagination.pageSize + 1
                  }}
                  to
                  {{
                                        Math.min((tableInstance.getState().pagination.pageIndex + 1) * tableInstance.getState().pagination.pageSize,
                                            sigma.search_results.value.matches.length)
                  }}
                  of {{ sigma.search_results.value.matches.length }} matches
                </div>
                <div class="flex items-center gap-2">
                  <Button
                    :disabled="!tableInstance.getCanPreviousPage()"
                    size="sm"
                    variant="outline"
                    @click="tableInstance.previousPage()"
                  >
                    Previous
                  </Button>
                  <Button
                    :disabled="!tableInstance.getCanNextPage()"
                    size="sm"
                    variant="outline"
                    @click="tableInstance.nextPage()"
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
          <ScrollArea class="flex-1 min-h-0 w-full">
            <div class="text-xs text-slate-300 rounded-md text-wrap w-full">
              <pre class="p-2"><code>{{ data?.current_data_frame }}</code></pre>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </template>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
:deep(.text-primary-500) {
    color: hsl(var(--primary) / 0.9);
}

:deep(table) {
    border-collapse: collapse;
    width: 100%;
}

:deep(table td) {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
