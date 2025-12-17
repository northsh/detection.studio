import type { FileItem, Sigma } from "@/types/types";
import yaml from "js-yaml";

import { v4 as uuid } from "uuid";
import { useWorkspaceStore } from "@/stores/WorkspaceStore.ts";
import { computed } from "vue";

class SigmaPipeline {
    name: string = "Example Sigma Pipeline Config";
    priority: number = 100;
    transformations: any[] = [];

    addTransformation(id: string, type: string, fields: object, logsource: object) {
        delete (logsource as any)["definition"];

        this.transformations.push({
            id: id || uuid(),
            type: type,
            ...fields,
            rule_conditions: [
                {
                    type: "logsource",
                    ...logsource,
                },
            ],
        });
    }

    addCondition(id: string, index: string, source: string, logsource: object) {
        delete (logsource as any)["definition"];

        this.transformations.push({
            id: id || uuid(),
            type: "add_condition",
            conditions: {
                index: index,
                source: source,
            },
            rule_conditions: [
                {
                    type: "logsource",
                    ...logsource,
                },
            ],
        });
    }

    fieldMapping(id: string, mapping: object, logsource: object) {
        delete (logsource as any)["definition"];

        this.transformations.push({
            id: id || uuid(),
            type: "field_name_mapping",
            mapping: mapping,
            rule_conditions: [
                {
                    type: "logsource",
                    ...logsource,
                },
            ],
        });
    }
}

export default function sigmaPipelineTemplate(file: FileItem, kind: string) {
    if (!file?.content) {
        return "";
    }

    const workStore = useWorkspaceStore();
    const sigma = computed(() => workStore.currentWorkspace?.sigmaStore());

    if (!kind) {
        kind = sigma.value?.selected_siem || "splunk";
    }

    /**
     * Parse Sigma Rule
     */
    const rule: Sigma | object = yaml.loadAll(file.content)[0] ?? {};
    const logsource: any = (rule as any)?.logsource || {};

    const pipeline = new SigmaPipeline();

    if (logsource) {
        /**
         * Adding Conditions for Splunk SPL queries
         */
        if (kind === "splunk") {
            pipeline.addCondition(
                "prefix_source_and_index",
                "index_name",
                "Source/Type",
                logsource,
            );
        }

        /**
         * Adding Conditions for Splunk SPL queries
         */
        if (kind === "esql") {
            pipeline.addTransformation(
                "prefix_esql_logs",
                "set_state",
                {
                    key: "index",
                    val: "logs-test-*",
                },
                logsource,
            );
        }

        /**
         * Adding Conditions for Splunk SPL queries
         */
        if (kind === "loki") {
            pipeline.addTransformation(
                "loki_custom_mapping",
                "set_custom_log_source",
                {
                    selection: {
                        job: "job-name",
                        app: "loki",
                    },
                },
                logsource,
            );
        }

        /**
         * Add Condition Transformation
         */
        pipeline.fieldMapping(
            "map_fields",
            {
                // TODO Map to Sigma Fields that exist
                status: "status",
            },
            logsource,
        );
    }

    return yaml.dump(pipeline);
}
