import { type Ref } from "vue";
import type { RsigmaEvalResult } from "@/lib/rsigma-wasm/rsigmaEvaluator";

export interface SearchResult {
  matches: any[];
  stats: {
    totalMatches: number;
    totalRecords: number;
  };
  error?: string;
}

export interface SigmaStore {
  convert: (
    rule: string,
    target: string,
    pipeline: string[],
    pipelineYmls: string[],
    filterYml: string,
  ) => Promise<string | undefined>;
  siem_query: Ref<string>;
  siem_conversion_error: Ref<string>;
  selected_siem: Ref<string>;
  selected_pipelines: Ref<string[]>;
  active_sigma_rule_file_id: Ref<string>;
  updateSelectedPipelines: (pipelines: string[]) => void;
  isReady: Ref<boolean>;

  // rsigma evaluation state
  search_results: Ref<RsigmaEvalResult | null>;
  is_searching: Ref<boolean>;
  search_error: Ref<string>;
  is_data_loaded: Ref<boolean>;
  data_loading_error: Ref<string>;

  // SigmaHQ validation data state
  validation_loading: Ref<boolean>;
  validation_error: Ref<string>;
}
