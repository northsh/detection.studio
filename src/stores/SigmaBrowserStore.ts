import {defineStore} from 'pinia';
import {computed, ref, shallowRef} from 'vue';
import {useFuse} from '@vueuse/integrations/useFuse';

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
    const searchQuery = shallowRef('');
    const error = ref<string | null>(null);

    const allRules = ref<SigmaRule[]>([]);
    const isRulesLoaded = ref(false);


    const {results: searchResults} = useFuse(searchQuery, rules, {});

    const filteredRules = computed(() => {
        if (!searchQuery.value) return rules.value;
        return searchResults.value.map(result => result.item);
    });

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
    }

    return {
        rules,
        isLoading,
        isLoadingIndividualRule,
        currentRule,
        currentRuleContent,
        searchQuery,
        error,
        filteredRules,
        fetchRules,
        fetchRuleContent,
        setCurrentRule,
        searchRules
    };
});
