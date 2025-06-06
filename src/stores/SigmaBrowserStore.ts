import {defineStore} from 'pinia';
import {computed, ref, shallowRef} from 'vue';
import type {SigmaRule} from '../lib/sigma/SigmaRepoService';
import {SigmaRepoService} from '../lib/sigma/SigmaRepoService';

export const useSigmaRulesStore = defineStore('sigmaRules', () => {
    const rules = ref<SigmaRule[]>([]);
    const isLoading = ref(false);
    const isLoadingIndividualRule = ref(false);
    const currentRule = ref<SigmaRule | null>(null);
    const currentRuleContent = ref<string>('');
    const searchQuery = ref('');
    const error = ref<string | null>(null);
    const fuseInstance = shallowRef<any>(null);
    const isFuseLoaded = ref(false);

    const sigmaRepoService = SigmaRepoService.getInstance();

    const filteredRules = computed(() => {
        if (!searchQuery.value) return rules.value;

        if (fuseInstance.value) {
            const results = fuseInstance.value.search(searchQuery.value);
            return results.map((result: any) => result.item);
        }

        // Fallback if Fuse.js isn't loaded yet
        // return rules.value.filter(rule => {
        //     const query = searchQuery.value.toLowerCase();
        //     return (
        //         rule.title?.toLowerCase().includes(query) ||
        //         rule.description?.toLowerCase().includes(query) ||
        //         rule.tags?.some((tag: string) => tag.toLowerCase().includes(query)) ||
        //         rule.author?.toLowerCase().includes(query) ||
        //         rule.level?.toLowerCase().includes(query) ||
        //         rule.status?.toLowerCase().includes(query) ||
        //         rule.logsource?.product?.toLowerCase().includes(query) ||
        //         rule.logsource?.category?.toLowerCase().includes(query) ||
        //         rule.logsource?.service?.toLowerCase().includes(query)
        //     );
        // });
    });

    async function initFuse() {
        try {
            // Dynamically import Fuse.js
            const Fuse = await import('fuse.js').catch(() => null);

            if (Fuse && Fuse.default && rules.value.length > 0) {
                fuseInstance.value = new Fuse.default(rules.value, {
                    keys: [
                        'title',
                        // 'description',
                        // 'tags',
                        // 'author',
                        // 'level',
                        // 'status',
                        // 'logsource.category',
                        // 'logsource.product',
                        // 'logsource.service'
                    ],
                });
                isFuseLoaded.value = true;
                console.log('SigmaRulesStore: Fuse.js initialized successfully');
            }
        } catch (err) {
            console.error('Error initializing Fuse.js:', err);
            // We'll use the fallback search method
        }
    }

    async function fetchRules(forceReload: boolean = false) {
        isLoading.value = true;
        error.value = null;

        try {
            // Reset the SigmaRepoService if force reload is requested
            if (forceReload) {
                // Use a private method to force reload from the service
                // @ts-ignore - Accessing private member
                sigmaRepoService['isLoaded'] = false;
            }

            rules.value = await sigmaRepoService.getRules();
            console.log(`SigmaRulesStore: Fetched ${rules.value.length} rules`);

            // Initialize search after rules are loaded
            await initFuse();
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
            currentRuleContent.value = await sigmaRepoService.getRule(rulePath);
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