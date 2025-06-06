<template>
    <div class="flex flex-col h-full overflow-hidden">
        <div class="p-4 border-b bg-card shadow-xs">

            <!-- Search input with throttled input -->
            <div class="relative w-full">
                <Input
                    v-model="searchQuery"
                    class="w-full pl-9"
                    placeholder="Search across rules..."
                    @input="onSearch"
                />
                <Search class="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Button 
                    v-if="searchQuery"
                    variant="ghost" 
                    size="icon" 
                    class="h-8 w-8 absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    @click="clearSearch"
                >
                    <XCircle class="h-4 w-4" />
                </Button>
            </div>

            <!-- Filter controls -->
            <div class="mt-4 space-y-4 bg-muted px-4 py-1 rounded">
                <!-- Collapsible filters section -->
                <Collapsible>
                    <CollapsibleTrigger asChild>
                        <div class="flex items-center justify-between cursor-pointer">
                            <div class="flex items-center gap-2">
                                <h3 class="text-sm font-medium">Filters</h3>
                                <Badge class="text-xs" variant="outline">{{ getActiveFiltersCount() }}</Badge>
                            </div>
                            <ChevronDown
                                class="h-4 w-4 text-muted-foreground transition-transform ui-expanded:rotate-180"/>
                        </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent class="pt-2">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Status filter -->
                            <div class="space-y-2">
                                <h3 class="text-xs font-medium text-muted-foreground">Status</h3>
                                <div class="flex flex-wrap gap-1.5">
                                    <Badge
                                        v-for="status in statusOptions"
                                        :key="status"
                                        :class="[
                      statusFilters[status] ? 'bg-primary/10 text-primary border-primary/20' :
                      'bg-muted/50 text-muted-foreground hover:bg-muted',
                      'cursor-pointer transition-colors'
                    ]"
                                        variant="outline"
                                        @click="toggleStatusFilter(status)"
                                    >
                                        {{ status }}
                                    </Badge>
                                </div>
                            </div>

                            <!-- Logsource filter with combobox for search -->
                            <div class="space-y-2">
                                <h3 class="text-xs font-medium text-muted-foreground">Filter by Logsource</h3>
                                <Combobox v-model="selectedProduct" @update:modelValue="applyFilters">
                                    <ComboboxAnchor>
                                        <div class="relative w-full items-center">
                                            <ComboboxInput
                                                :display-value="(val) => val"
                                                class="pl-9 w-full bg-background"
                                                placeholder="Search product/category/service..."
                                                @input="onProductSearch"
                                            />
                                            <span
                                                class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                        <Search class="size-4 text-muted-foreground"/>
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
                                                class="flex items-center justify-between"
                                            >
                                                <div class="flex items-center gap-2">
                                                    <span>{{ option }}</span>
                                                    <Badge v-if="getOptionType(option)" class="text-[10px]"
                                                           variant="outline">
                                                        {{ getOptionType(option) }}
                                                    </Badge>
                                                </div>

                                                <ComboboxItemIndicator>
                                                    <Check :class="cn('ml-auto h-4 w-4')"/>
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
                                <h3 class="text-xs font-medium text-muted-foreground">Group By</h3>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="text-xs text-muted-foreground">Product</span>
                                <Toggle
                                    :pressed="logsourceSortingStyle === 'category-product-service'"
                                    size="sm"
                                    @update:pressed="toggleLogSourceSorting"
                                />
                                <span class="text-xs text-muted-foreground">Category</span>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>

        <!-- Error state -->
        <div v-if="error" class="p-4 flex flex-col justify-center items-center grow text-red-500">
            <Alert class="max-w-md" variant="destructive">
                <AlertTitle>Error loading rules</AlertTitle>
                <AlertDescription>{{ error }}</AlertDescription>
            </Alert>
            <Button
                class="mt-4"
                variant="default"
                @click="retryLoadRules"
            >
                Retry
            </Button>
        </div>

        <!-- Loading state with skeleton -->
        <div v-else-if="isLoading" class="p-4 grow">
            <div class="space-y-4">
                <div v-for="i in 3" :key="`skeleton-group-${i}`" class="space-y-3">
                    <div class="flex items-center justify-between">
                        <Skeleton class="h-4 w-32"/>
                        <Skeleton class="h-4 w-12"/>
                    </div>
                    <div v-for="j in 3" :key="`skeleton-item-${i}-${j}`" class="p-3 border border-border rounded-md">
                        <Skeleton class="h-5 w-2/3 mb-2"/>
                        <div class="flex gap-1.5 mb-2">
                            <Skeleton class="h-4 w-16"/>
                            <Skeleton class="h-4 w-16"/>
                        </div>
                        <Skeleton class="h-4 w-full mb-2"/>
                        <Skeleton class="h-4 w-3/4"/>
                        <div class="flex gap-1.5 mt-2">
                            <Skeleton class="h-4 w-20"/>
                            <Skeleton class="h-4 w-20"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Results list -->
        <ScrollArea v-else class="grow overflow-hidden">
            <div v-if="allRules.length === 0"
                 class="text-center py-16 flex flex-col items-center justify-center h-full">
                <div class="bg-muted/30 rounded-lg p-6 max-w-md">
                    <h3 class="text-lg font-medium mb-2">No Sigma Rules Found</h3>
                    <p class="text-muted-foreground mb-4">
                        The rules index file may be missing or empty. Please ensure the "sigma-rules-index.json" file
                        exists in the public directory.
                    </p>
                    <Button
                        variant="default"
                        @click="retryLoadRules"
                    >
                        Retry Loading Rules
                    </Button>
                </div>
            </div>
            <div v-else-if="groupedRules.length === 0" class="text-center py-4 text-muted-foreground">
                No rules found matching your criteria.
            </div>
            <div v-else ref="containerRef" class="">
                <div :style="{ height: `${totalHeight}px` }" class="relative">
                    <div
                        v-for="(group, groupIndex) in visibleGroups"
                        :key="group.label"
                        class="mb-6"
                    >
                        <div
                            class="flex items-center justify-between sticky top-0 bg-background py-2 z-10 border-b mb-2 px-4">
                            <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                {{ group.label }}
                            </h3>
                            <Badge class="text-xs" variant="outline">{{ group.items.length }} rules</Badge>
                        </div>
                        <div class="space-y-2">
                            <div
                                v-for="itemInfo in group.items"
                                :key="itemInfo.rule.id || itemInfo.rule.path"
                                :class="{'border-primary/50 bg-primary/5': isSelected(itemInfo.rule)}"
                                class="mx-4 p-3 border rounded-md hover:bg-muted cursor-pointer transition-all hover:-translate-y-[1px] hover:shadow-xs"
                                @click="selectRule(itemInfo.rule)"
                            >
                                <div class="flex items-start justify-between">
                                    <h3 class="font-medium">{{ itemInfo.rule.title }}</h3>
                                </div>

                                <div class="flex items-start justify-between mt-1">
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
                                            class="uppercase font-semibold text-[10px] tracking-wider"
                                            variant="outline"
                                        >
                                            {{ itemInfo.rule.status }}
                                        </Badge>
                                    </div>
                                </div>
                                <p class="text-sm text-muted-foreground line-clamp-2 mt-1">{{
                                        itemInfo.rule.description
                                    }}</p>
                                <div class="flex flex-wrap gap-1.5 mt-2">
                                    <Badge v-if="itemInfo.rule.logsource?.product" class="px-2 py-0 text-xs"
                                           variant="secondary">
                                        {{ itemInfo.rule.logsource.product }}
                                    </Badge>
                                    <Badge v-if="itemInfo.rule.logsource?.category" class="px-2 py-0 text-xs"
                                           variant="secondary">
                                        {{ itemInfo.rule.logsource.category }}
                                    </Badge>
                                    <Badge v-if="itemInfo.rule.logsource?.service" class="px-2 py-0 text-xs"
                                           variant="secondary">
                                        {{ itemInfo.rule.logsource.service }}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollBar />
        </ScrollArea>
    </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, onUnmounted, reactive, ref} from 'vue';
