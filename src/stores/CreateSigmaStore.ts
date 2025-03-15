import {defineStore, type StoreDefinition} from "pinia";
import {computed, type Ref, ref, watch} from "vue";
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
        let sigmaConverter = ref<SigmaConverter>(new SigmaConverter());

        // Track selected pipelines
        const selected_pipelines = ref<string[]>([]);
        
        // Function to update selected pipelines
        function updateSelectedPipelines(pipelines: string[]) {
            selected_pipelines.value = pipelines;
        }
        
        // Async computed property for SIEM query
        const siem_query = computedAsync(async () => {
            if (!file_content.value) {
                return "";
            }

            // Get pipeline and filter YAML content from files
            const pipelineYml = fs.value?.files
                .filter((f: FileItem) => f.type === "pipeline")
                .map((f) => f.content)
                .join("\n---\n");
                
            const filterYml = fs.value?.files
                .filter((f: FileItem) => f.type === "filter")
                .map((f) => f.content)
                .join("\n---\n");

            return await convert(
                file_content.value || "",
                selected_siem.value,
                [],
                pipelineYml,
                filterYml,
            ) ?? "";
        }, '');

        // Conversion function that uses the converter interface
        async function convert(
            rule: string,
            target: string,
            pipeline: string[],
            pipelineYml: string,
            filterYml: string,
        ): Promise<string | undefined> {
            try {
                const result = await sigmaConverter.value.convert(
                    rule,
                    target,
                    pipeline,
                    pipelineYml,
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
            isReady
        }
    }, {
        persist: true,
    });
}

