import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useSearchWorker } from "../composables/useSearchWorker";

export interface SigmaLogsource {
  category?: string;
  product?: string;
  service?: string;
}

export interface SigmaRule {
  id: string;
  title: string;
  description: string;
  status: string;
  author: string;
  date: string;
  modified: string;
  tags: string[];
  level: string;
  path: string;
  logsource?: SigmaLogsource;
  rawContent?: string;
  references?: string[];
}

export const useSigmaRulesStore = defineStore("sigmaRules", () => {
  const rules = ref<SigmaRule[]>([]);
  const isLoading = ref(false);
  const isLoadingIndividualRule = ref(false);
  const currentRule = ref<SigmaRule | null>(null);
  const currentRuleContent = ref<string>("");
  const searchQuery = ref("");
  const searchResults = ref<SigmaRule[]>([]);
  const error = ref<string | null>(null);

  const isRulesLoaded = ref(false);

  // Initialize the search worker
  const searchWorker = useSearchWorker();

  /**
   * Fetch rules and build the search index entirely in the Web Worker.
   * The worker fetches `/sigma-rules-index.json`, parses it, builds the
   * FlexSearch index, and sends the parsed rules back via postMessage.
   * This keeps the main thread free during the heavy JSON parse + indexing.
   */
  async function fetchRules(forceReload: boolean = false) {
    if (isRulesLoaded.value && !forceReload) return;

    isLoading.value = true;
    error.value = null;

    try {
      console.log("SigmaRulesStore: Loading rules via worker...");

      await searchWorker.fetchAndInitialize(
        "/sigma-rules-index.json",
        (loadedRules) => {
          // Called when the worker has parsed the JSON — the structured
          // clone transfer is unavoidable but much cheaper than
          // JSON.parse(JSON.stringify(...)) that was here before.
          rules.value = loadedRules;
          isRulesLoaded.value = true;
          console.log(`SigmaRulesStore: Received ${loadedRules.length} rules from worker`);
        },
      );

      console.log("SigmaRulesStore: Search worker initialized");
    } catch (err) {
      console.error("Error fetching sigma rules:", err);
      error.value = err instanceof Error ? err.message : "Failed to fetch rules";
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchRuleContent(rulePath: string) {
    isLoadingIndividualRule.value = true;
    error.value = null;

    try {
      const cdnPath = `https://cdn.jsdelivr.net/gh/SigmaHQ/sigma@master/${rulePath}`;
      const response = await fetch(cdnPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch rule: ${response.status} ${response.statusText}`);
      }
      currentRuleContent.value = await response.text();
    } catch (err) {
      console.error(`Error fetching rule content for ${rulePath}:`, err);
      error.value = err instanceof Error ? err.message : "Failed to fetch rule content";
      currentRuleContent.value = "";
    } finally {
      isLoadingIndividualRule.value = false;
    }
  }

  async function setCurrentRule(rule: SigmaRule) {
    currentRule.value = rule;
    await fetchRuleContent(rule.path);
  }

  async function searchRules(query: string) {
    searchQuery.value = query;

    // If query is empty, clear search results
    if (!query || query.trim() === "") {
      searchResults.value = [];
      return;
    }

    try {
      // Perform search using the Web Worker
      const results = await searchWorker.search(query);
      searchResults.value = results;
      console.log(`SigmaRulesStore: Search completed, found ${results.length} results`);
    } catch (err) {
      console.error("SigmaRulesStore: Search error:", err);
      searchResults.value = [];
    }
  }

  // Proper computed — cached by Vue's reactivity system
  const filteredRules = computed(() => {
    if (!searchQuery.value || searchQuery.value.trim() === "") {
      return rules.value;
    }
    return searchResults.value;
  });

  return {
    rules,
    isLoading,
    isLoadingIndividualRule,
    currentRule,
    currentRuleContent,
    searchQuery,
    searchResults,
    error,
    filteredRules,
    isSearching: searchWorker.isSearching,
    fetchRules,
    fetchRuleContent,
    setCurrentRule,
    searchRules,
  };
});
