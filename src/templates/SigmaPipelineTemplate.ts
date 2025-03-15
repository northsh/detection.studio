import type {FileItem, Sigma} from "@/types/types";
import yaml from 'js-yaml';

import {v4 as uuid} from 'uuid';
import {useWorkspaceStore} from "@/stores/WorkspaceStore.ts";
import {computed} from "vue";

class SigmaPipeline {
    name: string = "Example Sigma Pipeline Config";
    priority: number = 100;
    transformations: any[] = [];

    addTransformation(
        id: string,
        type: string,
        fields: Object,
        logsource: Object
    ) {
        this.transformations.push({
            id: id || uuid(),
            type: type,
            ...fields,
            rule_conditions: [{
                type: "logsource",
                ...logsource,
            }]
        });
    }


    addCondition(
        id: string,
        index: string,
        source: string,
        logsource: Object
    ) {
        this.transformations.push({
            id: id || uuid(),
            type: "add_condition",
            conditions: {
                index: index,
                source: source
            },
            rule_conditions: [{
                type: "logsource",
                ...logsource,
            }]
        });
    }

    fieldMapping(
        id: string,
        mapping: Object,
        logsource: Object
    ) {
        this.transformations.push({
            id: id || uuid(),
            type: "field_name_mapping",
            mapping: mapping,
            rule_conditions: [{
                type: "logsource",
                ...logsource,
            }]
        });
    }
}


export default function sigmaPipelineTemplate(
    file: FileItem,
    kind: string
) {
    if (!file?.content) {
        return '';
    }

    const workStore = useWorkspaceStore();
    const sigma = computed(() => workStore.currentWorkspace?.sigmaStore());
    const fs = computed(() => workStore.currentWorkspace?.fileStore());

    if (!kind) {
        kind = sigma.value?.selected_siem || "splunk";
    }

    /**
     * Parse Sigma Rule
     */
    const rule: Sigma|Object = yaml.loadAll(file.content)[0] ?? {};
    const logsource: any = rule?.logsource || {};

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
                logsource
            )
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
                    val: "logs-test-*"
                },
                logsource
            )
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
                        index: "logs-test-*",
                        source: "logs-test-*"
                    }
                },
                logsource
            )
        }

        /**
         * Add Condition Transformation
         */
        pipeline.fieldMapping(
            "map_fields",
            {
                // TODO Map to Sigma Fields that exist
                status: "status"
            },
            logsource
        )
    }

    return yaml.dump(pipeline);
}
