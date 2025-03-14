<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div class="p-4 border-b">
      <h2 class="text-xl font-bold mb-2">Sigma Rules Browser</h2>
      <Input
        v-model="searchQuery"
        placeholder="Search rules..."
        class="w-full"
        @input="onSearch"
      />
    </div>
    
    <div v-if="error" class="p-4 text-red-500">
      {{ error }}
    </div>
    
    <div v-if="isLoading" class="p-4 flex justify-center items-center flex-grow">
      <div class="flex flex-col items-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p class="mt-2">Loading rules...</p>
      </div>
    </div>
    
    <div v-else class="flex-grow overflow-hidden">
      <div v-if="filteredRules.length === 0" class="text-center py-4 text-gray-500">
        No rules found.
      </div>
      <div v-else ref="containerRef" class="h-full overflow-auto p-4">
        <div :style="{ height: `${totalHeight}px`, position: 'relative' }">
          <div 
            v-for="item in visibleItems" 
            :key="item.rule.id || item.rule.path"
            class="p-3 border rounded-md hover:bg-muted cursor-pointer absolute w-[calc(100%-2rem)]"
            :style="{ transform: `translateY(${item.offsetTop}px)` }"
            @click="selectRule(item.rule)"
          >
            <h3 class="font-medium">{{ item.rule.title }}</h3>
            <p class="text-sm text-gray-500 line-clamp-2">{{ item.rule.description }}</p>
            <div class="flex flex-wrap gap-1 mt-1">
              <Badge v-if="item.rule.level" :variant="getBadgeVariant(item.rule.level)">
                {{ item.rule.level }}
              </Badge>
              <Badge v-if="item.rule.status" variant="outline">
                {{ item.rule.status }}
              </Badge>
              <Badge v-if="item.rule.logsource?.category" variant="secondary">
                {{ item.rule.logsource.category }}
              </Badge>
              <Badge v-if="item.rule.logsource?.product" variant="secondary">
                {{ item.rule.logsource.product }}
              </Badge>
              <Badge v-if="item.rule.logsource?.service" variant="secondary">
                {{ item.rule.logsource.service }}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, watchEffect, onUnmounted } from 'vue';
import { useSigmaRulesStore } from '../stores/SigmaRulesStore';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import type { SigmaRule } from '../lib/sigma/SigmaRepoService';

const sigmaRulesStore = useSigmaRulesStore();

// Local refs for component state
const searchQuery = ref('');
const isLoading = computed(() => sigmaRulesStore.isLoading);
const isLoadingIndividualRule = computed(() => sigmaRulesStore.isLoadingIndividualRule);
const error = computed(() => sigmaRulesStore.error);
const filteredRules = computed(() => sigmaRulesStore.filteredRules);

// Virtual scroll implementation
const ITEM_HEIGHT = 120; // Estimated height of each item
const BUFFER_SIZE = 5; // Number of items to render outside viewport

const containerRef = ref<HTMLElement | null>(null);
const scrollTop = ref(0);
const viewportHeight = ref(0);

interface VirtualItem {
  rule: SigmaRule;
  index: number;
  offsetTop: number;
}

// Calculate total height of all items
const totalHeight = computed(() => {
  return filteredRules.value.length * ITEM_HEIGHT;
});

// Calculate which items are visible in the current viewport
const visibleItems = computed<VirtualItem[]>(() => {
  if (!containerRef.value) return [];
  
  const startIndex = Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - BUFFER_SIZE);
  const endIndex = Math.min(
    filteredRules.value.length - 1,
    Math.ceil((scrollTop.value + viewportHeight.value) / ITEM_HEIGHT) + BUFFER_SIZE
  );
  
  const items: VirtualItem[] = [];
  
  for (let i = startIndex; i <= endIndex; i++) {
    items.push({
      rule: filteredRules.value[i],
      index: i,
      offsetTop: i * ITEM_HEIGHT
    });
  }
  
  return items;
});

// Update scroll position on scroll
function updateScroll() {
  if (!containerRef.value) return;
  
  scrollTop.value = containerRef.value.scrollTop;
  viewportHeight.value = containerRef.value.clientHeight;
}

// Load rules when component is mounted
onMounted(async () => {
  await sigmaRulesStore.fetchRules();
  
  if (containerRef.value) {
    viewportHeight.value = containerRef.value.clientHeight;
    containerRef.value.addEventListener('scroll', updateScroll);
  }
});

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', updateScroll);
  }
});

// Handle search input
function onSearch() {
  sigmaRulesStore.searchRules(searchQuery.value);
  
  // Reset scroll position when search changes
  if (containerRef.value) {
    containerRef.value.scrollTop = 0;
    scrollTop.value = 0;
  }
}

// Select a rule to view details
function selectRule(rule: SigmaRule) {
  sigmaRulesStore.setCurrentRule(rule);
}

// Get badge variant based on rule level
function getBadgeVariant(level: string) {
  const lowerLevel = level.toLowerCase();
  
  if (lowerLevel === 'critical') return 'destructive';
  if (lowerLevel === 'high') return 'destructive';
  if (lowerLevel === 'medium') return 'warning';
  if (lowerLevel === 'low') return 'secondary';
  if (lowerLevel === 'informational') return 'default';
  
  return 'outline';
}
</script>