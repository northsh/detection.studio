<template>
  <div class="">
    <div class="mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-screen md:pr-6">
        <SigmaRulesBrowser 
          class="h-full overflow-hidden shadow-sm border-r"
          :initialRuleId="ruleId"
        />
        <div class="md:col-span-2 border md:rounded-lg overflow-hidden shadow-sm h-[calc(100vh-100px)] mt-6">
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