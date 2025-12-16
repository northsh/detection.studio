import { type Ref } from "vue";

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
}
