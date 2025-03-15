<template>
  <div class="px-6 py-6">
    <div class="mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
        <SigmaRulesBrowser 
          class="h-full border rounded-lg overflow-hidden shadow-sm" 
          :initialRuleId="ruleId"
        />
        <div class="md:col-span-2 h-full border rounded-lg overflow-hidden shadow-sm">
          <SigmaRuleViewer class="h-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SigmaRulesBrowser from '@/components/SigmaRulesBrowser.vue';
import SigmaRuleViewer from '@/components/SigmaRuleViewer.vue';

// Accept route props
defineProps<{
  ruleId?: string | null
}>();
</script>