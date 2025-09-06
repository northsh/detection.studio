<script lang="ts" setup>
import {useWorkspaceStore} from "@/stores/WorkspaceStore.ts";
import {computed, ref, onMounted, onBeforeUnmount} from "vue";
import { useChangeCase } from '@vueuse/integrations/useChangeCase'
import {useHead} from "@unhead/vue";
import PrismEditor from "./PrismEditor.vue";
import {ScrollArea} from "@/components/ui/scroll-area";


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


const isReady = computed(() => {
    return sigma.value.isReady;
});

/**
 * Loading messages
 */
const loadingMessages = [
    // "Finding Attackers...",
    "Crafting \"next-gen\" Sigma rules...",
    "Hunting APT groups...",
    "Correlating suspicious events...",
    "Decoding obfuscated PowerShell...",
    "Detecting lateral movement...",
    "Analyzing behavior patterns...",
    "Investigating suspicious DNS queries...",
    "Scanning memory for IOCs...",
    "Chasing false positives away...",
    "Finding the next APT group...",
    "Decoding the latest Cobalt Strike...",
    "Hunting for the elusive \"Red Team\"...",
    "Searching for the next \"big\" threat...",
    "Going through the Sigma rule PR backlog...",
    "Sending Florian Roth an angry tweet...",


];

const index = ref(Math.floor(Math.random() * loadingMessages.length));
const currentLoadingMessage = computed(() => loadingMessages[index.value]);
let messageInterval: number | null = null;

// Cycle through messages every 3 seconds
onMounted(() => {
    messageInterval = window.setInterval(() => {
        index.value = (index.value + 1) % loadingMessages.length;
    }, 3000);
});

onBeforeUnmount(() => {
    if (messageInterval !== null) {
        clearInterval(messageInterval);
    }
});

const siem_title = computed(() => {
    return useChangeCase(sigma.value.selected_siem, 'sentenceCase')
});

</script>
<template>
    <div class="h-full w-full rounded-xl bg-muted relative overflow-hidden flex flex-col">
        <div class="flex items-center gap-2 bg-muted-foreground/10 px-3 py-1.5">
            <h3 class="text-xs font-medium">SIEM Query Output</h3>
            <p class="text-xs font-bold text-muted-foreground title">
                {{ siem_title }}
            </p>
        </div>

        <!-- Loading overlay -->
        <Transition name="fade">
            <div
                v-if="!isReady && !sigma.siem_conversion_error"
                class="absolute inset-0 flex items-center justify-center z-10 bg-secondary/70 backdrop-blur-sm"
            >
                <div class="text-center px-4 py-8 gap-4 flex flex-col items-center">
                    <div class="animate-spin h-8 w-8 border-4 border-secondary border-t-primary rounded-full mx-auto"></div>
                    <div class="animate-pulse text-secondary-foreground text-lg font-medium">{{ currentLoadingMessage }}</div>
                </div>
            </div>
        </Transition>

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

<style scoped>
/* Fade transition for loading screen */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>