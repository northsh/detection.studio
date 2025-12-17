<script setup lang="ts">
import {computed, ref} from 'vue';
import {Badge} from '@/components/ui/badge';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
import {Toggle} from '@/components/ui/toggle';
import {Separator} from '@/components/ui/separator';
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
import {Check, ChevronDown, Search} from 'lucide-vue-next';
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

// Get active filters count for badge
function getActiveFiltersCount(): string {
  let count = enabledStatusFilters.value.length;
  // Only count selectedProduct if it's not empty
  if (props.selectedProduct && props.selectedProduct.trim() !== '') count++;
  return count.toString();
}

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
  // If the same value is selected again, clear the selection
  if (props.selectedProduct === value) {
    emit('update:selectedProduct', '');
  } else {
    emit('update:selectedProduct', value);
  }
}

// Toggle between product and category grouping
function toggleLogSourceSorting(pressed: boolean) {
  emit('update:logsourceSorting', pressed
    ? 'category-product-service'
    : 'product-category-service');
}
</script>

<template>
  <div class="mt-4">
    <!-- Collapsible filters section -->
    <Collapsible>
      <CollapsibleTrigger asChild>
        <button
          class="flex w-full items-center justify-between rounded-lg border bg-card px-4 py-3 text-left hover:bg-accent/50 transition-colors"
        >
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-semibold">Filters</h3>
            <Badge
              v-if="getActiveFiltersCount() !== '0'"
              variant="secondary"
              class="h-5 min-w-5 px-1.5 text-xs font-medium"
            >
              {{ getActiveFiltersCount() }}
            </Badge>
          </div>
          <ChevronDown
            class="h-4 w-4 text-muted-foreground transition-transform duration-200 ui-expanded:rotate-180"
          />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent class="pt-3">
        <div class="space-y-4 rounded-lg border bg-card p-4">
          <!-- Status filter -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </h4>
              <span class="text-xs text-muted-foreground">
                {{ enabledStatusFilters.length }} selected
              </span>
            </div>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="status in STATUS_OPTIONS"
                :key="status"
                variant="outline"
                :class="[
                  statusFilters[status]
                    ? 'bg-primary/10 text-primary border-primary hover:bg-primary/20'
                    : 'bg-background hover:bg-accent',
                  'cursor-pointer transition-all select-none px-3 py-1.5'
                ]"
                @click="toggleStatusFilter(status)"
              >
                {{ status }}
              </Badge>
            </div>
          </div>

          <Separator />

          <!-- Logsource filter with combobox for search -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Logsource
              </h4>
              <button
                v-if="selectedProduct"
                @click="updateSelectedProduct('')"
                class="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            </div>
            <Combobox :model-value="selectedProduct" @update:model-value="updateSelectedProduct">
              <ComboboxAnchor>
                <div class="relative w-full">
                  <ComboboxInput
                    class="pl-9 h-9 w-full"
                    placeholder="Search product, category, or service..."
                    @input="onProductSearch"
                    :display-value="(val) => val"
                  />
                  <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                    <Search class="size-4 text-muted-foreground" />
                  </span>
                </div>
              </ComboboxAnchor>

              <ComboboxList class="w-full max-h-60">
                <ComboboxEmpty class="py-6 text-center text-sm text-muted-foreground">
                  No matches found
                </ComboboxEmpty>

                <ComboboxGroup>
                  <ComboboxItem
                    v-for="option in filteredProductOptions"
                    :key="option"
                    :value="option"
                    class="flex items-center justify-between px-3 py-2"
                  >
                    <div class="flex items-center gap-2">
                      <span class="text-sm">{{ option }}</span>
                      <Badge
                        v-if="getOptionType(option)"
                        variant="secondary"
                        class="text-[10px] px-1.5 py-0"
                      >
                        {{ getOptionType(option) }}
                      </Badge>
                    </div>

                    <ComboboxItemIndicator>
                      <Check :class="cn('h-4 w-4')" />
                    </ComboboxItemIndicator>
                  </ComboboxItem>
                </ComboboxGroup>
              </ComboboxList>
            </Combobox>
          </div>

          <Separator />

          <!-- Logsource sorting toggle -->
          <div class="space-y-3">
            <h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Group By
            </h4>
            <div class="flex items-center gap-3">
              <span
                class="text-sm"
                :class="logsourceSortingStyle === 'product-category-service' ? 'font-medium text-foreground' : 'text-muted-foreground'"
              >
                Product
              </span>
              <Toggle
                :pressed="logsourceSortingStyle === 'category-product-service'"
                @update:pressed="toggleLogSourceSorting"
                size="sm"
                class="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              />
              <span
                class="text-sm"
                :class="logsourceSortingStyle === 'category-product-service' ? 'font-medium text-foreground' : 'text-muted-foreground'"
              >
                Category
              </span>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<style scoped>
/* Add hover effect for badges */
.badge:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

/* Ensure smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
