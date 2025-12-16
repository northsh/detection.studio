<script setup lang="ts">
import {computed, ref} from 'vue';
import {Badge} from '@/components/ui/badge';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
import {Toggle} from '@/components/ui/toggle';
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
  <div class="mt-4 space-y-4">
    <!-- Collapsible filters section -->
    <Collapsible>
      <CollapsibleTrigger asChild>
        <div class="flex items-center justify-between cursor-pointer">
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-medium">Filters</h3>
            <Badge variant="outline" class="text-xs">{{ getActiveFiltersCount() }}</Badge>
          </div>
          <ChevronDown
            class="h-4 w-4 text-muted-foreground transition-transform ui-expanded:rotate-180"
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent class="pt-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Status filter -->
          <div class="space-y-2">
            <h3 class="text-xs font-medium text-muted-foreground">Status</h3>
            <div class="flex flex-wrap gap-1.5">
              <Badge
                v-for="status in STATUS_OPTIONS"
                :key="status"
                variant="outline"
                :class="[
                  statusFilters[status] ? 'bg-primary/10 text-primary border-primary/20' : 
                  'bg-muted/50 text-muted-foreground hover:bg-muted',
                  'cursor-pointer transition-colors'
                ]"
                @click="toggleStatusFilter(status)"
              >
                {{ status }}
              </Badge>
            </div>
          </div>

          <!-- Logsource filter with combobox for search -->
          <div class="space-y-2">
            <h3 class="text-xs font-medium text-muted-foreground">Filter by Logsource</h3>
            <Combobox :model-value="selectedProduct" @update:model-value="updateSelectedProduct">
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
                <ComboboxEmpty> No matches found </ComboboxEmpty>

                <ComboboxGroup>
                  <ComboboxItem
                    v-for="option in filteredProductOptions"
                    :key="option"
                    :value="option"
                    class="flex items-center justify-between"
                  >
                    <div class="flex items-center gap-2">
                      <span>{{ option }}</span>
                      <Badge v-if="getOptionType(option)" variant="outline" class="text-[10px]">
                        {{ getOptionType(option) }}
                      </Badge>
                    </div>

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
            <h3 class="text-xs font-medium text-muted-foreground">Group By</h3>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-xs text-muted-foreground">Product</span>
            <Toggle
              :pressed="logsourceSortingStyle === 'category-product-service'"
              @update:pressed="toggleLogSourceSorting"
              size="sm"
            />
            <span class="text-xs text-muted-foreground">Category</span>
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
