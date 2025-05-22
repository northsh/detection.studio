import {defineStore, type StoreDefinition} from "pinia";
import {computed, ref, watch, onUnmounted} from "vue";
import {computedAsync} from "@vueuse/core";

import type {FileItem} from "@/types/types.ts";
import type {SigmaStore} from "@/types/SigmaStore";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {SigmaConverter} from "@/lib/sigma";

export function createSigmaStore(id: string): StoreDefinition<string, SigmaStore> {
    // @ts-ignore
    return defineStore(id + '-sigma', (): SigmaStore => {
        const workspace = useWorkspaceStore();
        const fs = computed(() => workspace.currentWorkspace.fileStore());

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
        const selected_siem = ref("splunk");
        const siem_conversion_error = ref("");

        // Initialize the converter
        const sigmaConverter = ref(new SigmaConverter());

        // Track readiness state
        const isReady = ref(false);

        // Set up readiness listener
        const removeReadinessListener = sigmaConverter.value.addReadinessListener((ready) => {
            isReady.value = ready;
        });

        // Clean up listeners when the store is destroyed
        onUnmounted(() => {
            removeReadinessListener();
            sigmaConverter.value.dispose();
        });

        // Track selected pipelines
        const selected_pipelines = ref<string[]>([]);

        // Function to update selected pipelines
        function updateSelectedPipelines(pipelines: string[]) {
            selected_pipelines.value = pipelines;
        }

        // Async computed property for SIEM query
        const siem_query = computedAsync(async () => {
            // Skip in SSR/SSG environment
            if (typeof Worker === 'undefined') {
                return "";
            }

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
                    [],
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

        return {
            convert,
            siem_query,
            siem_conversion_error,
            selected_siem,
            active_sigma_rule_file_id,
            selected_pipelines,
            updateSelectedPipelines,
            isReady
        }
    }, {
        persist: true,
    });
}