import {useSigmaRulesStore} from '../stores/SigmaBrowserStore.ts';
import {Input} from '@/components/ui/input';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
    Combobox,
    ComboboxAnchor,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxList
} from '@/components/ui/combobox';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
import {Toggle} from '@/components/ui/toggle';
import {Skeleton} from '@/components/ui/skeleton';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {useRoute, useRouter} from 'vue-router';
import type {SigmaRule} from '../lib/sigma/SigmaRepoService';
import {Check, ChevronDown, Search, XCircle} from 'lucide-vue-next';
import {cn} from '@/lib/utils';
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

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

// Track product-category-service mappings for better UX
const logsourceMapping = computed(() => {
    const mapping: Record<string, { type: string, items: Set<string> }> = {};

    allRules.value.forEach(rule => {
        if (rule.logsource?.product) {
            if (!mapping[rule.logsource.product]) {
                mapping[rule.logsource.product] = {type: 'product', items: new Set()};
            }

            if (rule.logsource.category) {
                mapping[rule.logsource.product].items.add(rule.logsource.category);

                if (!mapping[rule.logsource.category]) {
                    mapping[rule.logsource.category] = {type: 'category', items: new Set()};
                }
            }

            if (rule.logsource.service) {
                mapping[rule.logsource.product].items.add(rule.logsource.service);

                if (!mapping[rule.logsource.service]) {
                    mapping[rule.logsource.service] = {type: 'service', items: new Set()};
                }
            }
        }
    });

    return mapping;
});

