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
    <div class="min-h-[400px] max-h-[900px] rounded-xl bg-muted/50 flex flex-col items-center justify-center gap-2 p-3">


        <div v-if="!data?.current_data_frame" class="flex gap-2">
            <h2 class="text-lg font-semibold">Data</h2>
            <Button class="h-8 flex gap-2" size="sm" @click="open">
                <PlusIcon class="h-3.5 w-3.5"/>
                Add
            </Button>
        </div>
        <template v-else>
            <Button class="h-8 flex gap-2 w-full" size="sm" variant="outline" @click="data.clearCurrentDataFrame()">
                <PlusIcon class="h-3.5 w-3.5"/>
                Clear
            </Button>
            <ScrollArea class=" h-full w-full overflow-auto">
                <div class="h-full text-muted text-xs text-slate-300 rounded-md text-wrap w-full">
                    <pre><code>{{ data?.current_data_frame }}</code></pre>
                </div>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </template>

    </div>
</template>
