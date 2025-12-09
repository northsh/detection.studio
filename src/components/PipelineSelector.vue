<script lang="ts" setup>
import {computed, watch, ref, onMounted} from "vue";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {getAvailablePipelines} from "@/lib/sigma/worker/workerApi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Filter, Check} from "lucide-vue-next";
import type {FileItem} from "@/types/types";

const isDropdownOpen = ref(false);

const workspace = useWorkspaceStore();
const fs = computed(() => workspace.currentWorkspace?.fileStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

// All available pipelines from plugins
const allPipelines = ref<string[]>([]);

// Load available pipelines from worker on mount
onMounted(async () => {
    try {
        console.log('Fetching available pipelines from worker...');
        const result = await getAvailablePipelines();
        console.log('Pipeline fetch result:', result);
        if (result.success && result.pipelines) {
            allPipelines.value = result.pipelines;
            console.log('Loaded pipelines:', allPipelines.value);
        } else {
            console.warn('Failed to get pipelines:', result.error);
        }
    } catch (error) {
        console.error('Failed to load available pipelines:', error);
    }
});

// Filter pipelines by backend prefix
function getPipelinesForBackend(backend: string): string[] {
    if (!backend || allPipelines.value.length === 0) {
        return allPipelines.value;
    }

    // Map backend names to their pipeline prefixes
    const backendPrefixes: Record<string, string[]> = {
        'splunk': ['splunk'],
        'esql': ['ecs', 'elasticsearch'],
        'lucene': ['ecs', 'elasticsearch'],
        'eql': ['ecs', 'elasticsearch'],
        'loki': ['loki'],
        'kusto': ['azure', 'microsoft'],
        'qradar': ['qradar'],
        'carbonblack': ['carbonblack'],
        'crowdstrike': ['crowdstrike'],
        'sentinel': ['azure', 'microsoft'],
    };

    const prefixes = backendPrefixes[backend] || [];

    // Filter pipelines that start with any of the backend's prefixes
    return allPipelines.value.filter(pipeline =>
        prefixes.some(prefix => pipeline.startsWith(prefix))
    );
}

// Get available pipelines filtered by selected backend
const availablePipelines = computed(() => {
    const selectedBackend = sigma.value?.selected_siem;

    // Start with backend-specific pipelines if available, otherwise all pipelines
    const basePipelines = selectedBackend
        ? getPipelinesForBackend(selectedBackend)
        : allPipelines.value;

    const pipelines: string[] = [...basePipelines];

    // Add custom pipelines from files
    const pipelineFiles = fs.value?.files.filter((f: FileItem) => f.type === "pipeline") || [];

    // Extract pipeline names from files
    pipelineFiles.forEach((file: FileItem) => {
        const content = file.content || '';

        // Look for name patterns in YAML
        const pipelines_in_file = [
            // Look for name: value format
            ...content.split('\n')
                .filter(line => line.trim().startsWith('name:'))
                .map(line => line.split(':')[1]?.trim())
                .filter(Boolean),

            // Look for name value in quotes
            ...content.match(/name: ["'](.+?)["']/g)?.map(match =>
                match.replace(/name: ["'](.+?)["']/, '$1')
            ) || []
        ];

        pipelines.push(...pipelines_in_file);
    });

    return [...new Set(pipelines)].sort(); // Remove duplicates and sort
});

const selectedPipelines = computed(() => sigma.value?.selected_pipelines || []);

// Toggle pipeline selection
function togglePipeline(pipeline: string, checked: boolean) {
    if (!sigma.value) return;

    const currentPipelines = sigma.value.selected_pipelines || [];

    if (checked) {
        // Add pipeline if not already selected
        if (!currentPipelines.includes(pipeline)) {
            const newPipelines = [...currentPipelines, pipeline];
            sigma.value.updateSelectedPipelines(newPipelines);
        }
    } else {
        // Remove pipeline
        const newPipelines = currentPipelines.filter(p => p !== pipeline);
        sigma.value.updateSelectedPipelines(newPipelines);
    }
}

// Watch for backend changes and clear incompatible pipelines
watch(() => sigma.value?.selected_siem, (newBackend) => {
    if (!newBackend || !sigma.value) return;

    const compatiblePipelines = getPipelinesForBackend(newBackend);
    const currentPipelines = sigma.value.selected_pipelines || [];

    // Remove pipelines that are not compatible with the new backend
    const filteredPipelines = currentPipelines.filter(pipeline => {
        // Keep pipelines that are compatible with the backend
        return compatiblePipelines.includes(pipeline);
    });

    // Update if pipelines were filtered out
    if (filteredPipelines.length !== currentPipelines.length) {
        sigma.value.updateSelectedPipelines(filteredPipelines);
    }
});

// Computed label for the button
const buttonLabel = computed(() => {
    const count = selectedPipelines.value.length;
    if (count === 0) return 'Pipelines';
    if (count === 1) return '1 Pipeline';
    return `${count} Pipelines`;
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
    <DropdownMenu v-model:open="isDropdownOpen">
        <DropdownMenuTrigger as-child>
            <Button
                variant="outline"
                size="sm"
                class="h-8 gap-2"
                :class="selectedPipelines.length > 0 ? 'border-primary' : ''"
            >
                <Filter class="h-3.5 w-3.5"/>
                <span>{{ toTitleCase(buttonLabel) }}</span>
                <Check v-if="selectedPipelines.length > 0" class="h-3.5 w-3.5 text-primary"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[280px]" align="start">
            <DropdownMenuLabel>
                <div class="flex flex-col gap-1">
                    <span>Pipelines</span>
                    <span class="text-xs font-normal text-muted-foreground">
                        Compatible with {{ sigma?.selected_siem || 'current backend' }}
                    </span>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>

            <ScrollArea class="h-[280px]">
                <div class="px-1">
                    <DropdownMenuCheckboxItem
                        v-for="pipeline in availablePipelines"
                        :key="pipeline"
                        :checked="selectedPipelines.includes(pipeline)"
                        @select.prevent
                        @update:checked="(checked) => togglePipeline(pipeline, checked)"
                    >
                        {{ toTitleCase(pipeline) }}
                    </DropdownMenuCheckboxItem>

                    <div v-if="availablePipelines.length === 0" class="px-2 py-6 text-center text-sm text-muted-foreground">
                        No pipelines available for this backend
                    </div>
                </div>
            </ScrollArea>

            <template v-if="selectedPipelines.length > 0">
                <DropdownMenuSeparator/>
                <div class="px-2 py-2 flex items-center justify-between">
                    <span class="text-xs text-muted-foreground">{{ selectedPipelines.length }} selected</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        class="h-6 px-2 text-xs"
                        @click="sigma?.updateSelectedPipelines([]); isDropdownOpen = false"
                    >
                        Clear all
                    </Button>
                </div>
            </template>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
