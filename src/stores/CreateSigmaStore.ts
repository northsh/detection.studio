import { defineStore, type StoreDefinition } from "pinia";
import { computed, ref, watch, onUnmounted } from "vue";
import { computedAsync } from "@vueuse/core";

import type { FileItem } from "@/types/types.ts";
import type { SigmaStore } from "@/types/SigmaStore";
import type { RsigmaEvalResult } from "@/lib/rsigma-wasm/rsigmaEvaluator";
import { useWorkspaceStore } from "@/stores/WorkspaceStore";
import { SigmaConverter } from "@/lib/sigma";
import { RsigmaEvaluator } from "@/lib/rsigma-wasm/rsigmaEvaluator";

export function createSigmaStore(id: string): StoreDefinition<string, SigmaStore> {
  // @ts-ignore
  return defineStore(
    id + "-sigma",
    (): SigmaStore => {
      const workspace = useWorkspaceStore();
      const fs = computed(() => workspace.currentWorkspace.fileStore());

      // Manage active Sigma rule file
      const active_sigma_rule_file_id = ref("");
      const file_content = computed(
        () => fs.value?.getFile(active_sigma_rule_file_id.value)?.content,
      );

      // Watch for changes in active file
      watch(
        fs.value?.getActiveFile ??
          fs.value?.files.find((f: FileItem) => ["sigma", "correlation"].includes(f.type ?? "")),
        () => {
          let file = computed(() => fs.value?.getActiveFile())?.value;
          if (file) {
            if (["sigma", "correlation"].includes(file?.type ?? "")) {
              active_sigma_rule_file_id.value = file.id;
            }
          }
        },
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

      // ── rsigma evaluation engine ──────────────────────────────────
      const rsigmaEvaluator = new RsigmaEvaluator();
      const search_results = ref<RsigmaEvalResult | null>(null);
      const is_searching = ref(false);
      const search_error = ref("");
      const is_data_loaded = computed(() => {
        const ds = workspace.currentWorkspace?.dataStore();
        return !!ds?.current_data_frame;
      });
      const data_loading_error = ref("");

      // Get reactive reference to the data store's current_data_frame
      const current_data = computed(() => {
        const ds = workspace.currentWorkspace?.dataStore();
        return ds?.current_data_frame ?? null;
      });

      // Collect pipeline YAML content from the file store for rsigma evaluation
      const pipeline_yamls = computed(() => {
        return (
          fs.value?.files
            .filter((f: FileItem) => f.type === "pipeline")
            .map((f: FileItem) => f.content)
            .filter((c: string) => c && c.trim().length > 0) || []
        );
      });

      // Collect filter YAML content from the file store for rsigma evaluation
      const filter_yamls = computed(() => {
        return (
          fs.value?.files
            .filter((f: FileItem) => f.type === "filter")
            .map((f: FileItem) => f.content)
            .filter((c: string) => c && c.trim().length > 0) || []
        );
      });

      // Track rsigma WASM readiness
      const rsigmaReady = ref(false);
      const removeRsigmaReadinessListener = rsigmaEvaluator.addReadinessListener((ready) => {
        rsigmaReady.value = ready;
      });

      // Debounce timer for evaluation
      let evalTimeout: ReturnType<typeof setTimeout> | null = null;

      // Re-evaluate whenever the Sigma rule YAML, sample data, pipelines, or filters change
      watch(
        [file_content, current_data, pipeline_yamls, filter_yamls, rsigmaReady],
        () => {
          if (evalTimeout) clearTimeout(evalTimeout);
          evalTimeout = setTimeout(() => runEvaluation(), 300);
        },
        { deep: false },
      );

      async function runEvaluation() {
        const ruleYaml = file_content.value;
        const eventsJson = current_data.value;

        // Need both a rule and data to evaluate
        if (!ruleYaml || !eventsJson) {
          search_results.value = null;
          is_searching.value = false;
          search_error.value = "";
          return;
        }

        if (!rsigmaReady.value) {
          search_error.value = "rsigma engine is still loading...";
          return;
        }

        is_searching.value = true;
        search_error.value = "";

        try {
          const result = await rsigmaEvaluator.evaluate(
            ruleYaml,
            eventsJson,
            pipeline_yamls.value,
            filter_yamls.value,
          );
          search_results.value = result;
          if (result.error) {
            search_error.value = result.error;
          }
        } catch (e) {
          search_error.value = e instanceof Error ? e.message : String(e);
          search_results.value = null;
        } finally {
          is_searching.value = false;
        }
      }

      // Clean up listeners when the store is destroyed
      onUnmounted(() => {
        removeReadinessListener();
        removeRsigmaReadinessListener();
        sigmaConverter.value.dispose();
        rsigmaEvaluator.dispose();
        if (evalTimeout) clearTimeout(evalTimeout);
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
        if (typeof Worker === "undefined") {
          return "";
        }

        if (!file_content.value) {
          return "";
        }

        // Get pipeline and filter YAML content from files
        const pipelineYmls =
          fs.value?.files.filter((f: FileItem) => f.type === "pipeline").map((f) => f.content) ||
          [];

        const filterYml = fs.value?.files
          .filter((f: FileItem) => f.type === "filter")
          .map((f) => f.content)
          .join("\n---\n");

        const query =
          (await convert(
            file_content.value || "",
            selected_siem.value,
            selected_pipelines.value,
            pipelineYmls,
            filterYml,
          )) ?? "";

        return query;
      }, "");

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
            filterYml,
          );

          if (result.error) {
            siem_conversion_error.value = result.error;
            return siem_query.value;
          }

          siem_conversion_error.value = "";
          return result.query;
        } catch (e) {
          console.error("Error in convert function:", e);
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
        isReady,
        // rsigma evaluation state
        search_results,
        is_searching,
        search_error,
        is_data_loaded,
        data_loading_error,
      };
    },
    {
      persist: {
        // Only persist user settings, not transient evaluation state
        pick: [
          "selected_siem",
          "selected_pipelines",
          "active_sigma_rule_file_id",
        ],
      },
    },
  );
}
