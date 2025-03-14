<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div v-if="!currentRule" class="flex items-center justify-center h-full text-gray-500">
      <p>Select a rule to view its details</p>
    </div>
    
    <div v-else-if="isLoadingIndividualRule" class="flex items-center justify-center h-full">
      <div class="flex flex-col items-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p class="mt-2">Loading rule content...</p>
      </div>
    </div>
    
    <template v-else>
      <div class="border-b p-4">
        <h2 class="text-2xl font-bold">{{ currentRule.title }}</h2>
        <div class="flex flex-wrap gap-2 my-2">
          <Badge v-if="currentRule.level" :variant="getBadgeVariant(currentRule.level)">
            {{ currentRule.level }}
          </Badge>
          <Badge v-if="currentRule.status" variant="outline">
            {{ currentRule.status }}
          </Badge>
        </div>
        <p class="text-gray-600 mt-2">{{ currentRule.description }}</p>
        
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p class="text-sm font-medium">Author</p>
            <p class="text-sm">{{ currentRule.author || 'Unknown' }}</p>
          </div>
          <div>
            <p class="text-sm font-medium">ID</p>
            <p class="text-sm">{{ currentRule.id || 'Not specified' }}</p>
          </div>
          <div>
            <p class="text-sm font-medium">Date</p>
            <p class="text-sm">{{ formatDate(currentRule.date) }}</p>
          </div>
          <div>
            <p class="text-sm font-medium">Last Modified</p>
            <p class="text-sm">{{ formatDate(currentRule.modified) }}</p>
          </div>
        </div>
        
        <div class="mt-4">
          <p class="text-sm font-medium">Tags</p>
          <div class="flex flex-wrap gap-1 mt-1">
            <Badge 
              v-for="tag in currentRule.tags" 
              :key="tag" 
              variant="secondary" 
              class="text-xs"
            >
              {{ tag }}
            </Badge>
            <span v-if="!currentRule.tags || currentRule.tags.length === 0" class="text-sm text-gray-500">
              No tags
            </span>
          </div>
        </div>
      </div>
      
      <div class="flex-grow overflow-hidden">
        <ScrollArea class="h-full">
          <div class="p-4">
            <h3 class="text-lg font-medium mb-2">Rule Definition</h3>
            <div class="bg-muted p-4 rounded-md">
              <pre class="text-sm whitespace-pre-wrap">{{ currentRuleContent }}</pre>
            </div>
          </div>
        </ScrollArea>
      </div>
      
      <div class="border-t p-4 flex justify-between">
        <Button variant="outline" @click="copyRule">
          Copy Rule
        </Button>
        <Button variant="default" @click="importRule">
          Import
        </Button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSigmaRulesStore } from '../stores/SigmaRulesStore';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const sigmaRulesStore = useSigmaRulesStore();

const currentRule = computed(() => sigmaRulesStore.currentRule);
const currentRuleContent = computed(() => sigmaRulesStore.currentRuleContent);
const isLoadingIndividualRule = computed(() => sigmaRulesStore.isLoadingIndividualRule);

// Format date if it exists
function formatDate(dateString?: string): string {
  if (!dateString) return 'Not specified';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch (e) {
    return dateString;
  }
}

// Copy rule content to clipboard
async function copyRule() {
  if (!currentRuleContent.value) return;
  
  try {
    await navigator.clipboard.writeText(currentRuleContent.value);
  } catch (err) {
    console.error('Failed to copy rule to clipboard:', err);
  }
}

// Import the rule into the editor
function importRule() {
  // This functionality would need to be implemented based on
  // how your application handles importing Sigma rules
  console.log('Import rule:', currentRule.value);
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