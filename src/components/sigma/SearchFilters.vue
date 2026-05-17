<script setup lang="ts">
import {computed, ref} from 'vue';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
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
import {Check, ChevronDown, Filter, Search, X} from 'lucide-vue-next';
import {cn} from '@/lib/utils';
import type {SigmaRule} from '@/stores/SigmaBrowserStore';
import {extractLogsourceOptions, generateLogsourceMapping, STATUS_OPTIONS} from './utils';

// Component props
const props = defineProps<{
  statusFilters: Record<string, boolean>,
  selectedProduct: string,
  logsourceSortingStyle: string,
  allRules: SigmaRule[]
}>();

// Component emits
const emit = defineEmits<{
  'update:statusFilters': [filters: Record<string, boolean>],
  'update:selectedProduct': [product: string],
  'update:logsourceSorting': [style: string]
}>();

// Local state
const productSearchQuery = ref('');
const isOpen = ref(false);

// Track product-category-service mappings for better UX
const logsourceMapping = computed(() => generateLogsourceMapping(props.allRules));

// Helper to determine option type
function getOptionType(option: string): string | null {
  return logsourceMapping.value[option]?.type || null;
}

// Computed status filters that are enabled
const enabledStatusFilters = computed(() => {
  return Object.entries(props.statusFilters)
    .filter(([_, enabled]) => enabled)
    .map(([status]) => status);
});

// Get active filters count
const activeFiltersCount = computed(() => {
  let count = enabledStatusFilters.value.length;
  if (props.selectedProduct && props.selectedProduct.trim() !== '') count++;
  return count;
});

// Toggle status filter
function toggleStatusFilter(status: string) {
  const newFilters = { ...props.statusFilters };
  newFilters[status] = !newFilters[status];
  emit('update:statusFilters', newFilters);
}

// Get unique logsource options (products, categories, services) from rules
const productOptions = computed(() => extractLogsourceOptions(props.allRules));

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

// Update product selection and clear if same value selected
function updateSelectedProduct(value: string) {
  if (props.selectedProduct === value) {
    emit('update:selectedProduct', '');
  } else {
    emit('update:selectedProduct', value);
  }
}

// Clear product filter
function clearProductFilter() {
  emit('update:selectedProduct', '');
  productSearchQuery.value = '';
}

