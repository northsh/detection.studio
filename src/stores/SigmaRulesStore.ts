import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { SigmaRule } from '../lib/sigma/SigmaRepoService';
import { SigmaRepoService } from '../lib/sigma/SigmaRepoService';

export const useSigmaRulesStore = defineStore('sigmaRules', () => {
  const rules = ref<SigmaRule[]>([]);
  const isLoading = ref(false);
  const currentRule = ref<SigmaRule | null>(null);
  const currentRuleContent = ref<string>('');
  const searchQuery = ref('');
  const error = ref<string | null>(null);

  const sigmaRepoService = SigmaRepoService.getInstance();

  const filteredRules = computed(() => {
    if (!searchQuery.value) return rules.value;
    
    const query = searchQuery.value.toLowerCase();
    return rules.value.filter(rule => {
      return (
        rule.title.toLowerCase().includes(query) ||
        rule.description.toLowerCase().includes(query) ||
        rule.tags.some(tag => tag.toLowerCase().includes(query)) ||
        rule.author.toLowerCase().includes(query)
      );
    });
  });

  async function fetchRules() {
    isLoading.value = true;
    error.value = null;
    
    try {
      rules.value = await sigmaRepoService.getRules();
    } catch (err) {
      console.error('Error fetching sigma rules:', err);
      error.value = err instanceof Error ? err.message : 'Failed to fetch rules';
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchRuleContent(rulePath: string) {
    isLoading.value = true;
    error.value = null;
    
    try {
      currentRuleContent.value = await sigmaRepoService.getRule(rulePath);
    } catch (err) {
      console.error(`Error fetching rule content for ${rulePath}:`, err);
      error.value = err instanceof Error ? err.message : 'Failed to fetch rule content';
      currentRuleContent.value = '';
    } finally {
      isLoading.value = false;
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