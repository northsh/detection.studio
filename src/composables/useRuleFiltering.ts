import { computed, reactive, ref, type Ref } from 'vue'
import type { SigmaRule } from '../stores/SigmaBrowserStore'

export interface FilterState {
  searchQuery: string
  statusFilters: Record<string, boolean>
  selectedProduct: string
}

export function useRuleFiltering(allRules: Ref<SigmaRule[]>) {
  // Filter state
  const filterState = reactive<FilterState>({
    searchQuery: '',
    statusFilters: {
      stable: true,
      test: true,
      experimental: true,
      deprecated: false,
      unsupported: false
    },
    selectedProduct: ''
  })

  const statusOptions = ['stable', 'test', 'experimental', 'deprecated', 'unsupported']
  const productSearchQuery = ref('')

  // Get unique product options with caching
  const productOptions = computed(() => {
    const options = new Set<string>()
    
    allRules.value.forEach(rule => {
      if (rule.logsource?.product) options.add(rule.logsource.product)
      if (rule.logsource?.category) options.add(rule.logsource.category)
      if (rule.logsource?.service) options.add(rule.logsource.service)
    })
    
    return Array.from(options).sort()
  })

  // Filtered product options based on search
  const filteredProductOptions = computed(() => {
    if (!productSearchQuery.value) return productOptions.value
    
    const query = productSearchQuery.value.toLowerCase()
    return productOptions.value.filter(product =>
      product.toLowerCase().includes(query)
    )
  })

  // Get enabled status filters
  const enabledStatusFilters = computed(() => {
    return Object.entries(filterState.statusFilters)
      .filter(([_, enabled]) => enabled)
      .map(([status]) => status)
  })

  // Apply all filters to rules
  const filteredRules = computed(() => {
    let filtered = allRules.value

    // Apply text search filter
    if (filterState.searchQuery.trim()) {
      const query = filterState.searchQuery.toLowerCase()
      filtered = filtered.filter(rule => 
        rule.title.toLowerCase().includes(query) ||
        rule.description.toLowerCase().includes(query) ||
        rule.author.toLowerCase().includes(query) ||
        rule.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply status filter
    if (enabledStatusFilters.value.length > 0) {
      filtered = filtered.filter(rule => 
        rule.status && enabledStatusFilters.value.includes(rule.status)
      )
    }

    // Apply product filter
    if (filterState.selectedProduct) {
      filtered = filtered.filter(rule => 
        rule.logsource?.product === filterState.selectedProduct ||
        rule.logsource?.category === filterState.selectedProduct ||
        rule.logsource?.service === filterState.selectedProduct
      )
    }

    return filtered
  })

  // Get active filters count
  const activeFiltersCount = computed(() => {
    let count = enabledStatusFilters.value.length
    if (filterState.selectedProduct) count++
    return count
  })

  // Actions
  function toggleStatusFilter(status: string) {
    filterState.statusFilters[status] = !filterState.statusFilters[status]
  }

  function clearSearch() {
    filterState.searchQuery = ''
  }

  function updateSearchQuery(query: string) {
    filterState.searchQuery = query
  }

  function clearFilters() {
    filterState.selectedProduct = ''
    productSearchQuery.value = ''
  }

  // Debounced product search
  let productSearchTimeout: number | null = null
  function onProductSearch(event: Event) {
    if (productSearchTimeout) {
      clearTimeout(productSearchTimeout)
    }

    productSearchTimeout = window.setTimeout(() => {
      productSearchQuery.value = (event.target as HTMLInputElement).value
      productSearchTimeout = null
    }, 200)
  }

  return {
    filterState,
    statusOptions,
    productSearchQuery,
    productOptions,
    filteredProductOptions,
    enabledStatusFilters,
    filteredRules,
    activeFiltersCount,
    toggleStatusFilter,
    clearSearch,
    clearFilters,
    onProductSearch,
    updateSearchQuery
  }
}