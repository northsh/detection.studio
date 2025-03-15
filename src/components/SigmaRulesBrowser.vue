<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div class="p-6 border-b bg-card shadow-sm">
      <h2 class="text-xl font-bold mb-4">Sigma Rules Browser</h2>
      
      <!-- Search input -->
      <Input
        v-model="searchQuery"
        placeholder="Search rules..."
        class="w-full"
        @input="onSearch"
      />
      
      <!-- Filter controls -->
      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Status filter -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium">Status</h3>
            <Badge variant="outline" class="text-xs">{{ enabledStatusFilters.length }} selected</Badge>
          </div>
          <div class="flex flex-wrap gap-2">
            <div v-for="status in statusOptions" :key="status" class="flex items-center space-x-2">
              <Checkbox 
                :id="`status-${status}`" 
                v-model:checked="statusFilters[status]"
                @update:checked="applyFilters"
              />
              <label 
                :for="`status-${status}`" 
                class="text-xs leading-none cursor-pointer"
              >
                {{ status }}
              </label>
            </div>
          </div>
        </div>
        
        <!-- Logsource filter with combobox for search -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium">Filter by Logsource</h3>
          <Combobox v-model="selectedProduct" @update:modelValue="applyFilters">
            <ComboboxAnchor>
              <div class="relative w-full items-center">
                <ComboboxInput 
                  class="pl-9 w-full"
                  placeholder="Search product/category/service..." 
                  @input="onProductSearch"
                  :display-value="(val) => val"
                />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                  <Search class="size-4 text-muted-foreground" />
                </span>
              </div>
            </ComboboxAnchor>
            
            <ComboboxList class="w-full">
              <ComboboxEmpty>
                No matches found
              </ComboboxEmpty>

              <ComboboxGroup>
                <ComboboxItem 
                  v-for="option in filteredProductOptions" 
                  :key="option" 
                  :value="option"
                >
                  {{ option }}

                  <ComboboxItemIndicator>
                    <Check :class="cn('ml-auto h-4 w-4')" />
                  </ComboboxItemIndicator>
                </ComboboxItem>
              </ComboboxGroup>
            </ComboboxList>
          </Combobox>
        </div>
      </div>
      
      <!-- Logsource sorting toggle -->
      <div class="mt-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium">Group By</h3>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-xs text-gray-500">Product</span>
          <Toggle 
            :pressed="logsourceSortingStyle === 'category-product-service'" 
            @update:pressed="toggleLogSourceSorting"
          />
          <span class="text-xs text-gray-500">Category</span>
        </div>
      </div>
    </div>
    
    <!-- Error state -->
    <div v-if="error" class="p-4 flex flex-col justify-center items-center flex-grow text-red-500">
      <div class="bg-red-100 border border-red-300 rounded-md p-4 mb-4 max-w-md">
        <p class="font-semibold">Error loading rules</p>
        <p class="text-sm">{{ error }}</p>
      </div>
      <button 
        @click="retryLoadRules" 
        class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Retry
      </button>
    </div>
    
    <!-- Loading state -->
    <div v-else-if="isLoading" class="p-4 flex justify-center items-center flex-grow">
      <div class="flex flex-col items-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p class="mt-2">Loading rules...</p>
      </div>
    </div>
    
    <!-- Results list -->
    <div v-else class="flex-grow overflow-hidden">
      <div v-if="allRules.length === 0" class="text-center py-16 flex flex-col items-center justify-center h-full">
        <div class="bg-muted/30 rounded-lg p-6 max-w-md">
          <h3 class="text-lg font-medium mb-2">No Sigma Rules Found</h3>
          <p class="text-gray-500 mb-4">
            The rules index file may be missing or empty. Please ensure the "sigma-rules-index.json" file exists in the public directory.
          </p>
          <button 
            @click="retryLoadRules" 
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Retry Loading Rules
          </button>
        </div>
      </div>
      <div v-else-if="groupedRules.length === 0" class="text-center py-4 text-gray-500">
        No rules found matching your criteria.
      </div>
      <div v-else ref="containerRef" class="h-full overflow-auto">
        <div class="relative" :style="{ height: `${totalHeight}px` }">
          <div 
            v-for="(group, groupIndex) in visibleGroups" 
            :key="group.label" 
            class="mb-6 px-4"
            :style="{ transform: `translateY(${group.offsetTop}px)`, position: 'absolute', width: 'calc(100% - 16px)', left: 0, right: 0 }"
          >
            <div class="flex items-center justify-between sticky top-0 bg-background py-2 border-b mb-2">
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-500">
                {{ group.label }}
              </h3>
              <Badge variant="outline" class="text-xs">{{ group.items.length }} rules</Badge>
            </div>
            <div class="space-y-3">
              <div 
                v-for="itemInfo in group.items" 
                :key="itemInfo.rule.id || itemInfo.rule.path"
                class="p-3 border rounded-md hover:bg-muted cursor-pointer transition-colors"
                :class="{'border-primary/50 bg-primary/5': isSelected(itemInfo.rule)}"
                @click="selectRule(itemInfo.rule)"
              >
                <div class="flex items-start justify-between">
                  <h3 class="font-medium">{{ itemInfo.rule.title }}</h3>
                </div>

                  <div class="flex items-start justify-between">
                  <div class="flex gap-1.5">
                    <Badge 
                      v-if="itemInfo.rule.level" 
                      :class="getLevelBadgeClass(itemInfo.rule.level)"
                      class="uppercase font-semibold text-[10px] tracking-wider"
                    >
                      {{ itemInfo.rule.level }}
                    </Badge>
                    <Badge 
                      v-if="itemInfo.rule.status" 
                      class="uppercase font-semibold text-[10px] tracking-wider bg-gray-200 text-gray-800 hover:bg-gray-200"
                    >
                      {{ itemInfo.rule.status }}
                    </Badge>
                  </div>
                </div>
                <p class="text-sm text-gray-500 line-clamp-2 mt-1">{{ itemInfo.rule.description }}</p>
                <div class="flex flex-wrap gap-1.5 mt-2">
                  <Badge v-if="itemInfo.rule.logsource?.product" variant="secondary" class="px-2 py-0 text-xs">
                    {{ itemInfo.rule.logsource.product }}
                  </Badge>
                  <Badge v-if="itemInfo.rule.logsource?.category" variant="secondary" class="px-2 py-0 text-xs">
                    {{ itemInfo.rule.logsource.category }}
                  </Badge>
                  <Badge v-if="itemInfo.rule.logsource?.service" variant="secondary" class="px-2 py-0 text-xs">
                    {{ itemInfo.rule.logsource.service }}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, reactive, ref} from 'vue';
