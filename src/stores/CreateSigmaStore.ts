import { defineStore, type StoreDefinition } from "pinia";
import { computed, ref, watch, onUnmounted } from "vue";
import { computedAsync } from "@vueuse/core";

import type { FileItem } from "@/types/types.ts";
import type { SigmaStore } from "@/types/SigmaStore";
import type { RsigmaEvalResult } from "@/lib/rsigma-wasm/rsigmaEvaluator";
import type { ValidationMetadata } from "@/stores/CreateDataStore";
import { useWorkspaceStore } from "@/stores/WorkspaceStore";
import { useSettingsStore } from "@/stores/SettingsStore";
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

      // SIEM conversion settings — default to user's preferred SIEM from settings
      const settingsStore = useSettingsStore();
      const selected_siem = ref(settingsStore.defaultSIEM || "splunk");
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

      // ── Auto-load SigmaHQ validation / regression test data ────────
      // When the active rule YAML contains a `regression_tests_path` field,
      // fetch the info.yml from SigmaHQ, parse it, then fetch the
      // corresponding validation JSON and auto-load it into the data store.
      const validation_loading = ref(false);
      const validation_error = ref("");
      let lastValidationPath = "";

      /**
       * Extract `regression_tests_path` from the rule YAML via simple regex.
       * Avoids pulling in js-yaml for this one field.
       */
      function extractRegressionTestsPath(yaml: string): string | null {
        const match = yaml.match(/^regression_tests_path:\s*(.+)$/m);
        return match ? match[1].trim() : null;
      }

      /**
       * Extract the rule `id` from the YAML content.
       */
      function extractRuleId(yaml: string): string | null {
        const match = yaml.match(/^id:\s*(.+)$/m);
        return match ? match[1].trim() : null;
      }

      /**
       * Extract the rule `title` from the YAML content.
       */
      function extractRuleTitle(yaml: string): string | null {
        const match = yaml.match(/^title:\s*(.+)$/m);
        return match ? match[1].trim() : null;
      }

      /**
       * Flatten a Windows Event XML-to-JSON structure into a flat object
       * suitable for Sigma rule evaluation.
       *
       * Input shape (from EVTX-to-JSON converters):
       *   { "Event": { "System": { ... }, "EventData": { ... } } }
       *
       * Output: flat object with EventData fields + key System fields hoisted
       * to the top level, matching what Sigma rules expect.
       */
      function flattenWindowsEvent(event: any): any {
        if (!event || typeof event !== "object") return event;

        // Not a Windows Event structure -- return as-is
        const evt = event.Event ?? event;
        if (!evt || typeof evt !== "object") return event;
        const system = evt.System;
        const eventData = evt.EventData;
        if (!system && !eventData) return event;

        const flat: Record<string, any> = {};

        // Hoist EventData fields to top level
        if (eventData && typeof eventData === "object") {
          for (const [key, value] of Object.entries(eventData)) {
            flat[key] = value;
          }
        }

        // Hoist key System fields
        if (system && typeof system === "object") {
          if (system.EventID != null) flat.EventID = system.EventID;
          if (system.Channel != null) flat.Channel = system.Channel;
          if (system.Computer != null) flat.Computer = system.Computer;
          if (system.Level != null) flat.Level = system.Level;
          if (system.Task != null) flat.Task = system.Task;
          if (system.Opcode != null) flat.Opcode = system.Opcode;
          if (system.Keywords != null) flat.Keywords = system.Keywords;
          if (system.EventRecordID != null) flat.EventRecordID = system.EventRecordID;

          // Provider name
          const providerName = system.Provider?.["#attributes"]?.Name ?? system.Provider?.Name;
          if (providerName) flat.Provider_Name = providerName;

          // TimeCreated
          const systemTime = system.TimeCreated?.["#attributes"]?.SystemTime ?? system.TimeCreated?.SystemTime;
          if (systemTime && !flat.UtcTime) flat.SystemTime = systemTime;

          // Security UserID
          const userId = system.Security?.["#attributes"]?.UserID ?? system.Security?.UserID;
          if (userId) flat.SecurityUserID = userId;

          // Execution ProcessID / ThreadID
          const procId = system.Execution?.["#attributes"]?.ProcessID ?? system.Execution?.ProcessID;
          const threadId = system.Execution?.["#attributes"]?.ThreadID ?? system.Execution?.ThreadID;
          if (procId != null) flat.ExecutionProcessID = procId;
          if (threadId != null) flat.ExecutionThreadID = threadId;
        }

        return flat;
      }

      /**
       * Normalize validation JSON: parse, flatten nested Windows Event
       * structures, and return NDJSON suitable for rsigma evaluation.
       */
      function normalizeValidationJson(jsonText: string): string {
        let parsed: any;
        try {
          parsed = JSON.parse(jsonText);
        } catch {
          // Not valid JSON -- might be NDJSON, return as-is
          return jsonText;
        }

        // Array of events
        if (Array.isArray(parsed)) {
          return parsed
            .map((evt) => JSON.stringify(flattenWindowsEvent(evt)))
            .join("\n");
        }

        // Single event object
        if (typeof parsed === "object" && parsed !== null) {
          return JSON.stringify(flattenWindowsEvent(parsed));
        }

        return jsonText;
      }

      async function fetchValidationData(ruleYaml: string) {
        const regressionPath = extractRegressionTestsPath(ruleYaml);
        if (!regressionPath) {
          // No regression_tests_path in this rule -- nothing to do
          return;
        }

        // Avoid re-fetching for the same path
        if (regressionPath === lastValidationPath) return;
        lastValidationPath = regressionPath;

        const ruleId = extractRuleId(ruleYaml);
        const ruleTitle = extractRuleTitle(ruleYaml) || "Unknown";
        if (!ruleId) return;

        validation_loading.value = true;
        validation_error.value = "";

        try {
          // Fetch info.yml from jsDelivr CDN
          const infoDir = regressionPath.replace(/\/info\.yml$/, "");
          const infoUrl = `https://cdn.jsdelivr.net/gh/SigmaHQ/sigma@master/${regressionPath}`;
          const infoResp = await fetch(infoUrl);
          if (!infoResp.ok) {
            throw new Error(`Failed to fetch info.yml: ${infoResp.status}`);
          }
          const infoText = await infoResp.text();

          // Parse the info.yml to extract test metadata.
          // We use simple regex parsing to avoid importing js-yaml at runtime.
          let testName = "Validation Test";
          let expectedMatchCount = 0;
          let provider = "";

          // Extract first regression test info
          const nameMatch = infoText.match(/- name:\s*(.+)/);
          if (nameMatch) testName = nameMatch[1].trim();

          const matchCountMatch = infoText.match(/match_count:\s*(\d+)/);
          if (matchCountMatch) expectedMatchCount = parseInt(matchCountMatch[1], 10);

          const providerMatch = infoText.match(/provider:\s*(.+)/);
          if (providerMatch) provider = providerMatch[1].trim();

          // Fetch the validation JSON: {info_dir}/{rule_id}.json
          const jsonUrl = `https://cdn.jsdelivr.net/gh/SigmaHQ/sigma@master/${infoDir}/${ruleId}.json`;
          const jsonResp = await fetch(jsonUrl);
          if (!jsonResp.ok) {
            throw new Error(`Failed to fetch validation JSON: ${jsonResp.status}`);
          }
          const jsonText = await jsonResp.text();

          // Normalize: flatten nested Windows Event XML-to-JSON structures
          // so that fields like EventData.TargetObject become top-level,
          // matching what Sigma rules expect.
          const normalizedData = normalizeValidationJson(jsonText);

          // Auto-load the validation data into the data store
          const ds = workspace.currentWorkspace?.dataStore();
          if (ds) {
            const metadata: ValidationMetadata = {
              ruleId,
              ruleTitle,
              testName,
              expectedMatchCount,
              provider,
              regressionTestsPath: regressionPath,
            };
            ds.setValidationData(normalizedData, metadata);
          }
        } catch (e) {
          validation_error.value = e instanceof Error ? e.message : String(e);
          console.warn("Failed to load SigmaHQ validation data:", validation_error.value);
        } finally {
          validation_loading.value = false;
        }
      }

      // Watch for rule content changes and auto-fetch validation data
      let validationTimeout: ReturnType<typeof setTimeout> | null = null;
      watch(file_content, (newContent) => {
        if (validationTimeout) clearTimeout(validationTimeout);
        if (!newContent) {
          lastValidationPath = "";
          return;
        }
        // Debounce to avoid fetching on every keystroke
        validationTimeout = setTimeout(() => fetchValidationData(newContent), 500);
      }, { immediate: true });

      // Clean up listeners when the store is destroyed
      onUnmounted(() => {
        removeReadinessListener();
        removeRsigmaReadinessListener();
        sigmaConverter.value.dispose();
        rsigmaEvaluator.dispose();
        if (evalTimeout) clearTimeout(evalTimeout);
        if (validationTimeout) clearTimeout(validationTimeout);
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
        // SigmaHQ validation data state
        validation_loading,
        validation_error,
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
