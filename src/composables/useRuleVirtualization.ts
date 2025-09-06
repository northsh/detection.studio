import { computed, ref, type Ref } from 'vue'
import { useVirtualizer, defaultRangeExtractor } from '@tanstack/vue-virtual'
import type { VirtualRow } from './useRuleGrouping'

export function useRuleVirtualization(
  rows: Ref<VirtualRow[]>,
  stickyIndexes: Ref<number[]>,
  isSticky: (index: number) => boolean
) {
  const parentRef = ref<HTMLElement | null>(null)
  const activeStickyIndexRef = ref(0)

  const rowVirtualizer = useVirtualizer({
    count: computed(() => rows.value.length).value,
    estimateSize: (index) => {
      // Group headers are smaller than rule items
      return isSticky(index) ? 50 : 180
    },
    getScrollElement: () => parentRef.value,
    rangeExtractor: (range) => {
      // Find the active sticky header
      activeStickyIndexRef.value = [...stickyIndexes.value]
        .reverse()
        .find((index) => range.startIndex >= index) ?? 0

      // Include active sticky header in rendered items
      const next = new Set([
        activeStickyIndexRef.value,
        ...defaultRangeExtractor(range),
      ])

      return [...next].sort((a, b) => a - b)
    },
  })

  const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
  const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

  function isActiveSticky(index: number): boolean {
    return activeStickyIndexRef.value === index
  }

  function resetScroll() {
    if (parentRef.value) {
      parentRef.value.scrollTop = 0
    }
  }

  return {
    parentRef,
    virtualRows,
    totalSize,
    isActiveSticky,
    resetScroll
  }
}