// Helper to determine option type
function getOptionType(option: string): string | null {
    return logsourceMapping.value[option]?.type || null;
}

// Computed status filters that are enabled
const enabledStatusFilters = computed(() => {
    return Object.entries(statusFilters)
        .filter(([_, enabled]) => enabled)
        .map(([status]) => status);
});

// Get active filters count for badge
function getActiveFiltersCount(): string {
    let count = enabledStatusFilters.value.length;
    if (selectedProduct.value) count++;
    return count.toString();
}

// Toggle status filter
function toggleStatusFilter(status: string) {
    statusFilters[status] = !statusFilters[status];
    applyFilters();
}

// Cache for product options
const productOptionsCache = ref({
    rulesLength: 0,
    options: [] as string[]
});

// Get unique logsource options (products, categories, services) from rules with caching
const productOptions = computed(() => {
    // Only recompute if the rules array has changed
    if (productOptionsCache.value.rulesLength === allRules.value.length && 
        productOptionsCache.value.options.length > 0) {
        return productOptionsCache.value.options;
    }
    
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

    const sortedOptions = Array.from(options).sort();
    
    // Update cache
    productOptionsCache.value = {
        rulesLength: allRules.value.length,
        options: sortedOptions
    };
    
    return sortedOptions;
});

// Filtered product options based on search query
const filteredProductOptions = computed(() => {
    if (!productSearchQuery.value) return productOptions.value;

    const query = productSearchQuery.value.toLowerCase();
    return productOptions.value.filter(product =>
        product.toLowerCase().includes(query)
    );
});

// Debounce product search to avoid triggering on every keystroke
let productSearchTimeout: number | null = null;

// Handle product search with debouncing
function onProductSearch(event: Event) {
    if (productSearchTimeout) {
        clearTimeout(productSearchTimeout);
    }
    
    productSearchTimeout = window.setTimeout(() => {
        productSearchQuery.value = (event.target as HTMLInputElement).value;
        productSearchTimeout = null;
    }, 200);
}

// Clear search input and reset search results
function clearSearch() {
    searchQuery.value = '';
    sigmaRulesStore.searchRules('');
    resetScroll();
}

// Memoize the filter results to avoid recomputing for the same inputs
const lastFilters = ref({
    searchResult: [] as SigmaRule[],
    searchQuery: '',
    statusFilters: {...statusFilters},
    selectedProduct: ''
});

// Filter rules based on search and filters with memoization
const filteredRules = computed(() => {
    // Check if search results or filters have changed
    // const searchChanged = lastFilters.value.searchQuery !== sigmaRulesStore.searchQuery;
    // const statusFiltersChanged = Object.entries(statusFilters).some(
    //     ([key, value]) => lastFilters.value.statusFilters[key] !== value
    // );
    // const productChanged = lastFilters.value.selectedProduct !== selectedProduct.value;
    //
    // // If nothing has changed, return the cached results
    // if (!searchChanged && !statusFiltersChanged && !productChanged && lastFilters.value.searchResult.length > 0) {
    //     return lastFilters.value.searchResult;
    // }
    
    // First apply the text search
    let rules = sigmaRulesStore.filteredRules;

    // Then apply status filters
    // rules = rules.filter(rule => {
    //     // If rule has no status, include it only if at least one filter is enabled
    //     if (!rule.status) return Object.values(statusFilters).some(value => value);
    //
    //     // Otherwise, check if the rule's status is in the enabled filters
    //     return statusFilters[rule.status.toLowerCase()] === true;
    // });

    // Apply product filter if selected
    // if (selectedProduct.value) {
    //     // Check if the selected product might actually be a category or service
    //     const selected = selectedProduct.value.toLowerCase();
    //
    //     rules = rules.filter(rule => {
    //         const logsource = rule.logsource || {};
    //         const product = logsource.product?.toLowerCase() || '';
    //         const category = logsource.category?.toLowerCase() || '';
    //         const service = logsource.service?.toLowerCase() || '';
    //
    //         return product === selected || category === selected || service === selected;
    //     });
    // }

    // Update the cached values
    // lastFilters.value = {
    //     searchResult: rules,
    //     searchQuery: sigmaRulesStore.searchQuery,
    //     statusFilters: {...statusFilters},
    //     selectedProduct: selectedProduct.value
    // };

    return rules;
});

