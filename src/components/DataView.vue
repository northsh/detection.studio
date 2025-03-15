<script lang="ts" setup>
import {computed} from "vue";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {useFileDialog} from "@vueuse/core";
import {PlusIcon} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";


const workspace = useWorkspaceStore();
const data = computed(() => workspace.currentWorkspace?.dataStore());

// @ts-ignore
const {files, open, reset, onCancel, onChange} = useFileDialog({
    accept: 'application/json', // Set to accept only image files
    directory: false, // Select directories instead of files if set true
})

onChange(async (files: FileList) => {
    data.value.current_data_frame = await files[0].text();
})


</script>

<template>
    <div class="h-full w-full rounded-xl bg-muted/50 flex flex-col gap-2 p-3 overflow-hidden">
        <div v-if="!data?.current_data_frame" class="flex flex-col items-center justify-center h-full gap-2">
            <h2 class="text-lg font-semibold">SIEM Sample Data</h2>
            <p class="text-sm text-muted-foreground mb-2">Upload sample data to test your SIEM queries</p>
            <Button class="h-8 flex gap-2" size="sm" @click="open">
                <PlusIcon class="h-3.5 w-3.5"/>
                Upload JSON File
            </Button>
        </div>
        <template v-else>
            <div class="flex items-center justify-between">
                <h2 class="text-sm font-semibold">SIEM Sample Data</h2>
                <Button class="h-7 flex gap-1" size="sm" variant="outline" @click="data.clearCurrentDataFrame()">
                    <PlusIcon class="h-3 w-3"/>
                    Clear
                </Button>
            </div>
            <ScrollArea class="flex-1 min-h-0 w-full">
                <div class="text-xs text-slate-300 rounded-md text-wrap w-full">
                    <pre class="p-2"><code>{{ data?.current_data_frame }}</code></pre>
                </div>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </template>
    </div>
</template>
