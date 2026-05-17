<script setup lang="ts">
import {Badge} from '@/components/ui/badge';
import type {SigmaRule} from '@/stores/SigmaBrowserStore';
import {useSigmaRulesStore} from '@/stores/SigmaBrowserStore';
import {getLevelBadgeClass} from './utils';
import {ref} from 'vue';

const props = defineProps<{
  rule: SigmaRule
}>();

const emit = defineEmits<{
  'select-rule': [rule: SigmaRule]
}>();

const sigmaRulesStore = useSigmaRulesStore();
const isHovered = ref(false);

// Check if a rule is currently selected
function isSelected(rule: SigmaRule) {
  return sigmaRulesStore.currentRule?.id === rule.id ||
    sigmaRulesStore.currentRule?.path === rule.path;
}

// Select rule handler
function selectRule() {
  emit('select-rule', props.rule);
}
</script>

<template>
  <div
    class="p-3 border rounded-md cursor-pointer transition-all my-2"
    :class="{
      'border-primary/50 bg-primary/5': isSelected(rule),
      'bg-muted -translate-y-[1px] shadow-xs': isHovered && !isSelected(rule),
    }"
    @click="selectRule"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <h3 class="font-medium truncate">{{ rule.title }}</h3>
    <div class="flex gap-1.5 mt-1">
      <Badge
        v-if="rule.level"
        :class="getLevelBadgeClass(rule.level)"
        class="uppercase font-semibold text-[10px] tracking-wider"
      >
        {{ rule.level }}
      </Badge>
      <Badge
        v-if="rule.status"
        variant="outline"
        class="uppercase font-semibold text-[10px] tracking-wider"
      >
        {{ rule.status }}
      </Badge>
    </div>
    <p class="text-sm text-muted-foreground line-clamp-2 mt-1">{{ rule.description }}</p>
    <div class="flex flex-wrap gap-1.5 mt-2">
      <Badge v-if="rule.logsource?.product" variant="secondary" class="px-2 py-0 text-xs">
        {{ rule.logsource.product }}
      </Badge>
      <Badge v-if="rule.logsource?.category" variant="secondary" class="px-2 py-0 text-xs">
        {{ rule.logsource.category }}
      </Badge>
      <Badge v-if="rule.logsource?.service" variant="secondary" class="px-2 py-0 text-xs">
        {{ rule.logsource.service }}
      </Badge>
    </div>
  </div>
</template>

<style scoped>
/* Ensure smooth transitions */
div {
  transition-property: background-color, transform, box-shadow, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
