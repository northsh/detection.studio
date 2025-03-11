import {ComputedRef, type Ref} from 'vue';
import { SigmaConversionStrategy } from '@/lib/sigma';

export interface SigmaStore {
    convert: (rule: string, target: string, pipeline: string[], pipelineYml: string, filterYml: string) => Promise<string | undefined>
    siem_query: Ref<string>;
    siem_conversion_error: Ref<string>;
    selected_siem: Ref<string>;
    selected_pipelines: Ref<string[]>;
    active_sigma_rule_file_id: Ref<string>;
    conversion_strategy: Ref<SigmaConversionStrategy>;
    toggleConversionStrategy: () => void;
    updateSelectedPipelines: (pipelines: string[]) => void;
    isReady: Ref<boolean>;
}