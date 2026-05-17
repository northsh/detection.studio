import { defineStore, type StoreDefinition } from "pinia";
import { type Ref, ref } from "vue";

/**
 * Metadata about SigmaHQ validation / regression test data that was
 * auto-loaded from a rule's `regression_tests_path`.
 */
export interface ValidationMetadata {
  /** The rule ID this validation data belongs to */
  ruleId: string;
  /** Human-readable rule title */
  ruleTitle: string;
  /** Name of the regression test (e.g. "Positive Detection Test") */
  testName: string;
  /** Expected number of matches */
  expectedMatchCount: number;
  /** Provider that generated the test data (e.g. "Microsoft-Windows-Sysmon") */
  provider: string;
  /** Original regression_tests_path from the Sigma rule YAML */
  regressionTestsPath: string;
}

export interface DataStoreInterface {
  current_data_frame: Ref<string | null>;
  /** Metadata when data was auto-loaded from SigmaHQ validation JSON */
  validation_metadata: Ref<ValidationMetadata | null>;

  setCurrentDataFrame(data_frame: string): void;

  clearCurrentDataFrame(): void;

  /** Load validation data with associated metadata */
  setValidationData(data_frame: string, metadata: ValidationMetadata): void;
}

export function createDataStore(id: string): StoreDefinition<string, DataStoreInterface> {
  // @ts-ignore
  return defineStore(
    id + "-data",
    (): DataStoreInterface => {
      // State
      const current_data_frame: Ref<string | null> = ref(null);
      const validation_metadata: Ref<ValidationMetadata | null> = ref(null);

      // Actions
      function setCurrentDataFrame(data_frame: string) {
        current_data_frame.value = data_frame;
        // Clear validation metadata when data is set manually
        validation_metadata.value = null;
      }

      function clearCurrentDataFrame() {
        current_data_frame.value = null;
        validation_metadata.value = null;
      }

      function setValidationData(data_frame: string, metadata: ValidationMetadata) {
        current_data_frame.value = data_frame;
        validation_metadata.value = metadata;
      }

      return {
        current_data_frame,
        validation_metadata,
        setCurrentDataFrame,
        clearCurrentDataFrame,
        setValidationData,
      };
    },
    {
      persist: true,
    },
  );
}