// Cache for grouped rules
const groupedRulesCache = ref({
    key: '',
    result: [] as { label: string; rules: SigmaRule[]; expanded: boolean }[]
});

// Group rules by product, category, or other criteria with memoization
const groupedRules = computed(() => {
    // Create a cache key based on current filtering and sorting values
    const cacheKey = JSON.stringify({
        rulesCount: filteredRules.value.length,
        sortingStyle: logsourceSortingStyle.value,
        searchQuery: sigmaRulesStore.searchQuery,
        statusFilters: Object.entries(statusFilters).filter(([_, v]) => v).map(([k]) => k).join(','),
        product: selectedProduct.value
    });
    
    // If cache is valid, return cached result
    if (groupedRulesCache.value.key === cacheKey && groupedRulesCache.value.result.length > 0) {
        return groupedRulesCache.value.result;
    }
    
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
    const result = Object.entries(groups)
        .map(([label, rules]) => ({
            label,
            rules,
            expanded: true
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
        
    // Update cache
    groupedRulesCache.value = {
        key: cacheKey,
        result
    };
    
    return result;
});

// Virtual scroll implementation
const ITEM_HEIGHT = 150; // Estimated height of each item (increased to prevent overlap)
const GROUP_HEADER_HEIGHT = 50; // Estimated height of group headers (increased for better spacing)
const BUFFER_SIZE = 12; // Increased buffer size to prevent rendering gaps

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

// Cache for group positions calculation
const groupPositionsCache = ref({
    key: '',
    positions: [] as GroupInfo[]
});

// Calculate positions and visible groups with caching
const allGroupPositions = computed(() => {
    // Create a cache key from the grouped rules
    const cacheKey = JSON.stringify({
        groupCount: groupedRules.value.length,
        itemCounts: groupedRules.value.map(g => g.rules.length).join(',')
    });
    
    // Return cached result if valid
    if (groupPositionsCache.value.key === cacheKey && 
        groupPositionsCache.value.positions.length > 0) {
        return groupPositionsCache.value.positions;
    }
    
    const positions: GroupInfo[] = [];
    let currentOffset = 0;

    groupedRules.value.forEach(group => {
        const itemCount = group.rules.length;
        const groupHeight = GROUP_HEADER_HEIGHT + (itemCount * ITEM_HEIGHT);

        positions.push({
            label: group.label,
            items: group.rules.map((rule, index) => ({rule, index})),
            offsetTop: currentOffset,
            height: groupHeight
        });

        currentOffset += groupHeight + 24; // Add margin between groups
    });
    
    // Update cache
    groupPositionsCache.value = {
        key: cacheKey,
        positions
    };

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

    const startOffset = Math.max(0, scrollTop.value - BUFFER_SIZE * ITEM_HEIGHT);
    const endOffset = scrollTop.value + viewportHeight.value + BUFFER_SIZE * ITEM_HEIGHT;

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

// Debounce search to avoid triggering search on every keystroke
let searchTimeout: number | null = null;

// Handle search input with debouncing
function onSearch() {
    // if (searchTimeout) {
    //     clearTimeout(searchTimeout);
    // }
    
    // Only perform search after 300ms of inactivity
    // searchTimeout = window.setTimeout(() => {
        sigmaRulesStore.searchRules(searchQuery.value);
        resetScroll();
        searchTimeout = null;
    // }, 300);
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

    if (lowerLevel === 'critical') return 'bg-red-600 hover:bg-red-600';
    if (lowerLevel === 'high') return 'bg-red-500 hover:bg-red-500';
    if (lowerLevel === 'medium') return 'bg-amber-500 hover:bg-amber-500';
    if (lowerLevel === 'low') return 'bg-blue-500 hover:bg-blue-500';
    if (lowerLevel === 'informational') return 'bg-green-500 hover:bg-green-500';

    return 'bg-gray-500 hover:bg-gray-500';
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
    max-width: 100%;
    overflow-x: hidden; /* Prevent horizontal overflow */
}

/* Main container setup */
.flex.flex-col.h-full.overflow-hidden {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    max-width: 100%;
}

/* Ensure smooth transitions */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}

/* Fix for sticky group headers */
.sticky {
    z-index: 10;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    max-width: 100%;
}

/* Ensure result list stays in bounds */
.flex-grow.overflow-hidden {
    max-width: 100%;
    overflow-x: hidden;
}

/* Fix for absolutely positioned items */
.relative > [style*="position: absolute"] {
    max-width: calc(100% - 16px); /* Match the width style set in the vue component */
}
</style>