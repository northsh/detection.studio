import {defineStore, type StoreDefinition} from "pinia";
import {type Ref, ref} from "vue";

export interface DataStoreInterface {
    current_data_frame: Ref<string | null>;

    setCurrentDataFrame(data_frame: string): void;

    clearCurrentDataFrame(): void;
}

export function createDataStore(id: string): StoreDefinition<string, DataStoreInterface> {
    // @ts-ignore
    return defineStore(id + '-data', (): DataStoreInterface => {
        // State
        const current_data_frame: Ref<string | null> = ref(null);

        // Actions
        function setCurrentDataFrame(data_frame: string) {
            current_data_frame.value = data_frame;
        }

        function clearCurrentDataFrame() {
            current_data_frame.value = null;
        }

        return {
            current_data_frame,
            setCurrentDataFrame,
            clearCurrentDataFrame
        };
    }, {
        persist: true,
    });
}
