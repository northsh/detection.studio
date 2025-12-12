import {defineStore} from 'pinia';
import {ref} from 'vue';
import {useSearchWorker} from '../composables/useSearchWorker';

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

export const useSigmaRulesStore = defineStore('sigmaRules', () => {
    const rules = ref<SigmaRule[]>([]);
    const isLoading = ref(false);
    const isLoadingIndividualRule = ref(false);
    const currentRule = ref<SigmaRule | null>(null);
    const currentRuleContent = ref<string>('');
    const searchQuery = ref('');
    const searchResults = ref<SigmaRule[]>([]);
    const error = ref<string | null>(null);

    const allRules = ref<SigmaRule[]>([]);
    const isRulesLoaded = ref(false);

    // Initialize the search worker
    const searchWorker = useSearchWorker();

    async function loadRulesIndex(): Promise<void> {
        if (isRulesLoaded.value) return;

        try {
            console.log('SigmaRulesStore: Loading rules index...');

            const response = await fetch('/sigma-rules-index.json');

            if (!response.ok) {
                console.error(`Failed to load rules index: ${response.status} ${response.statusText}`);
                throw new Error(`Failed to load rules index: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                console.error('Rules index is not an array:', data);
                throw new Error('Invalid rules index format');
            }

            allRules.value = data;
            isRulesLoaded.value = true;
            console.log(`SigmaRulesStore: Successfully loaded ${allRules.value.length} rules`);
        } catch (error) {
            console.error('Error loading rules index:', error);
            allRules.value = [];
            throw error;
        }
    }

    async function fetchRules(forceReload: boolean = false) {
        isLoading.value = true;
        error.value = null;

        try {
            if (forceReload) {
                isRulesLoaded.value = false;
            }

            if (!isRulesLoaded.value) {
                await loadRulesIndex();
            }
            rules.value = allRules.value;
            console.log(`SigmaRulesStore: Fetched ${rules.value.length} rules`);

            // Initialize the search worker with the rules data
            try {
                await searchWorker.initializeIndex(rules.value);
                console.log('SigmaRulesStore: Search worker initialized');
            } catch (err) {
                console.error('SigmaRulesStore: Failed to initialize search worker:', err);
                // Don't throw - allow the app to work without search
            }
        } catch (err) {
            console.error('Error fetching sigma rules:', err);
            error.value = err instanceof Error ? err.message : 'Failed to fetch rules';
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
            error.value = err instanceof Error ? err.message : 'Failed to fetch rule content';
            currentRuleContent.value = '';
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
        if (!query || query.trim() === '') {
            searchResults.value = [];
            return;
        }

        try {
            // Perform search using the Web Worker
            const results = await searchWorker.search(query);
            searchResults.value = results;
            console.log(`SigmaRulesStore: Search completed, found ${results.length} results`);
        } catch (err) {
            console.error('SigmaRulesStore: Search error:', err);
            searchResults.value = [];
        }
    }

    // Computed property to get filtered rules (either search results or all rules)
    const filteredRules = () => {
        if (!searchQuery.value || searchQuery.value.trim() === '') {
            return rules.value;
        }
        return searchResults.value;
    };

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
        searchRules
    };
});
