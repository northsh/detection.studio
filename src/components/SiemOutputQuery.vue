<script lang="ts" setup>
import {useWorkspaceStore} from "@/stores/WorkspaceStore.ts";
import {computed, onMounted} from "vue";

import {useHead} from "@unhead/vue";
import PrismEditor from "./PrismEditor.vue";
import {ScrollArea} from "@/components/ui/scroll-area";
import {storeToRefs} from "pinia";


/**
 * Head
 */
useHead({
    title: 'Detection Studio – detection.studio',
    meta: [
        {
            name: 'description',
            content: 'Design, build and share detection rules for your security tools.',
        },
    ],
})


/**
 * Stores
 */
const workspace = useWorkspaceStore();
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());
// const test = workspace.currentWorkspace?.sigmaStore()
// const sigma = storeToRefs(test)
// console.log(sigma.isReady.value)
//
// onMounted(() => {
//     debugger
//     console.log(sigma.isReady.value)
// })

const isReady = computed(() => {
    return sigma.value.isReady;
});

</script>
<template>
    <div class="h-full w-full rounded-xl bg-muted relative overflow-hidden flex flex-col">
        <div class="flex items-center justify-between bg-muted-foreground/10 px-3 py-1.5">
            <h3 class="text-xs font-medium">SIEM Query Output</h3>
        </div>

        {{ isReady }}

        <div
            v-if="sigma.siem_conversion_error"
            class="absolute inset-0 flex  z-10 bg-red-950/50 backdrop-blur-xs"
        >
            <ScrollArea class="h-full w-full">
                <div v-if="sigma.siem_conversion_error" class="text-red-300 p-10">
                    <pre>{{ sigma.siem_conversion_error }}</pre>
                </div>
            </ScrollArea>
        </div>

        <PrismEditor
            id="siem-query-editor"
            v-model:model-value="sigma.siem_query"
            :read-only="true"
            :word-wrap="true"
            class="h-full w-full border-border text-xs md:text-sm overflow-y-auto overflow-x-hidden bg-[#0D1118]"
            language="splunk-spl"
        />
    </div>
</template>