import {useSigmaRulesStore} from '../stores/SigmaBrowserStore.ts';
import {Input} from '@/components/ui/input';
import {Badge} from '@/components/ui/badge';
import {Checkbox} from '@/components/ui/checkbox';
import {
    Combobox,
    ComboboxAnchor,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxList
} from '@/components/ui/combobox'
import {Toggle} from '@/components/ui/toggle';
import {useRoute, useRouter} from 'vue-router';
import type {SigmaRule} from '../lib/sigma/SigmaRepoService';
import {Check, Search} from 'lucide-vue-next';
import {cn} from '@/lib/utils';

// Accept initial rule ID from parent component
const props = defineProps<{
  initialRuleId?: string | null
}>();

const router = useRouter();
const route = useRoute();
const sigmaRulesStore = useSigmaRulesStore();

// Local refs for component state
const searchQuery = ref('');
const isLoading = computed(() => sigmaRulesStore.isLoading);
const error = computed(() => sigmaRulesStore.error);
const allRules = computed(() => sigmaRulesStore.rules);

// Filter options
const statusOptions = ['stable', 'test', 'experimental', 'deprecated', 'unsupported'];
const statusFilters = reactive({
  stable: true,
  test: true,
  experimental: true,
  deprecated: false,
  unsupported: false
});

const selectedProduct = ref('');
const logsourceSortingStyle = ref('product-category-service');
const productSearchQuery = ref('');

// Computed status filters that are enabled
const enabledStatusFilters = computed(() => {
  return Object.entries(statusFilters)
    .filter(([_, enabled]) => enabled)
    .map(([status]) => status);
});

// Get unique logsource options (products, categories, services) from rules
const productOptions = computed(() => {
  const options = new Set<string>();
  
  allRules.value.forEach(rule => {
    if (rule.logsource?.product) {
      options.add(rule.logsource.product);
    }
    if (rule.logsource?.category) {
      options.add(rule.logsource.category);
    }
    if (rule.logsource?.service) {
      options.add(rule.logsource.service);
    }
  });
  
  return Array.from(options).sort();
});