// Semantic color map per status — meaningful, not just "active vs inactive"
const STATUS_STYLES: Record<string, { active: string; inactive: string; dot: string }> = {
  stable:       { active: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20', inactive: 'text-muted-foreground border-border hover:border-emerald-500/30 hover:text-emerald-700 dark:hover:text-emerald-400', dot: 'bg-emerald-500' },
  test:         { active: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',         inactive: 'text-muted-foreground border-border hover:border-amber-500/30 hover:text-amber-700 dark:hover:text-amber-400',         dot: 'bg-amber-500' },
  experimental: { active: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',             inactive: 'text-muted-foreground border-border hover:border-blue-500/30 hover:text-blue-700 dark:hover:text-blue-400',             dot: 'bg-blue-500' },
  deprecated:   { active: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20',             inactive: 'text-muted-foreground border-border hover:border-zinc-500/30 hover:text-zinc-600 dark:hover:text-zinc-400',             dot: 'bg-zinc-400' },
  unsupported:  { active: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',                 inactive: 'text-muted-foreground border-border hover:border-red-500/30 hover:text-red-700 dark:hover:text-red-400',                 dot: 'bg-red-500' },
};
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <!-- Trigger row -->
    <CollapsibleTrigger
      class="w-full flex items-center justify-between gap-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <div class="flex items-center gap-2">
        <Filter class="h-3.5 w-3.5 shrink-0" />
        <span class="font-medium text-xs tracking-wide uppercase">Filters</span>
        <!-- Active count pill — only visible when filters are active -->
        <span
          v-if="activeFiltersCount > 0"
          class="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[10px] font-semibold bg-primary text-primary-foreground leading-none"
        >
          {{ activeFiltersCount }}
        </span>
      </div>
      <ChevronDown
        :class="cn(
          'h-3.5 w-3.5 shrink-0 transition-transform duration-200',
          isOpen ? 'rotate-180' : ''
        )"
      />
    </CollapsibleTrigger>

    <CollapsibleContent>
      <div class="pt-3 space-y-4">

        <!-- Status filter -->
        <div class="space-y-1.5">
          <p class="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/70">Status</p>
          <div class="flex flex-wrap gap-1.5 px-px py-px">
            <button
              v-for="status in STATUS_OPTIONS"
              :key="status"
              :class="cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-all duration-150 cursor-pointer select-none',
                statusFilters[status]
                  ? STATUS_STYLES[status]?.active ?? 'bg-primary/10 text-primary border-primary/20'
                  : STATUS_STYLES[status]?.inactive ?? 'text-muted-foreground border-border hover:bg-muted'
              )"
              @click="toggleStatusFilter(status)"
            >
              <span
                :class="cn(
                  'inline-block w-1.5 h-1.5 rounded-full shrink-0 transition-opacity duration-150',
                  STATUS_STYLES[status]?.dot ?? 'bg-primary',
                  statusFilters[status] ? 'opacity-100' : 'opacity-30'
                )"
              />
              {{ status }}
            </button>
          </div>
        </div>

        <!-- Logsource filter -->
        <div class="space-y-1.5 px-px">
          <p class="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/70">Logsource</p>
          <Combobox :model-value="selectedProduct" @update:model-value="updateSelectedProduct">
            <ComboboxAnchor class="w-full">
              <div class="relative w-full flex items-center">
                <Search class="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none shrink-0" />
                <ComboboxInput
                  class="pl-8 pr-8 w-full h-8 text-xs"
                  placeholder="Filter by product / category..."
                  @input="onProductSearch"
                  :display-value="(val) => val"
                />
                <!-- Clear button — shown only when a product is selected -->
                <button
                  v-if="selectedProduct"
                  class="absolute right-2 h-4 w-4 flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
                  @click.prevent="clearProductFilter"
                  type="button"
                >
                  <X class="h-3 w-3" />
                </button>
              </div>
            </ComboboxAnchor>

            <ComboboxList align="start" class="w-[var(--reka-popper-anchor-width)] text-xs max-h-48 overflow-y-auto">
              <ComboboxEmpty class="py-3 text-center text-xs text-muted-foreground">No matches found</ComboboxEmpty>
              <ComboboxGroup>
                <ComboboxItem
                  v-for="option in filteredProductOptions"
                  :key="option"
                  :value="option"
                  class="flex items-center justify-between py-1.5 px-2 text-xs"
                >
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="truncate">{{ option }}</span>
                    <span
                      v-if="getOptionType(option)"
                      class="shrink-0 inline-flex items-center px-1.5 py-0 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border"
                    >
                      {{ getOptionType(option) }}
                    </span>
                  </div>
                  <ComboboxItemIndicator>
                    <Check class="h-3.5 w-3.5 text-primary shrink-0" />
                  </ComboboxItemIndicator>
                </ComboboxItem>
              </ComboboxGroup>
            </ComboboxList>
          </Combobox>
        </div>

        <!-- Group By — segmented control -->
        <div class="space-y-1.5">
          <p class="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/70">Group By</p>
          <div class="inline-flex items-center rounded-md border border-border bg-muted p-0.5 gap-0.5">
            <button
              :class="cn(
                'px-3 py-1 rounded text-xs font-medium transition-all duration-150',
                logsourceSortingStyle === 'product-category-service'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )"
              @click="$emit('update:logsourceSorting', 'product-category-service')"
              type="button"
            >
              Product
            </button>
            <button
              :class="cn(
                'px-3 py-1 rounded text-xs font-medium transition-all duration-150',
                logsourceSortingStyle === 'category-product-service'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )"
              @click="$emit('update:logsourceSorting', 'category-product-service')"
              type="button"
            >
              Category
            </button>
          </div>
        </div>

      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
