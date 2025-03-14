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
    
    <ScrollArea v-else class="flex-grow">
      <div class="p-4">
        <div v-if="filteredRules.length === 0" class="text-center py-4 text-gray-500">
          No rules found.
        </div>
        
        <div v-else>
          <div
            v-for="rule in filteredRules"
            :key="rule.id || rule.path"
            class="mb-3 p-3 border rounded-md hover:bg-muted cursor-pointer"
            @click="selectRule(rule)"
          >
            <h3 class="font-medium">{{ rule.title }}</h3>
            <p class="text-sm text-gray-500 line-clamp-2">{{ rule.description }}</p>
            <div class="flex flex-wrap gap-1 mt-1">
              <Badge v-if="rule.level" :variant="getBadgeVariant(rule.level)">
                {{ rule.level }}
              </Badge>
              <Badge v-if="rule.status" variant="outline">
                {{ rule.status }}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useSigmaRulesStore } from '../stores/SigmaRulesStore';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import type { SigmaRule } from '../lib/sigma/SigmaRepoService';

const sigmaRulesStore = useSigmaRulesStore();

// Local refs for component state
const searchQuery = ref('');
const isLoading = computed(() => sigmaRulesStore.isLoading);
const error = computed(() => sigmaRulesStore.error);
const filteredRules = computed(() => sigmaRulesStore.filteredRules);

// Load rules when component is mounted
onMounted(async () => {
  await sigmaRulesStore.fetchRules();
});

// Handle search input
function onSearch() {
  sigmaRulesStore.searchRules(searchQuery.value);
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