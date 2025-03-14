<template>
  <div class="px-8 py-10">
    <div class="mx-auto">
      <h1 class="text-3xl font-bold mb-6">Sigma Rules Browser</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        <SigmaRulesBrowser class="h-full border rounded-lg overflow-hidden" />
        <div class="md:col-span-2 h-full border rounded-lg overflow-hidden">
          <SigmaRuleViewer class="h-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SigmaRulesBrowser from '@/components/SigmaRulesBrowser.vue';
import SigmaRuleViewer from '@/components/SigmaRuleViewer.vue';
</script>