import {defineStore} from 'pinia';
import {computed, ref, shallowRef, watch} from 'vue';
import type {SigmaRule} from '../lib/sigma/SigmaRepoService';
import {SigmaRepoService} from '../lib/sigma/SigmaRepoService';
import { DEFAULT_STATUS_FILTERS } from '@/components/sigma/utils';

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
  
  // Filter state persistence
  const statusFilters = ref(loadFromStorage('statusFilters', DEFAULT_STATUS_FILTERS));
  const selectedProduct = ref(loadFromStorage('selectedProduct', ''));
  const logsourceSortingStyle = ref(loadFromStorage('logsourceSortingStyle', 'product-category-service'));

  const sigmaRepoService = SigmaRepoService.getInstance();
  
  // Helper function to load values from localStorage
  function loadFromStorage<T>(key: string, defaultValue: T): T {
    try {
      const storedValue = localStorage.getItem(`sigma_${key}`);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  }
  
  // Save values to localStorage when they change
  watch(statusFilters, (newValue) => {
    localStorage.setItem('sigma_statusFilters', JSON.stringify(newValue));
  }, { deep: true });
  
  watch(selectedProduct, (newValue) => {
    localStorage.setItem('sigma_selectedProduct', JSON.stringify(newValue));
  });
  
  watch(logsourceSortingStyle, (newValue) => {
    localStorage.setItem('sigma_logsourceSortingStyle', JSON.stringify(newValue));
  });

  // Search-filtered rules (without applying status and product filters)
  const searchFilteredRules = computed(() => {
    if (!searchQuery.value) return rules.value;

    if (fuseInstance.value) {
      const results = fuseInstance.value.search(searchQuery.value);
      return results.map((result: any) => result.item);
    }
    
    // Fallback if Fuse.js isn't loaded yet
    return rules.value.filter(rule => {
      const query = searchQuery.value.toLowerCase();
      return (
        rule.title?.toLowerCase().includes(query) || 
        rule.description?.toLowerCase().includes(query) ||
        rule.tags?.some((tag: string) => tag.toLowerCase().includes(query)) ||
        rule.author?.toLowerCase().includes(query) ||
        rule.level?.toLowerCase().includes(query) ||
        rule.status?.toLowerCase().includes(query) ||
        rule.logsource?.product?.toLowerCase().includes(query) ||
        rule.logsource?.category?.toLowerCase().includes(query) ||
        rule.logsource?.service?.toLowerCase().includes(query)
      );
    });
  });

  // Apply all filters (search, status, and product) to get final filtered rules
  const filteredRules = computed(() => {
    // Start with search results
    let results = searchFilteredRules.value;
    
    // Apply status filters
    results = results.filter(rule => {
      // If rule has no status, include it only if at least one filter is enabled
      if (!rule.status) return Object.values(statusFilters.value).some(value => value);
      
      // Otherwise, check if the rule's status is in the enabled filters
      return statusFilters.value[rule.status.toLowerCase()] === true;
    });
    
    // Apply product filter if selected
    if (selectedProduct.value) {
      results = results.filter(rule => {
        const logsource = rule.logsource || {};
        const product = logsource.product?.toLowerCase();
        const category = logsource.category?.toLowerCase();
        const service = logsource.service?.toLowerCase();
        const selected = selectedProduct.value.toLowerCase();
        
        return product === selected || category === selected || service === selected;
      });
    }
    
    return results;
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
          useExtendedSearch: true,
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
  
  // Methods to update filter state
  function updateStatusFilters(filters: Record<string, boolean>) {
    statusFilters.value = filters;
  }
  
  function updateSelectedProduct(product: string) {
    selectedProduct.value = product;
  }
  
  function updateLogsourceSorting(style: string) {
    logsourceSortingStyle.value = style;
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
    statusFilters,
    selectedProduct,
    logsourceSortingStyle,
    fetchRules,
    fetchRuleContent,
    setCurrentRule,
    searchRules,
    updateStatusFilters,
    updateSelectedProduct,
    updateLogsourceSorting
  };
});