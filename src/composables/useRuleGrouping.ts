import { computed, type Ref } from 'vue'
import type { SigmaRule } from '../stores/SigmaBrowserStore'

export interface GroupedRow {
  isHeader: true
  label: string
  count: number
}

export type VirtualRow = SigmaRule | GroupedRow

export function useRuleGrouping(rules: Ref<SigmaRule[]>) {
  // Group rules by product and create flat array for virtualization
  const groupedRows = computed<VirtualRow[]>(() => {
    // if (rules.value.length === 0) return []

    // Group rules by product
    const groups: Record<string, SigmaRule[]> = {}
    
    rules.value.forEach(rule => {
      const groupKey = rule.logsource?.product || 'Other'
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(rule)
    })

    // Create flattened array with headers and rules
    const result: VirtualRow[] = []
    
    Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([label, groupRules]) => {
        // Add group header
        result.push({
          isHeader: true,
          label,
          count: groupRules.length
        })
        // Add all rules in the group
        result.push(...groupRules)
      })

    return result
  })

  // Get indexes of sticky headers
  const stickyIndexes = computed(() => {
    const indexes: number[] = []
    groupedRows.value.forEach((row, index) => {
      if ('isHeader' in row && row.isHeader) {
        indexes.push(index)
      }
    })
    return indexes
  })

  function isSticky(index: number): boolean {
    return stickyIndexes.value.includes(index)
  }

  function isGroupHeader(row: VirtualRow): row is GroupedRow {
    return 'isHeader' in row && row.isHeader
  }

  return {
    groupedRows,
    stickyIndexes,
    isSticky,
    isGroupHeader
  }
}