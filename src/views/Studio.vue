<script lang="ts" setup>
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage,} from "@/components/ui/breadcrumb";
import {Separator} from "@/components/ui/separator";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import PrismEditor from "../components/PrismEditor.vue";
import Editor from "@/components/Editor.vue";
import {Github} from "lucide-vue-next";
import {useWorkspaceStore} from "@/stores/WorkspaceStore.ts";
import {computed} from "vue";
import ShareButton from "@/components/ShareWorkspaceButton.vue";
import DataView from "@/components/DataView.vue";
import SIEMSelector from "@/components/SIEMSelector.vue";
import PipelineSelector from "@/components/PipelineSelector.vue";
import {useWindowSize} from '@vueuse/core';

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {useHead} from "@unhead/vue";
import ExportButton from "@/components/ExportButton.vue";
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

// Use VueUse's useWindowSize for responsive behavior
const {width, height} = useWindowSize();
const isCompactView = computed(() => width.value < 768 || height.value < 600);
</script>

<template>
    <div class="flex flex-col h-screen w-full max-w-full overflow-hidden">
        <!-- Header - Fixed height, no overflow -->
        <header class="flex h-14 shrink-0 items-center gap-1 md:gap-2">
            <div class="w-full flex items-center gap-1 md:gap-4 px-4">
                <SidebarTrigger/>
                <Separator class="h-4!" orientation="vertical"/>
                <Breadcrumb v-if="false">
                    <BreadcrumbList>
                        <BreadcrumbItem class="hidden md:block">
                            <BreadcrumbPage href="#">Detection Studio</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div class="flex items-center gap-3">
                    <SIEMSelector/>
                    <PipelineSelector v-if="false"/>
                </div>
                <div class="grow"></div>
                <div class="flex items-center gap-1 md:gap-2">
                    <a
                        href="https://github.com/northsh/detection.studio/"
                        target="_blank"
                    >
                        <Button
                            size="sm"
                            variant="ghost"
                        >
                            <Github class="h-4 w-4 text-primary"/>
                            GitHub
                        </Button>
                    </a>

                    <ShareButton/>

                    <ExportButton/>
                </div>
            </div>
        </header>

        <!-- Main Content - Flexbox layout with three sections -->
        <div
            class="flex flex-col flex-1 h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] min-h-0 w-full overflow-hidden">
            <!-- Use ResizablePanelGroup for vertical layout -->
            <ResizablePanelGroup class="h-full min-h-0 w-full" direction="vertical">
                <!-- Editor Panel - Takes ~60% of the space -->
                <ResizablePanel :default-size="70" :min-size="20" class="p-1 min-h-0 flex flex-col">
                    <div class="h-full w-full overflow-hidden flex flex-col">
                        <Editor/>
                    </div>
                </ResizablePanel>

                <!-- Resize Handle -->
                <ResizableHandle with-handle/>

                <!-- Bottom Section - Takes ~40% of the space -->
                <ResizablePanel :default-size="30" :min-size="10" class="p-1 min-h-0 flex flex-col">
                    <!-- Nested ResizablePanelGroup for the bottom section -->
                    <ResizablePanelGroup class="h-full min-h-0 w-full" direction="vertical">
                        <!-- SIEM Query Output - Compact - Takes only 35% -->
                        <ResizablePanel :default-size="35" :max-size="50" :min-size="15" class="min-h-0 flex flex-col">
                            <div class="h-full w-full rounded-xl bg-muted relative overflow-hidden flex flex-col">
                                <div class="flex items-center justify-between bg-muted-foreground/10 px-3 py-1.5">
                                    <h3 class="text-xs font-medium">SIEM Query Output</h3>
                                </div>

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
                        </ResizablePanel>

                        <!-- Resize Handle -->
                        <ResizableHandle v-if="false" with-handle/>

                        <!-- SIEM Sample Data - Takes 65% -->
                        <ResizablePanel v-if="false" :default-size="30" :min-size="10" class="min-h-0 flex flex-col">
                            <DataView class="h-full w-full"/>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>

        <!-- Mobile View Sheet for small viewports -->
        <Sheet v-if="isCompactView && false" side="bottom">
            <SheetTrigger as-child>
                <Button class="md:hidden fixed bottom-4 right-4 z-50" variant="outline">
                    View Sample Data
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>SIEM Sample Data</SheetTitle>
                    <SheetDescription>
                        Examine sample data to test your SIEM queries
                    </SheetDescription>
                </SheetHeader>
                <div class="py-4">
                    <DataView/>
                </div>
                <SheetFooter>
                    <SheetClose as-child>
                        <Button type="button">
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    </div>
</template>

<style>
/* Remove active line styling from SIEM query editor - only custom CSS we need to keep */
#siem-query-editor .pce-line.active-line:after {
    content: none;
}
</style>
