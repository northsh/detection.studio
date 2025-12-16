<script lang="ts" setup>
import {computed, watch, ref, onMounted} from "vue";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {getAvailablePipelines} from "@/lib/sigma/worker/workerApi";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Checkbox} from "@/components/ui/checkbox";
import {Separator} from "@/components/ui/separator";
import {ChevronDown} from "lucide-vue-next";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const workspace = useWorkspaceStore();
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

// Fetch available pipelines (already filtered by backend)
const compatiblePipelines = ref<string[]>([]);
const isDropdownOpen = ref(false);

async function loadPipelines() {
    const result = await getAvailablePipelines(
        sigma.value?.selected_siem || ""
    );
    if (result.success && result.pipelines) {
        compatiblePipelines.value = result.pipelines;
    }
}

// Load pipelines on mount
onMounted(() => {
    loadPipelines();
});

const selectedPipelines = computed(() => sigma.value?.selected_pipelines || []);

// Incompatible pipelines are those selected but not in the compatible list
const incompatiblePipelines = computed(() => {
    const selected = sigma.value?.selected_pipelines || [];
    const compatible = compatiblePipelines.value;
    return selected.filter(p => !compatible.includes(p)).sort();
});

// Compatible pipelines available for selection
const availableCompatiblePipelines = computed(() => {
    return compatiblePipelines.value.sort();
});

// Toggle pipeline selection
function togglePipeline(pipeline: string, checked: boolean) {
    if (!sigma.value) return;
    const currentPipelines = sigma.value.selected_pipelines || [];

    if (checked) {
        if (!currentPipelines.includes(pipeline)) {
            sigma.value.updateSelectedPipelines([...currentPipelines, pipeline]);
        }
    } else {
        sigma.value.updateSelectedPipelines(currentPipelines.filter(p => p !== pipeline));
    }
}

// Clear all pipelines
function clearAllPipelines() {
    if (!sigma.value) return;
    sigma.value.updateSelectedPipelines([]);
}

// Computed label for the button
const buttonLabel = computed(() => {
    const count = selectedPipelines.value.length;
    if (count === 0) return 'Select a pipeline';
    if (count === 1) return '1 Pipeline Active';
    return `${count} Pipelines Active`;
});

// Watch for backend changes and reload pipelines
watch(() => sigma.value?.selected_siem, () => {
    loadPipelines();
});

// Convert to Title Case, minus the underscores
function toTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(/[_\s]+/)
        .map(word => {
            if (word === 'ecs') return 'ECS';
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}
</script>

<template>
  <Popover v-model:open="isDropdownOpen">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="isDropdownOpen"
        class="w-70! h-8 justify-between"
        @click="loadPipelines"
        :class="selectedPipelines.length > 0 ? 'border-primary bg-primary/10 hover:bg-primary/20' : 'bg-background text-muted-foreground hover:bg-background'"
      >
        {{ buttonLabel }}
        <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-70 p-0" align="start">
      <div class="flex items-center justify-between border-b px-3 py-2">
        <div class="flex flex-col">
          <span class="text-sm font-medium">Pipelines</span>
          <span class="text-xs text-muted-foreground">
            Compatible with {{ sigma?.selected_siem || 'current backend' }}
          </span>
        </div>
        <Button
          v-if="selectedPipelines.length > 0"
          variant="ghost"
          size="sm"
          class="h-auto px-2 py-1 text-xs"
          @click="clearAllPipelines"
        >
          Clear All
        </Button>
      </div>

      <ScrollArea class="h-70">
        <!-- Compatible Pipelines Section -->
        <div v-if="availableCompatiblePipelines.length > 0" class="p-2">
          <div
            v-for="pipeline in availableCompatiblePipelines"
            :key="pipeline"
            class="flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer"
            @click="togglePipeline(pipeline, !selectedPipelines.includes(pipeline))"
          >
            <Checkbox
              :id="pipeline"
              :model-value="selectedPipelines.includes(pipeline)"
                @update:model-value="(checked: boolean) => togglePipeline(pipeline, checked)"
              @click.prevent
            />
            <label :for="pipeline" class="flex-1 text-sm cursor-pointer">
              {{ toTitleCase(pipeline) }}
            </label>
          </div>
        </div>

        <div v-else class="px-2 py-6 text-center text-sm text-muted-foreground">
          No compatible pipelines available
        </div>

        <!-- Incompatible Pipelines Section -->
        <div v-if="incompatiblePipelines.length > 0">
          <Separator />
          <div class="px-3 py-2 text-xs font-medium text-muted-foreground">
            Incompatible (Selected but not compatible)
          </div>
          <div class="p-2">
            <div
              v-for="pipeline in incompatiblePipelines"
              :key="pipeline"
              class="flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer opacity-60"
              @click="togglePipeline(pipeline, false)"
            >
              <Checkbox
                :id="`incompatible-${pipeline}`"
                :model-value="true"
                @update:model-value="() => togglePipeline(pipeline, false)"
              />
              <label :for="`incompatible-${pipeline}`" class="flex-1 text-sm cursor-pointer">
                {{ toTitleCase(pipeline) }}
              </label>
              <span class="text-xs text-destructive">⚠</span>
            </div>
          </div>
        </div>
      </ScrollArea>
    </PopoverContent>
  </Popover>
</template>
