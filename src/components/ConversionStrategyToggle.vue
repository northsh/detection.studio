<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useWorkspaceStore } from "@/stores/WorkspaceStore";
import { SigmaConversionStrategy } from "@/lib/sigma";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const workspace = useWorkspaceStore();
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

const isRemote = computed(() => 
  sigma.value?.conversion_strategy === SigmaConversionStrategy.REMOTE
);

const strategyLabel = computed(() => {
  return isRemote.value ? "Remote Conversion" : "Local Conversion";
});

const tooltipText = computed(() => {
  if (sigma.value?.isReady) {
    return "Loading Pyodide environment. This may take a few moments the first time.";
  }
  return isRemote.value 
    ? "Using remote server for Sigma rule conversion. Click to switch to local Pyodide-based conversion." 
    : "Using local Pyodide-based Sigma rule conversion. Click to switch to remote server conversion.";
});

// Handle toggle and show loading state
function handleToggle() {
  if (sigma.value?.isReady) {
    sigma.value?.toggleConversionStrategy();
  }
}

</script>

<template>
  <Tooltip>
    <TooltipTrigger>
      <Button 
        size="sm"
        variant="outline"
        :disabled="!sigma.isReady"
        @click="handleToggle">
        <span v-if="!sigma.isReady" class="mr-1 text-yellow-600 dark:text-yellow-400 animate-spin">⟳</span>
        {{ strategyLabel }}
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      {{ tooltipText }}
    </TooltipContent>
  </Tooltip>
</template>