// Filtered product options based on search query
const filteredProductOptions = computed(() => {
  if (!productSearchQuery.value) return productOptions.value;
  
  const query = productSearchQuery.value.toLowerCase();
  return productOptions.value.filter(product => 
    product.toLowerCase().includes(query)
  );
});

// Handle product search
function onProductSearch(event: Event) {
  productSearchQuery.value = (event.target as HTMLInputElement).value;
}

// Filter rules based on search and filters
const filteredRules = computed(() => {
  // First apply the text search
  let rules = sigmaRulesStore.filteredRules;
  
  // Then apply status filters
  rules = rules.filter(rule => {
    // If rule has no status, include it only if at least one filter is enabled
    if (!rule.status) return Object.values(statusFilters).some(value => value);
    
    // Otherwise, check if the rule's status is in the enabled filters
    return statusFilters[rule.status.toLowerCase()] === true;
  });
  
  // Apply product filter if selected
  if (selectedProduct.value) {
    // Check if the selected product might actually be a category or service
    rules = rules.filter(rule => {
      const logsource = rule.logsource || {};
      const product = logsource.product?.toLowerCase();
      const category = logsource.category?.toLowerCase();
      const service = logsource.service?.toLowerCase();
      const selected = selectedProduct.value.toLowerCase();
      
      return product === selected || category === selected || service === selected;
    });
  }
  
  return rules;
});

// Group rules by product, category, or other criteria
const groupedRules = computed(() => {
  const rules = filteredRules.value;
  const groups: Record<string, SigmaRule[]> = {};
  
  // Group by the selected sorting style
  rules.forEach(rule => {
    let groupKey = 'Other';
    
    if (logsourceSortingStyle.value === 'product-category-service') {
      groupKey = rule.logsource?.product || 'Other';
    } else {
      groupKey = rule.logsource?.category || 'Other';
    }
    
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    
    groups[groupKey].push(rule);
  });
  
  // Convert to array and sort
  return Object.entries(groups)
    .map(([label, rules]) => ({ 
      label, 
      rules,
      expanded: true 
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
});

// Virtual scroll implementation
const ITEM_HEIGHT = 140; // Estimated height of each item (increased to prevent overlap)
const GROUP_HEADER_HEIGHT = 50; // Estimated height of group headers (increased for better spacing)
const BUFFER_SIZE = 10; // Increased buffer size to prevent rendering gaps

const containerRef = ref<HTMLElement | null>(null);
const scrollTop = ref(0);
const viewportHeight = ref(0);

interface GroupInfo {
  label: string;
  items: Array<{
    rule: SigmaRule;
    index: number;
  }>;
  offsetTop: number;
  height: number;
}

// Calculate positions and visible groups
const allGroupPositions = computed(() => {
  const positions: GroupInfo[] = [];
  let currentOffset = 0;
  
  groupedRules.value.forEach(group => {
    const itemCount = group.rules.length;
    const groupHeight = GROUP_HEADER_HEIGHT + (itemCount * ITEM_HEIGHT);
    
    positions.push({
      label: group.label,
      items: group.rules.map((rule, index) => ({ rule, index })),
      offsetTop: currentOffset,
      height: groupHeight
    });
    
    currentOffset += groupHeight + 20; // Add margin between groups
  });
  
  return positions;
});

// Calculate total scrollable height
const totalHeight = computed(() => {
  if (allGroupPositions.value.length === 0) return 0;
  const lastGroup = allGroupPositions.value[allGroupPositions.value.length - 1];
  return lastGroup.offsetTop + lastGroup.height;
});

// Calculate which groups should be visible
const visibleGroups = computed(() => {
  if (!containerRef.value) return [];
  
  const startOffset = Math.max(0, scrollTop.value - 200);
  const endOffset = scrollTop.value + viewportHeight.value + 200;
  
  return allGroupPositions.value.filter(group => {
    const groupEnd = group.offsetTop + group.height;
    return groupEnd > startOffset && group.offsetTop < endOffset;
  });
});

// Update scroll position on scroll
function updateScroll() {
  if (!containerRef.value) return;
  
  scrollTop.value = containerRef.value.scrollTop;
  viewportHeight.value = containerRef.value.clientHeight;
}

// Check if a rule is currently selected
function isSelected(rule: SigmaRule) {
  return sigmaRulesStore.currentRule?.id === rule.id || 
         sigmaRulesStore.currentRule?.path === rule.path;
}

// Load rules when component is mounted
onMounted(async () => {
  try {
    console.log('SigmaRulesBrowser: Mounted, fetching rules...');
    await sigmaRulesStore.fetchRules();
    console.log(`SigmaRulesBrowser: Fetched ${sigmaRulesStore.rules.length} rules`);
    
    if (containerRef.value) {
      viewportHeight.value = containerRef.value.clientHeight;
      containerRef.value.addEventListener('scroll', updateScroll);
      console.log('SigmaRulesBrowser: Scroll listener attached');
    }
    
    // Use either the prop or route query parameter to select a rule
    const ruleIdToSelect = props.initialRuleId || route.query.ruleId as string;
    console.log('SigmaRulesBrowser: Rule ID to select:', ruleIdToSelect);
    
    if (ruleIdToSelect) {
      await selectRuleById(ruleIdToSelect);
    }
    
    // Force an update of scroll position
    updateScroll();
  } catch (err) {
    console.error('SigmaRulesBrowser: Error during initialization:', err);
    error.value = err instanceof Error ? err.message : 'Failed to initialize rules browser';
  }
});

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', updateScroll);
  }
});

