<script setup lang="ts">
import {computed, ref} from 'vue';
import {Badge} from '@/components/ui/badge';
import type {SigmaRule} from '@/lib/sigma/SigmaRepoService';
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

// Constants for virtualizer
const ITEM_HEIGHT = 150; // Estimated height of each rule item
const GROUP_HEADER_HEIGHT = 40; // Estimated height of group headers

// Refs
const parentRef = ref<HTMLElement | null>(null);
const activeGroupHeaderRef = ref(-1);

// Flatten the grouped rules into a single array with headers and items
const flattenedItems = computed(() => {
  const items = [];

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

// Create the virtualizer
const rowVirtualizer = useVirtualizer({
  count: computed(() => flattenedItems.value.length).value,
  getScrollElement: () => parentRef.value,
  estimateSize: (index) => isGroupHeader(index) ? GROUP_HEADER_HEIGHT : ITEM_HEIGHT,
  overscan: 10,
  rangeExtractor: (range) => {
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
});

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
    
    // Reset active header when scrolling back to top
    activeGroupHeaderRef.value = groupHeaderIndexes.value[0] || -1;
  }
}
</script>

<template>
  <div ref="parentRef" class="h-full overflow-auto">
    <div
      :style="{
        height: `${totalSize}px`,
        width: '100%',
        position: 'relative',
      }"
    >
      <div
        v-for="virtualRow in virtualRows"
        :key="virtualRow.index"
        :class="[
          'px-4',
          isGroupHeader(virtualRow.index) ? 'sticky bg-background border-b z-10' : ''
        ]"
        :style="{
          position: isActiveGroupHeader(virtualRow.index) ? 'sticky' : 'absolute',
          top: 0,
          left: 0,
          width: 'calc(100% - 16px)',
          height: `${virtualRow.size}px`,
          transform: isActiveGroupHeader(virtualRow.index) ? undefined : `translateY(${virtualRow.start}px)`,
        }"
      >
        <!-- Group Header -->
        <template v-if="isGroupHeader(virtualRow.index)">
          <div class="flex items-center justify-between py-2 mb-2">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {{ flattenedItems[virtualRow.index].label }}
            </h3>
            <Badge variant="outline" class="text-xs">{{ flattenedItems[virtualRow.index].rules.length }} rules</Badge>
          </div>
        </template>
        
        <!-- Rule Item -->
        <template v-else>
          <RuleItem 
            :rule="flattenedItems[virtualRow.index].rule" 
            @select-rule="handleSelectRule"
          />
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
  overflow-x: hidden; /* Prevent horizontal overflow */
}

/* Fix for sticky group headers */
.sticky {
  z-index: 10;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  max-width: 100%;
}

/* Fix for absolutely positioned items */
.relative > [style*="position: absolute"] {
  max-width: calc(100% - 16px); /* Match the width style set in the vue component */
}
</style>