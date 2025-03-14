import { defineStore } from 'pinia';
import { ref, computed, shallowRef } from 'vue';
import type { SigmaRule, SigmaLogsource } from '../lib/sigma/SigmaRepoService';
import { SigmaRepoService } from '../lib/sigma/SigmaRepoService';

// Simple fuzzy search utility for when Fuse.js is not loaded
function simpleFuzzySearch(items: SigmaRule[], query: string): SigmaRule[] {
  const words = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  
  if (words.length === 0) return items;
  
  return items.filter(item => {
    const itemText = [
      item.title,
      item.description,
      item.author,
      ...(item.tags || []),
      item.level,
      item.status,
      item.logsource?.category,
      item.logsource?.product,
      item.logsource?.service
    ].filter(Boolean).join(' ').toLowerCase();
    
    return words.every(word => itemText.includes(word));
  });
}

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
    
    // If Fuse.js is loaded and properly initialized, use it for search
    if (isFuseLoaded.value && fuseInstance.value) {
      try {
        return fuseInstance.value.search(searchQuery.value).map((result: any) => result.item);
      } catch (error) {
        console.error('Error searching with Fuse.js:', error);
        // Fallback to simple search if Fuse.js fails
        return simpleFuzzySearch(rules.value, searchQuery.value);
      }
    }
    
    // Fallback to simple fuzzy search
    return simpleFuzzySearch(rules.value, searchQuery.value);
  });

  async function initFuse() {
    try {
      // Dynamically import Fuse.js
      const Fuse = await import('fuse.js').catch(() => null);
      
      if (Fuse && Fuse.default && rules.value.length > 0) {
        fuseInstance.value = new Fuse.default(rules.value, {
          keys: [
            'title',
            'description',
            'tags',
            'author',
            'level',
            'status',
            'logsource.category',
            'logsource.product',
            'logsource.service'
          ],
          includeScore: true,
          threshold: 0.3,
          ignoreLocation: true,  
        });
        isFuseLoaded.value = true;
      }
    } catch (err) {
      console.error('Error initializing Fuse.js:', err);
      // We'll use the fallback search method
    }
  }

  async function fetchRules() {
    isLoading.value = true;
    error.value = null;
    
    try {
      rules.value = await sigmaRepoService.getRules();
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