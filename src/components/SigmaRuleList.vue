<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div class="p-4 border-b bg-card shadow-xs">
      <!-- Search input with debounced input -->
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

      <!-- Filter controls (extracted component) -->
      <div class="mt-3 border-t pt-3 px-1">
        <SearchFilters
          :statusFilters="statusFilters"
          :selectedProduct="selectedProduct"
          :logsourceSortingStyle="logsourceSortingStyle"
          :allRules="allRules"
          @update:statusFilters="onStatusFiltersUpdate"
          @update:selectedProduct="onSelectedProductUpdate"
          @update:logsourceSorting="onLogsourceSortingUpdate"
        />
      </div>
    </div>

    <!-- Error state -->
    <div v-if="error" class="p-4 flex flex-col justify-center items-center grow text-red-500">
      <Alert class="max-w-md" variant="destructive">
        <AlertTitle>Error loading rules</AlertTitle>
        <AlertDescription>{{ error }}</AlertDescription>
      </Alert>
      <Button class="mt-4" variant="default" @click="retryLoadRules"> Retry </Button>
    </div>

    <!-- Loading state with skeleton -->
    <div v-else-if="isLoading" class="p-4 grow">
      <div class="space-y-4">
        <div v-for="i in 3" :key="`skeleton-group-${i}`" class="space-y-3">
          <div class="flex items-center justify-between">
            <Skeleton class="h-4 w-32" />
            <Skeleton class="h-4 w-12" />
          </div>
          <div
            v-for="j in 3"
            :key="`skeleton-item-${i}-${j}`"
            class="p-3 border border-border rounded-md"
          >
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

    <!-- No rules found -->
    <div
      v-else-if="allRules.length === 0"
      class="text-center py-16 flex flex-col items-center justify-center grow"
    >
      <div class="bg-muted/30 rounded-lg p-6 max-w-md">
        <h3 class="text-lg font-medium mb-2">No Sigma Rules Found</h3>
        <p class="text-muted-foreground mb-4">
          The rules index file may be missing or empty. Please ensure the "sigma-rules-index.json"
          file exists in the public directory.
        </p>
        <Button variant="default" @click="retryLoadRules"> Retry Loading Rules </Button>
      </div>
    </div>

    <!-- Virtualized results list -->
    <RulesList
      v-else
      ref="rulesListRef"
      :groupedRules="groupedRules"
      class="grow"
      @select-rule="selectRule"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, reactive, ref} from 'vue';
import {useSigmaRulesStore} from '../stores/SigmaBrowserStore';
import type {SigmaRule} from '../stores/SigmaBrowserStore';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Skeleton} from '@/components/ui/skeleton';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {useRoute, useRouter} from 'vue-router';
import {Search, XCircle} from 'lucide-vue-next';
import SearchFilters from '@/components/sigma/SearchFilters.vue';
import RulesList from '@/components/sigma/RulesList.vue';

// Accept initial rule ID from parent component
const props = defineProps<{
    initialRuleId?: string | null
}>();

const router = useRouter();
const route = useRoute();
const sigmaRulesStore = useSigmaRulesStore();

// Ref for the virtualised list component
const rulesListRef = ref<InstanceType<typeof RulesList> | null>(null);

// Local refs for component state
const searchQuery = ref('');
const isLoading = computed(() => sigmaRulesStore.isLoading);
const error = computed(() => sigmaRulesStore.error);
const allRules = computed(() => sigmaRulesStore.rules);

// Filter state
const statusFilters = reactive<Record<string, boolean>>({
    stable: true,
    test: true,
    experimental: true,
    deprecated: false,
    unsupported: false
});
const selectedProduct = ref('');
const logsourceSortingStyle = ref('product-category-service');

// --------------- Filtering ---------------

const filteredRules = computed(() => {
    // Start from the store's filtered rules (search-aware, reactive computed)
    let rules = sigmaRulesStore.filteredRules;

    // Apply status filters
    rules = rules.filter(rule => {
        if (!rule.status) return Object.values(statusFilters).some(v => v);
        return statusFilters[rule.status.toLowerCase()] === true;
    });

    // Apply product/logsource filter
    if (selectedProduct.value) {
        const selected = selectedProduct.value.toLowerCase();
        rules = rules.filter(rule => {
            const ls = rule.logsource || {};
            return (
                ls.product?.toLowerCase() === selected ||
                ls.category?.toLowerCase() === selected ||
                ls.service?.toLowerCase() === selected
            );
        });
    }

    return rules;
});

// --------------- Grouping ---------------

const groupedRules = computed(() => {
    const rules = filteredRules.value;
    const groups: Record<string, SigmaRule[]> = {};

    for (const rule of rules) {
        const groupKey =
            logsourceSortingStyle.value === 'product-category-service'
                ? (rule.logsource?.product || 'Other')
                : (rule.logsource?.category || 'Other');

        if (!groups[groupKey]) groups[groupKey] = [];
        groups[groupKey].push(rule);
    }

    return Object.entries(groups)
        .map(([label, groupRules]) => ({
            label,
            rules: groupRules,
            expanded: true
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
});

// --------------- Event handlers ---------------

function onStatusFiltersUpdate(filters: Record<string, boolean>) {
    Object.assign(statusFilters, filters);
}

function onSelectedProductUpdate(product: string) {
    selectedProduct.value = product;
}

function onLogsourceSortingUpdate(style: string) {
    logsourceSortingStyle.value = style;
}

// Debounced search
let searchTimeout: number | null = null;

function onSearch() {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = window.setTimeout(() => {
        sigmaRulesStore.searchRules(searchQuery.value);
        searchTimeout = null;
    }, 300);
}

function clearSearch() {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
        searchTimeout = null;
    }
    searchQuery.value = '';
    sigmaRulesStore.searchRules('');
    rulesListRef.value?.resetScroll();
}

// Select a rule to view details
function selectRule(rule: SigmaRule) {
    sigmaRulesStore.setCurrentRule(rule);
    router.replace({
        query: {
            ...route.query,
            ruleId: rule.id || rule.path
        }
    });
}

// Select a rule by ID from URL
async function selectRuleById(ruleId: string) {
    const rule = allRules.value.find(r => r.id === ruleId || r.path === ruleId);
    if (rule) {
        await sigmaRulesStore.setCurrentRule(rule);
    }
}

// Retry loading rules if there was an error
async function retryLoadRules() {
    try {
        await sigmaRulesStore.fetchRules(true);
    } catch {
        // error is already set in the store
    }
}

// --------------- Lifecycle ---------------

onMounted(async () => {
    try {
        await sigmaRulesStore.fetchRules();

        const ruleIdToSelect = props.initialRuleId || (route.query.ruleId as string);
        if (ruleIdToSelect) {
            await selectRuleById(ruleIdToSelect);
        }
    } catch (err) {
        console.error('SigmaRulesBrowser: Error during initialization:', err);
    }
});
</script>
