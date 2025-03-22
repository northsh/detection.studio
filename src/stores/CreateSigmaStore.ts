import {defineStore, type StoreDefinition} from "pinia";
import {computed, type Ref, ref, watch} from "vue";
import {computedAsync} from "@vueuse/core";

import type {FileItem} from "@/types/types.ts";
import type {SigmaStore} from "@/types/SigmaStore";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {SigmaConverter} from "@/lib/sigma";
import {loadLogDataAsync, searchLogsAsync} from "@/lib/sigma/worker/workerApi";

export function createSigmaStore(id: string): StoreDefinition<string, SigmaStore> {
    // @ts-ignore
    return defineStore(id + '-sigma', (): SigmaStore => {
        const workspace = useWorkspaceStore();
        const fs = computed(() => workspace.currentWorkspace.fileStore());
        const dataStore = computed(() => workspace.currentWorkspace.dataStore());

        // Manage active Sigma rule file
        const active_sigma_rule_file_id = ref("");
        const file_content = computed(() => fs.value?.getFile(active_sigma_rule_file_id.value)?.content);

        // Watch for changes in active file
        watch(
            fs.value?.getActiveFile ?? fs.value?.files.find((f: FileItem) => ["sigma", "correlation"].includes(f.type ?? '')),
            () => {
                let file = computed(() => fs.value?.getActiveFile())?.value;
                if (file) {
                    if (["sigma", "correlation"].includes(file?.type ?? '')) {
                        active_sigma_rule_file_id.value = file.id;
                    }
                }
            }
        );

        // SIEM conversion settings
        const selected_siem = ref("sqlite");  // Default to SQLite for local matching
        const siem_conversion_error = ref("");

        // Initialize the converter
        let sigmaConverter = ref<SigmaConverter>(new SigmaConverter());

        // Track selected pipelines
        const selected_pipelines = ref<string[]>([]);

        // Function to update selected pipelines
        function updateSelectedPipelines(pipelines: string[]) {
            selected_pipelines.value = pipelines;
        }

        // SQLite search state
        const is_searching = ref(false);
        const search_error = ref("");
        const search_results = ref<{
            matches: any[];
            stats: {
                totalMatches: number;
                totalRecords: number;
            };
        }>({matches: [], stats: {totalMatches: 0, totalRecords: 0}});

        // Track data loading state
        const is_data_loaded = ref(false);
        const data_loading_error = ref("");

        // Watch for changes in data and load into SQLite
        watch(
            () => dataStore.value?.current_data_frame,
            async (newData) => {
                if (newData) {
                    await loadData(newData);
                } else {
                    is_data_loaded.value = false;
                    data_loading_error.value = "";
                    search_results.value = {matches: [], stats: {totalMatches: 0, totalRecords: 0}};
                }
            }
        );

        // Function to load data into SQLite
        async function loadData(jsonData: string) {
            try {
                console.log('Store: Starting data load operation...');
                is_data_loaded.value = false;
                data_loading_error.value = "";

                if (!jsonData) {
                    console.error('Store: No JSON data provided');
                    data_loading_error.value = "No data provided";
                    return;
                }

                console.log(`Store: Sending ${jsonData.length} bytes of data to worker`);

                // Start a timeout to detect if the operation is taking too long
                const timeout = setTimeout(() => {
                    if (!is_data_loaded.value && !data_loading_error.value) {
                        console.warn('Store: Data loading operation taking longer than expected');
                        // Don't set error yet, just log warning
                    }
                }, 5000);

                const result = await loadLogDataAsync(jsonData);
                clearTimeout(timeout);

                console.log('Store: Received result from worker:', result);

                if (result && result.success) {
                    console.log(`Store: Successfully loaded ${result.count} records`);
                    is_data_loaded.value = true;

                    // If we have a query already, run the search
                    if (siem_query.value && selected_siem.value === "sqlite") {
                        console.log('Store: Running search with existing query');
                        await searchLogs();
                    }
                } else {
                    const errorMsg = result?.error || "Failed to load data";
                    console.error('Store: Data loading failed:', errorMsg);
                    data_loading_error.value = errorMsg;
                }
            } catch (e) {
                console.error('Store: Error loading data:', e);
                data_loading_error.value = e instanceof Error ? e.message : String(e);
                is_data_loaded.value = false;
            }
        }

        // Function to search logs with current query
        async function searchLogs() {
            if (!is_data_loaded.value || !siem_query.value) {
                console.log('Store: Search skipped - data not loaded or no query');
                search_results.value = {matches: [], stats: {totalMatches: 0, totalRecords: 0}};
                return;
            }

            try {
                console.log('Store: Starting search operation with query:', siem_query.value);
                is_searching.value = true;
                search_error.value = "";

                const result = await searchLogsAsync(siem_query.value);
                console.log('Store: Search result received:', result);

                if (result) {
                    search_results.value = result;

                    if (result.error) {
                        console.error('Store: Search returned error:', result.error);
                        search_error.value = result.error;
                    } else {
                        console.log(`Store: Search completed with ${result.matches?.length || 0} matches`);
                    }
                } else {
                    console.error('Store: Received null or undefined result from search operation');
                    search_error.value = "Invalid search result";
                    search_results.value = {matches: [], stats: {totalMatches: 0, totalRecords: 0}};
                }
            } catch (e) {
                console.error('Store: Error during search operation:', e);
                search_error.value = e instanceof Error ? e.message : String(e);
                search_results.value = {matches: [], stats: {totalMatches: 0, totalRecords: 0}};
            } finally {
                is_searching.value = false;
            }
        }

        // Async computed property for SIEM query
        const siem_query = computedAsync(async () => {
            if (!file_content.value) {
                return "";
            }

            // Get pipeline and filter YAML content from files
            const pipelineYmls = fs.value?.files
                .filter((f: FileItem) => f.type === "pipeline")
                .map((f) => f.content) || [];

            const filterYml = fs.value?.files
                .filter((f: FileItem) => f.type === "filter")
                .map((f) => f.content)
                .join("\n---\n");

            const query = await convert(
                file_content.value || "",
                selected_siem.value,
                selected_pipelines.value,
                pipelineYmls,
                filterYml,
            ) ?? "";

            // If we have data loaded and we're using SQLite, run the search
            if (is_data_loaded.value && selected_siem.value === "sqlite" && query) {
                await searchLogs();
            }

            return query;
        }, '');

        // Conversion function that uses the converter interface
        async function convert(
            rule: string,
            target: string,
            pipeline: string[],
            pipelineYmls: string[],
            filterYml: string,
        ): Promise<string | undefined> {
            try {
                const result = await sigmaConverter.value.convert(
                    rule,
                    target,
                    pipeline,
                    pipelineYmls,
                    filterYml
                );

                if (result.error) {
                    siem_conversion_error.value = result.error;
                    return siem_query.value;
                }

                siem_conversion_error.value = "";
                return result.query;
            } catch (e) {
                console.error('Error in convert function:', e);
                siem_conversion_error.value = e instanceof Error ? e.message : String(e);
                return "";
            }
        }

        const isReady: Ref<boolean | undefined, boolean | undefined> = computedAsync(async () => await sigmaConverter.value.isReady());

        return {
            convert,
            siem_query,
            siem_conversion_error,
            selected_siem,
            active_sigma_rule_file_id,
            selected_pipelines,
            updateSelectedPipelines,
            isReady,
            // SQLite search functionality
            search_results,
            search_error,
            is_searching,
            is_data_loaded,
            data_loading_error,
            searchLogs,
            loadData
        }
    }, {
        persist: true,
    });
}

