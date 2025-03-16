<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useSigmaRulesStore } from '../stores/SigmaBrowserStore.ts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useRoute, useRouter } from 'vue-router';
import type { SigmaRule } from '../lib/sigma/SigmaRepoService';

// Component imports
import SearchFilters from './sigma/SearchFilters.vue';
import RulesList from './sigma/RulesList.vue';

// Utilities
import { DEFAULT_STATUS_FILTERS } from './sigma/utils';

// Accept initial rule ID from parent component
const props = defineProps<{
    initialRuleId?: string | null
}>();

const router = useRouter();
const route = useRoute();
const sigmaRulesStore = useSigmaRulesStore();

// Local refs for component state
const isLoading = computed(() => sigmaRulesStore.isLoading);
const error = computed(() => sigmaRulesStore.error);
const allRules = computed(() => sigmaRulesStore.rules);
const searchQuery = computed({
    get: () => sigmaRulesStore.searchQuery,
    set: (value) => sigmaRulesStore.searchRules(value)
});

// Get filter state from store
const statusFilters = computed(() => sigmaRulesStore.statusFilters);
const selectedProduct = computed(() => sigmaRulesStore.selectedProduct);
const logsourceSortingStyle = computed(() => sigmaRulesStore.logsourceSortingStyle);

// Get filtered rules directly from store
const filteredRules = computed(() => sigmaRulesStore.filteredRules);

// Group rules by product or category
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

// Load rules when component is mounted
onMounted(async () => {
    try {
        console.log('SigmaRulesBrowser: Mounted, fetching rules...');
        await sigmaRulesStore.fetchRules();
        console.log(`SigmaRulesBrowser: Fetched ${sigmaRulesStore.rules.length} rules`);

        // Use either the prop or route query parameter to select a rule
        const ruleIdToSelect = props.initialRuleId || route.query.ruleId as string;
        console.log('SigmaRulesBrowser: Rule ID to select:', ruleIdToSelect);

        if (ruleIdToSelect) {
            await selectRuleById(ruleIdToSelect);
        }
    } catch (err) {
        console.error('SigmaRulesBrowser: Error during initialization:', err);
        sigmaRulesStore.error = err instanceof Error ? err.message : 'Failed to initialize rules browser';
    }
});

// Search is now handled directly through the computed property

// Retry loading rules if there was an error
async function retryLoadRules() {
    sigmaRulesStore.error = null;

    try {
        console.log('SigmaRulesBrowser: Retrying fetch rules...');
        await sigmaRulesStore.fetchRules(true); // Force reload
        console.log(`SigmaRulesBrowser: Fetched ${sigmaRulesStore.rules.length} rules on retry`);
    } catch (err) {
        console.error('SigmaRulesBrowser: Error during retry:', err);
        sigmaRulesStore.error = err instanceof Error ? err.message : 'Failed to load rules';
    }
}

// Filter handlers
function updateStatusFilters(filters) {
    sigmaRulesStore.updateStatusFilters(filters);
}

function updateSelectedProduct(product) {
    sigmaRulesStore.updateSelectedProduct(product);
}

function updateLogsourceSorting(style) {
    sigmaRulesStore.updateLogsourceSorting(style);
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
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div class="p-6 border-b bg-card shadow-sm">
      <h2 class="text-lg font-bold mb-2">Sigma Rules Browser</h2>
      
      <!-- Search input -->
      <Input
        v-model="searchQuery"
        placeholder="Search rules..."
        class="w-full"
      />
      
      <!-- Filters section -->
      <SearchFilters
        :status-filters="statusFilters"
        :selected-product="selectedProduct"
        :logsource-sorting-style="logsourceSortingStyle"
        :all-rules="allRules"
        @update:status-filters="updateStatusFilters"
        @update:selected-product="updateSelectedProduct"
        @update:logsource-sorting="updateLogsourceSorting"
      />
    </div>
    
    <!-- Error state -->
    <div v-if="error" class="p-4 flex flex-col justify-center items-center flex-grow text-red-500">
      <Alert variant="destructive" class="max-w-md">
        <AlertTitle>Error loading rules</AlertTitle>
        <AlertDescription>{{ error }}</AlertDescription>
      </Alert>
      <Button 
        @click="retryLoadRules" 
        variant="default"
        class="mt-4"
      >
        Retry
      </Button>
    </div>
    
    <!-- Loading state with skeleton -->
    <div v-else-if="isLoading" class="p-4 flex-grow">
      <div class="space-y-4">
        <div v-for="i in 3" :key="`skeleton-group-${i}`" class="space-y-3">
          <div class="flex items-center justify-between">
            <Skeleton class="h-4 w-32" />
            <Skeleton class="h-4 w-12" />
          </div>
          <div v-for="j in 3" :key="`skeleton-item-${i}-${j}`" class="p-3 border rounded-md">
            <Skeleton class="h-5 w-2/3 mb-2" />
            <div class="flex gap-1.5 mb-2">
              <Skeleton class="h-4 w-16" />
              <Skeleton class="h-4 w-16" />
            </div>
            <Skeleton class="h-4 w-full mb-2" />
            <Skeleton class="h-4 w-3/4" />
            <div class="flex gap-1.5 mt-2">
              <Skeleton class="h-4 w-20" />
              <Skeleton class="h-4 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty states -->
    <div v-else-if="allRules.length === 0" class="text-center py-16 flex flex-col items-center justify-center h-full">
      <div class="bg-muted/30 rounded-lg p-6 max-w-md">
        <h3 class="text-lg font-medium mb-2">No Sigma Rules Found</h3>
        <p class="text-muted-foreground mb-4">
          The rules index file may be missing or empty. Please ensure the "sigma-rules-index.json" file exists in the public directory.
        </p>
        <Button 
          @click="retryLoadRules" 
          variant="default"
        >
          Retry Loading Rules
        </Button>
      </div>
    </div>
    <div v-else-if="groupedRules.length === 0" class="text-center py-4 flex flex-col items-center justify-center">
      <p class="text-muted-foreground mb-2">No rules found matching your criteria.</p>
      <div class="text-sm text-muted-foreground/80 max-w-md">
        <div v-if="searchQuery" class="mb-2">
          Try adjusting your search query or filters.
        </div>
        <div v-if="selectedProduct" class="mb-2">
          <span class="font-medium">Product/category filter:</span> {{ selectedProduct }}
          <button 
            @click="updateSelectedProduct('')" 
            class="ml-2 underline text-primary"
          >
            Clear
          </button>
        </div>
        <div v-if="Object.values(statusFilters).some(value => !value)" class="mb-2">
          <span class="font-medium">Status filters:</span> Some statuses are filtered out
          <button 
            @click="updateStatusFilters(DEFAULT_STATUS_FILTERS)" 
            class="ml-2 underline text-primary"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
    
    <!-- Results list -->
    <RulesList 
      v-else
      :grouped-rules="groupedRules"
      @select-rule="selectRule"
    />
  </div>
</template>
