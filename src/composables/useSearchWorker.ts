import { ref, onUnmounted, getCurrentInstance } from "vue";
import type { SigmaRule } from "../stores/SigmaBrowserStore";

interface SearchMessage {
  type: "search" | "init" | "fetch-and-init";
  query?: string;
  rules?: SigmaRule[];
  url?: string;
}

interface SearchResponse {
  type: "result" | "ready" | "error" | "rules-loaded";
  results?: SigmaRule[];
  rules?: SigmaRule[];
  error?: string;
}

export function useSearchWorker() {
  const worker = ref<Worker | null>(null);
  const isReady = ref(false);
  const isSearching = ref(false);
  const searchError = ref<string | null>(null);

  // Initialize the worker
  function initWorker() {
    if (worker.value || import.meta.env.SSR) {
      return;
    }

    try {
      worker.value = new Worker(new URL("../workers/searchWorker.ts", import.meta.url), {
        type: "module",
      });

      worker.value.onmessage = handleWorkerMessage;
      worker.value.onerror = handleWorkerError;
    } catch (error) {
      console.error("Failed to initialize search worker:", error);
      searchError.value = "Failed to initialize search worker";
    }
  }

  // Handle messages from the worker
  function handleWorkerMessage(event: MessageEvent<SearchResponse>) {
    const { type, results, error } = event.data;

    if (type === "ready") {
      isReady.value = true;
      console.log("Search worker initialized");
    } else if (type === "result") {
      isSearching.value = false;
      if (searchCallback) {
        searchCallback(results || []);
      }
    } else if (type === "error") {
      isSearching.value = false;
      searchError.value = error || "Unknown error";
      console.error("Search worker error:", error);
    }
  }

  // Handle worker errors
  function handleWorkerError(error: ErrorEvent) {
    console.error("Search worker error:", error);
    searchError.value = error.message;
    isSearching.value = false;
  }

  let searchCallback: ((results: SigmaRule[]) => void) | null = null;

  /**
   * Fetch rules JSON and build the search index entirely in the worker.
   * The parsed rules are sent back via a "rules-loaded" message so the
   * main thread never has to fetch or JSON.parse the large file itself.
   */
  function fetchAndInitialize(
    url: string,
    onRulesLoaded: (rules: SigmaRule[]) => void,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!worker.value) {
        initWorker();
      }

      if (!worker.value) {
        reject(new Error("Failed to initialize worker"));
        return;
      }

      const onMessage = (event: MessageEvent<SearchResponse>) => {
        if (event.data.type === "rules-loaded") {
          // Forward parsed rules to the caller (store) without re-parsing
          onRulesLoaded(event.data.rules || []);
        } else if (event.data.type === "ready") {
          worker.value?.removeEventListener("message", onMessage);
          resolve();
        } else if (event.data.type === "error") {
          worker.value?.removeEventListener("message", onMessage);
          reject(new Error(event.data.error));
        }
      };

      worker.value.addEventListener("message", onMessage);

      worker.value.postMessage({
        type: "fetch-and-init",
        url,
      } satisfies SearchMessage);
    });
  }

  // Initialize the search index (builds index from rules already in memory)
  function initializeIndex(rules: SigmaRule[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!worker.value) {
        initWorker();
      }

      if (!worker.value) {
        reject(new Error("Failed to initialize worker"));
        return;
      }

      const onReady = (event: MessageEvent<SearchResponse>) => {
        if (event.data.type === "ready") {
          worker.value?.removeEventListener("message", onReady);
          resolve();
        } else if (event.data.type === "error") {
          worker.value?.removeEventListener("message", onReady);
          reject(new Error(event.data.error));
        }
      };

      worker.value.addEventListener("message", onReady);

      const message: SearchMessage = {
        type: "init",
        rules,
      };

      worker.value.postMessage(message);
    });
  }

  // Perform a search
  function search(query: string): Promise<SigmaRule[]> {
    return new Promise((resolve, reject) => {
      if (!worker.value || !isReady.value) {
        reject(new Error("Worker not ready"));
        return;
      }

      isSearching.value = true;
      searchError.value = null;

      searchCallback = (results: SigmaRule[]) => {
        resolve(results);
        searchCallback = null;
      };

      const message: SearchMessage = {
        type: "search",
        query,
      };

      worker.value.postMessage(message);
    });
  }

  // Terminate the worker
  function terminateWorker() {
    if (worker.value) {
      worker.value.terminate();
      worker.value = null;
      isReady.value = false;
    }
  }

  // Clean up on unmount (only if there's an active component instance)
  if (getCurrentInstance()) {
    onUnmounted(() => {
      terminateWorker();
    });
  }

  return {
    initWorker,
    fetchAndInitialize,
    initializeIndex,
    search,
    terminateWorker,
    isReady,
    isSearching,
    searchError,
  };
}
