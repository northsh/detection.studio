<script lang="ts" setup>
import {computed, ref} from "vue";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Badge} from "@/components/ui/badge";
import {Plus, X} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import type {FileItem} from "@/types/types";

const workspace = useWorkspaceStore();
const fs = computed(() => workspace.currentWorkspace?.fileStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

// Default built-in pipelines
const defaultPipelines = [
    'splunk_windows',
    'splunk_linux',
    'splunk_web',
    'splunk_network',
    'elasticsearch_windows',
    'elasticsearch_linux',
    'elasticsearch_web',
    'elasticsearch_network'
];

// Get available pipelines from pipeline files
const availablePipelines = computed(() => {
    const pipelines: string[] = [...defaultPipelines];

    // Add custom pipelines from files
    const pipelineFiles = fs.value?.files.filter((f: FileItem) => f.type === "pipeline") || [];

    // Extract pipeline names from files
    pipelineFiles.forEach((file: FileItem) => {
        const content = file.content || '';

        // Look for name patterns in YAML
        // This is a simple approach - the backend uses pipeline_resolver.py for proper parsing
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

// Handle pipeline selection
const selectedPipeline = ref('');

function addPipeline() {
    if (!selectedPipeline.value ||
        sigma.value.selected_pipelines.includes(selectedPipeline.value)) {
        return;
    }

    const newPipelines = [...sigma.value.selected_pipelines, selectedPipeline.value];
    sigma.value.updateSelectedPipelines(newPipelines);
    selectedPipeline.value = '';
}

function removePipeline(pipeline: string) {
    const newPipelines = sigma.value.selected_pipelines.filter(p => p !== pipeline);
    sigma.value.updateSelectedPipelines(newPipelines);
}

const selectedPipelines = computed(() => sigma.value?.selected_pipelines || []);
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex gap-2 items-center">
            <Select v-model="selectedPipeline">
                <SelectTrigger class="h-8 w-[200px]">
                    <SelectValue placeholder="Select pipeline"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectLabel class="m-0 pt-2 pb-0 px-3">Pipelines</SelectLabel>
                    <SelectGroup>
                        <div class="grid grid-cols-1 gap-1 p-2">
                            <template v-for="pipeline in availablePipelines" :key="pipeline">
                                <SelectItem :value="pipeline">
                                    {{ pipeline }}
                                </SelectItem>
                            </template>
                        </div>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button
                class="h-8 w-8"
                size="icon"
                variant="outline"
                @click="addPipeline">
                <Plus class="h-4 w-4"/>
            </Button>
        </div>

        <div class="flex flex-wrap gap-2 mt-1">
            <Badge
                v-for="pipeline in selectedPipelines"
                :key="pipeline"
                class="flex items-center gap-1"
                variant="secondary"
            >
                {{ pipeline }}
                <button class="ml-1 p-0" @click="removePipeline(pipeline)">
                    <X class="h-3 w-3"/>
                </button>
            </Badge>
        </div>
    </div>
</template>