// Handle search input
function onSearch() {
  sigmaRulesStore.searchRules(searchQuery.value);
  resetScroll();
}

// Apply filters and reset scroll
function applyFilters() {
  resetScroll();
}

// Toggle between product and category grouping
function toggleLogSourceSorting(pressed: boolean) {
  logsourceSortingStyle.value = pressed 
    ? 'category-product-service' 
    : 'product-category-service';
  applyFilters();
}

// Retry loading rules if there was an error
async function retryLoadRules() {
  error.value = null;
  isLoading.value = true;
  
  try {
    console.log('SigmaRulesBrowser: Retrying fetch rules...');
    await sigmaRulesStore.fetchRules(true); // Force reload
    console.log(`SigmaRulesBrowser: Fetched ${sigmaRulesStore.rules.length} rules on retry`);
    
    // Force an update of scroll position
    if (containerRef.value) {
      viewportHeight.value = containerRef.value.clientHeight;
    }
    updateScroll();
  } catch (err) {
    console.error('SigmaRulesBrowser: Error during retry:', err);
    error.value = err instanceof Error ? err.message : 'Failed to load rules';
  } finally {
    isLoading.value = false;
  }
}

// Reset scroll position
function resetScroll() {
  if (containerRef.value) {
    containerRef.value.scrollTop = 0;
    scrollTop.value = 0;
  }
}

// Select a rule to view details
function selectRule(rule: SigmaRule) {
  sigmaRulesStore.setCurrentRule(rule);
  
  // Update URL with rule ID
  router.replace({ 
    query: { 
      ...route.query,
      ruleId: rule.id || rule.path 
    }
  });
}

// Select a rule by ID from URL
async function selectRuleById(ruleId: string) {
  // Find the rule by ID or path
  const rule = allRules.value.find(r => 
    r.id === ruleId || r.path === ruleId
  );
  
  if (rule) {
    await sigmaRulesStore.setCurrentRule(rule);
  }
}

// Get badge class based on rule level - match styling from SigmaRuleViewer
function getLevelBadgeClass(level: string): string {
  const lowerLevel = level.toLowerCase();
  
  if (lowerLevel === 'critical') return 'bg-red-600 hover:bg-red-700';
  if (lowerLevel === 'high') return 'bg-red-500 hover:bg-red-600';
  if (lowerLevel === 'medium') return 'bg-amber-500 hover:bg-amber-600'; 
  if (lowerLevel === 'low') return 'bg-blue-500 hover:bg-blue-600';
  if (lowerLevel === 'informational') return 'bg-green-500 hover:bg-green-600';
  
  return 'bg-gray-500 hover:bg-gray-600';
}
</script>

<style scoped>
/* Add hover effect for badges */
.badge:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

/* Fix for virtual scroll overlapping */
.h-full.overflow-auto {
  position: relative;
}

/* Ensure enough padding between groups */
.mb-6 {
  margin-bottom: 1.5rem;
}

/* Fix for sticky group headers */
.sticky {
  z-index: 10;
}

/* Better hover effect for rule items */
.rounded-md.hover\:bg-muted {
  transition: all 0.2s ease;
}

.rounded-md.hover\:bg-muted:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>