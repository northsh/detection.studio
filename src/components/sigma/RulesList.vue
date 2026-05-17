<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import {Badge} from '@/components/ui/badge';
import type {SigmaRule} from '@/stores/SigmaBrowserStore';
import {defaultRangeExtractor, useVirtualizer} from '@tanstack/vue-virtual';
import RuleItem from './RuleItem.vue';

// Props
const props = defineProps<{
    groupedRules: {
        label: string,
        rules: SigmaRule[],
        expanded: boolean
    }[]
}>();

// Emits
const emit = defineEmits<{
    'select-rule': [rule: SigmaRule]
}>();

// Estimated heights — measureElement will override these with actual measured values
const ITEM_HEIGHT = 160;
const GROUP_HEADER_HEIGHT = 48;

// Refs
const parentRef = ref<HTMLElement | null>(null);
const activeGroupHeaderRef = ref(-1);

// Flatten the grouped rules into a single array with headers and items
const flattenedItems = computed(() => {
    const items: Array<{ isHeader?: true; label?: string; rules?: SigmaRule[]; rule?: SigmaRule; groupIndex: number }> = [];

    for (const group of props.groupedRules) {
        // Add group header
        items.push({
            isHeader: true,
            label: group.label,
            rules: group.rules,
            groupIndex: items.length
        });

        // Add rules for this group
        for (const rule of group.rules) {
            items.push({
                rule,
                groupIndex: items.length
            });
        }
    }

    return items;
});

// Get indices of all group headers
const groupHeaderIndexes = computed(() =>
    flattenedItems.value
        .map((item, index) => item.isHeader ? index : -1)
        .filter(index => index !== -1)
);

// Check if an item is a header
const isGroupHeader = (index: number) => flattenedItems.value[index]?.isHeader === true;

// Check if an item is the active sticky header
const isActiveGroupHeader = (index: number) => activeGroupHeaderRef.value === index;

// Reactive count for the virtualizer
const itemCount = computed(() => flattenedItems.value.length);

// Create the virtualizer with reactive count and dynamic measurement
const rowVirtualizer = useVirtualizer(computed(() => ({
    count: itemCount.value,
    getScrollElement: () => parentRef.value,
    estimateSize: (index: number) => isGroupHeader(index) ? GROUP_HEADER_HEIGHT : ITEM_HEIGHT,
    measureElement: (el: Element) => el.getBoundingClientRect().height,
    overscan: 10,
    rangeExtractor: (range: any) => {
        // Find the last header that's in or before the visible range
        activeGroupHeaderRef.value = [...groupHeaderIndexes.value]
            .reverse()
            .find(index => range.startIndex >= index) ?? -1;

        // Include the active header and all items in the visible range
        const visibleItems = defaultRangeExtractor(range);
        const itemsToRender = new Set([
            ...visibleItems,
            ...(activeGroupHeaderRef.value >= 0 ? [activeGroupHeaderRef.value] : [])
        ]);

        return [...itemsToRender].sort((a, b) => a - b);
    }
})));

// Get virtual rows for rendering
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems());

// Get total size for the container
const totalSize = computed(() => rowVirtualizer.value.getTotalSize());

// Handle rule selection
function handleSelectRule(rule: SigmaRule) {
    emit('select-rule', rule);
}

// Reset scroll position
function resetScroll() {
    if (parentRef.value) {
        parentRef.value.scrollTop = 0;
        activeGroupHeaderRef.value = groupHeaderIndexes.value[0] || -1;
    }
}

// Re-scroll to top when data changes (filters applied)
watch(() => props.groupedRules, () => {
    resetScroll();
});

defineExpose({ resetScroll });
</script>

<template>
  <div ref="parentRef" class="h-full overflow-auto">
    <div
      v-if="flattenedItems.length === 0"
      class="text-center py-4 text-muted-foreground"
    >
      No rules found matching your criteria.
    </div>
    <div
      v-else
      :style="{
        height: `${totalSize}px`,
        width: '100%',
        position: 'relative',
      }"
    >
      <div
        v-for="virtualRow in virtualRows"
        :key="virtualRow.index"
        :ref="(el) => { if (el) rowVirtualizer.measureElement(el as Element) }"
        :data-index="virtualRow.index"
        :class="[
          'px-4',
          isGroupHeader(virtualRow.index) ? 'sticky bg-background border-b z-10' : ''
        ]"
        :style="{
          position: isActiveGroupHeader(virtualRow.index) ? 'sticky' : 'absolute',
          top: 0,
          left: 0,
          width: 'calc(100% - 16px)',
          transform: isActiveGroupHeader(virtualRow.index) ? undefined : `translateY(${virtualRow.start}px)`,
        }"
      >
        <!-- Group Header -->
        <template v-if="isGroupHeader(virtualRow.index)">
          <div class="flex items-center justify-between py-2 mb-2">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {{ flattenedItems[virtualRow.index].label }}
            </h3>
            <Badge class="text-xs" variant="outline"
              >{{ flattenedItems[virtualRow.index].rules?.length }}
              rules
            </Badge>
          </div>
        </template>

        <!-- Rule Item -->
        <template v-else>
          <RuleItem :rule="flattenedItems[virtualRow.index].rule!" @select-rule="handleSelectRule" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fix for virtual scroll overlapping */
.h-full.overflow-auto {
    position: relative;
    max-width: 100%;
    overflow-x: hidden;
}

/* Fix for sticky group headers */
.sticky {
    z-index: 10;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    max-width: 100%;
}

/* Match ScrollBar.vue style */
.h-full.overflow-auto::-webkit-scrollbar {
    width: 10px; /* w-2.5 */
}

.h-full.overflow-auto::-webkit-scrollbar-track {
    background: transparent;
    border-left: 1px solid transparent;
    padding: 1px; /* p-px */
}

.h-full.overflow-auto::-webkit-scrollbar-thumb {
    background-color: hsl(var(--border));
    border-radius: 9999px; /* rounded-full */
    border: 1px solid transparent;
    background-clip: content-box;
}
</style>
