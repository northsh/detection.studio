<script lang="ts" setup>
import {PanelRightClose, PanelRightOpen, X} from "lucide-vue-next";

// Importing Prism grammars
import "prism-code-editor/prism/languages/markup";

import "prism-code-editor/prism/languages/javascript";
import "prism-code-editor/prism/languages/yaml";
import {Button} from "@/components/ui/button";
import PrismEditor from "./PrismEditor.vue";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import FileList from "./FileList.vue";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {computed, type ComputedRef, ref} from "vue";
import type {SplitterPanel} from "radix-vue";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {breakpointsTailwind, useBreakpoints, useElementSize, useWindowSize} from '@vueuse/core'
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import SigmaEditor from "@/components/SigmaEditor.vue";

const workspace = useWorkspaceStore();
const fs = computed(() => workspace.currentWorkspace?.fileStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

/**
 * File Store Panel
 */
const fileStorePanelRef = ref<InstanceType<typeof SplitterPanel>>();
const editorContainerRef = ref(null);
const tabsContainerRef = ref(null);
const { width: containerWidth } = useElementSize(editorContainerRef);
const { height: tabsHeight } = useElementSize(tabsContainerRef);
const { height: windowHeight } = useWindowSize();

// Compute max visible tabs based on container size
const maxVisibleTabs = computed(() => {
  // Calculate based on average tab width (approx 120px) and spacing
  return Math.floor(containerWidth.value / 130);
});

// Compute if tabs should be multiline
const shouldShowMultilineTabs = computed(() => {
  return fs.value && fs.value.openFiles && fs.value.openFiles.length > maxVisibleTabs.value;
});

// Set max height for tabs container based on number of files
const tabsMaxHeight = computed(() => {
  if (!shouldShowMultilineTabs.value) return '2.5rem';
  // Each row is ~2.5rem, allow up to 3 rows
  return Math.min(3, Math.ceil(fs.value?.openFiles.length / maxVisibleTabs.value)) * 2.5 + 'rem';
});

// Calculate dynamic max height for editor content
const editorMaxHeight = computed(() => {
  // Calculate remaining height: window height - header (3.5rem) - tabs height - small buffer
  return `calc(${windowHeight.value}px - 3.5rem - ${tabsHeight.value}px - 1rem)`;
});

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop: ComputedRef<boolean> = breakpoints.greaterOrEqual('md')
</script>

<template>
    <ResizablePanelGroup auto-save-id="editor" class="h-full w-full min-h-0 flex-1 rounded-lg border"
                         direction="horizontal" ref="editorContainerRef">
        <ResizablePanel ref="fileStorePanelRef"
                        :default-size="20"
                        :max-size="isDesktop ? 30 : 90"
                        :min-size="isDesktop ? 20 : 60"
                        collapsible>
            <FileList/>
        </ResizablePanel>
        <ResizableHandle with-handle/>
        <ResizablePanel :default-size="80" as-child class="h-full min-h-0 overflow-hidden">
            <Tabs v-model:model-value="fs.currentlyOpenFileId" class="">

                <div class="flex items-center">


                    <Button v-if="fileStorePanelRef?.isCollapsed"
                            class="flex items-center gap-2 rounded-lg" size="icon"
                            variant="secondary" @click="fileStorePanelRef?.expand()">
                        <PanelRightClose class="h-4 w-4"/>
                    </Button>
                    <Button v-if="fileStorePanelRef?.isExpanded"
                            class="flex items-center gap-2 rounded-lg" size="icon"
                            variant="ghost" @click="fileStorePanelRef?.collapse()">
                        <PanelRightOpen class="h-4 w-4"/>
                    </Button>


                    <ScrollArea class="w-full">
                        <div class="w-full relative h-10">
                            <TabsList class="flex items-center absolute h-10 border-none bg-transparent">
                                <template v-for="fileId in fs.openFiles" :key="fileId">
                                    <TabsTrigger :value="fileId" class="flex items-center gap-2" as-child>
                                        {{ fs.files.find(f => f.id === fileId)?.name }}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <span v-if="sigma.active_sigma_rule_file_id === fileId"
                                                      class="block rounded-full bg-sky-500 h-2 w-2"></span>
                                            </TooltipTrigger>
                                            <TooltipContent align="start" side="bottom">
                                                <p>Active Sigma Rule</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <button
                                            class="ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            @click.stop="fs.closeFile(fileId)">
                                            <X class="h-4 w-4"/>
                                            <span class="sr-only">Close</span>
                                        </button>
                                    </TabsTrigger>
                                </template>
                            </TabsList>
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>

                <TabsContent v-for="fileId in fs.openFiles" :key="fileId" :value="fileId"
                             as-child class="!mt-0 flex-1 min-h-0 bg-[#0D1116] overflow-auto"
                             :style="{ maxHeight: editorMaxHeight }">
                    <SigmaEditor v-model="fs.files.find(f => f.id === fileId)!.content"
                                class="text-xs md:text-sm h-full w-full"
                                @update:modelValue="(content) => fs.updateFile(fileId, content)"/>
                </TabsContent>
            </Tabs>
        </ResizablePanel>
    </ResizablePanelGroup>
</template>

<style>
/* PrismEditor styles */
.prism-editor .prism-code-editor {
    height: 100%;
    max-width: 100%;
    overflow-y: auto;
    overflow-x: auto;
}

/* Layout container styles */
.ResizablePanelGroup {
    max-width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 0;
    flex: 1;
}

.ResizablePanel {
    max-width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

/* Tabs container styles */
.Tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    min-height: 0;
    overflow: hidden;
}

.Tabs > :nth-child(2) {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* Tabs list styles */
.TabsList {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    padding: 0.25rem;
    background-color: transparent;
    border: none;
}

/* Tab item styles */
.TabsTrigger {
    height: 2rem;
    border-radius: 0.25rem;
    padding: 0 0.5rem;
    font-size: 0.75rem;
    line-height: 1rem;
    flex-shrink: 0;
}

/* Tab content styles */
.TabsContent {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
}
</style>
