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
import {breakpointsTailwind, useBreakpoints} from '@vueuse/core'
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

const workspace = useWorkspaceStore();
const fs = computed(() => workspace.currentWorkspace?.fileStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

/**
 * File Store Panel
 */
const fileStorePanelRef = ref<InstanceType<typeof SplitterPanel>>();

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop: ComputedRef<boolean> = breakpoints.greaterOrEqual('md')
</script>

<template>
    <ResizablePanelGroup auto-save-id="editor" class="min-h-[400px] max-h-[600px] flex-1 rounded-lg border"
                         direction="horizontal">
        <ResizablePanel ref="fileStorePanelRef"
                        :default-size="20"
                        :max-size="isDesktop ? 30 : 90"
                        :min-size="isDesktop ? 20 : 60"
                        collapsible>
            <FileList/>
        </ResizablePanel>
        <ResizableHandle with-handle/>
        <ResizablePanel :default-size="80" as-child class="h-full">
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
                             as-child class="!mt-0 pb-10 h-full bg-[#0D1116]">
                    <ScrollArea class=" h-full w-full">

                        <PrismEditor v-model="fs.files.find(f => f.id === fileId)!.content"
                                     :insert-spaces="true"
                                     :line-numbers="true"
                                     class="text-xs md:text-sm"
                                     language="yaml" @selectionChange="console.log"
                                     @update:modelValue="(content) => fs.updateFile(fileId, content)"/>


                        <ScrollBar orientation="vertical"/>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </ResizablePanel>
    </ResizablePanelGroup>
</template>

<style>
.prism-editor .prism-code-editor {
    height: 100%;
}
</style>
