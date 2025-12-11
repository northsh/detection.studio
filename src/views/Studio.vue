<script lang="ts" setup>
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage,} from "@/components/ui/breadcrumb";
import {Separator} from "@/components/ui/separator";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import Editor from "@/components/Editor.vue";
import {Github, MoreVertical, Share, Download} from "lucide-vue-next";
import {useWorkspaceStore} from "@/stores/WorkspaceStore.ts";
import {computed} from "vue";
import ShareButton from "@/components/ShareWorkspaceButton.vue";
import DataView from "@/components/DataView.vue";
import SIEMSelector from "@/components/SIEMSelector.vue";
import PipelineSelector from "@/components/PipelineSelector.vue";
import {useWindowSize} from '@vueuse/core';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
import SiemOutputQuery from "@/components/SiemOutputQuery.vue";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useWorkspaceSharingStore} from "@/stores/ShareStore";
import {useClipboard} from '@vueuse/core';
import JSZip from 'jszip';
import {supportedSiems} from "@/types/SIEMs.ts";
import {ref} from 'vue';

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

const workspaceStore = useWorkspaceStore();
const shareStore = useWorkspaceSharingStore();

// Use VueUse's useWindowSize for responsive behavior
const {width, height} = useWindowSize();
const isCompactView = computed(() => width.value < 768 || height.value < 600);

// Share dialog state
const shareDialogOpen = ref(false);
const shareUrl = computed(() => {
    return shareStore.generateShareableUrl(workspaceStore.currentWorkspace)
});
const {copy, isSupported} = useClipboard({source: shareUrl});

function openShareDialog() {
    shareDialogOpen.value = true;
}

function handleShare() {
    copy(shareUrl.value);
}

// Export functionality
const fs = computed(() => workspaceStore.currentWorkspace?.fileStore());
const sigma = computed(() => workspaceStore.currentWorkspace?.sigmaStore());

function exportFiles() {
    if (!fs.value || !fs.value.files.length) return;

    const zip = new JSZip();
    const rulesFolder = zip.folder("rules");
    const configFolder = zip.folder("config");
    const filtersFolder = zip.folder("filters");
    const fileNameCounts = {};

    fs.value.files.forEach(file => {
        const extension = '.yaml';
        const baseFileName = file.name;
        fileNameCounts[baseFileName] = (fileNameCounts[baseFileName] || 0) + 1;
        const fileName = fileNameCounts[baseFileName] > 1
            ? `${baseFileName}_${fileNameCounts[baseFileName] - 1}${extension}`
            : `${baseFileName}${extension}`;

        if (file.type === 'sigma') {
            rulesFolder.file(fileName, file.content);
        } else if (file.type === 'pipeline') {
            configFolder.file(fileName, file.content);
        } else if (file.type === 'filter') {
            filtersFolder.file(fileName, file.content);
        } else {
            zip.file(fileName, file.content);
        }
    });

    const generateReadme = () => {
        const selectedSiemId = sigma.value?.selected_siem;
        const siemDetails = supportedSiems.find(siem => siem.id === selectedSiemId);
        const backendPlugin = siemDetails?.backend || '<backend>';
        const targetName = siemDetails?.name || '<target>';
        const targetId = siemDetails?.id || '<target>';

        return `# Detection Studio Export

This archive contains Sigma rules and configurations exported from Detection Studio.

## Directory Structure

- \`rules/\`: Contains Sigma detection rules
- \`config/\`: Contains Sigma pipeline configurations
- \`filters/\`: Contains Sigma filter configurations

## Usage with Sigma CLI

To use these files with the Sigma CLI tool, you need to:

1. Install Sigma CLI:
   \`\`\`bash
   pip3 install sigma-cli
   \`\`\`

2. Install the appropriate backend plugin for your SIEM:
   \`\`\`bash
   sigma plugin install ${backendPlugin}
   \`\`\`

   You can view all available backends with \`sigma plugin list\`.

3. Convert the rules to your SIEM format:
   \`\`\`bash
   sigma convert \\
       --target ${targetId} \\
       --filter ./filters/ \\
       --pipeline ./config/ \\
       ./rules
   \`\`\`

Visit https://sigmahq.io for more information about Sigma and its capabilities.
`;
    };

    zip.file("README.md", generateReadme());

    zip.generateAsync({type: 'blob'})
        .then(content => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'detection_studio_export.zip';
            link.click();
            URL.revokeObjectURL(link.href);
        });
}
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
                    <PipelineSelector/>
                </div>
                <div class="grow"></div>
                <div class="flex items-center gap-1 md:gap-2">
                    <!-- Desktop buttons (hidden on mobile) -->
                    <a
                        href="https://github.com/northsh/detection.studio/"
                        target="_blank"
                        class="hidden md:inline"
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

                    <!-- Mobile dropdown menu (shown on mobile only) -->
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button
                                size="sm"
                                variant="ghost"
                                class="md:hidden h-8 w-8 p-0"
                            >
                                <MoreVertical class="h-4 w-4"/>
                                <span class="sr-only">More options</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem as-child>
                                <a
                                    href="https://github.com/northsh/detection.studio/"
                                    target="_blank"
                                    class="flex items-center gap-2 cursor-pointer"
                                >
                                    <Github class="h-4 w-4"/>
                                    GitHub
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                @click="openShareDialog"
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <Share class="h-4 w-4"/>
                                Share
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                @click="exportFiles"
                                :disabled="!fs?.files.length"
                                class="flex items-center gap-2 cursor-pointer"
                            >
                                <Download class="h-4 w-4"/>
                                Export
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                            <SiemOutputQuery/>
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

        <!-- Share Dialog for mobile dropdown -->
        <Dialog v-model:open="shareDialogOpen">
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Share workspace
                    </DialogTitle>
                    <DialogDescription>
                        Share your detection.studio workspace with others by sending them the link below.
                    </DialogDescription>
                </DialogHeader>
                <div class="flex flex-col gap-2">
                    <Label for="share-url">
                        Shareable URL
                    </Label>
                    <Input id="share-url" :model-value="shareUrl" class="col-span-3" disabled/>
                    <Button v-if="isSupported" class="w-full" type="submit" variant="outline" @click="handleShare">
                        Copy
                    </Button>
                    <div v-else class="flex flex-col gap-2">
                        <DialogDescription>
                            Your browser does not support copying to clipboard.
                        </DialogDescription>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
</template>

<style>
/* Remove active line styling from SIEM query editor - only custom CSS we need to keep */
#siem-query-editor .pce-line.active-line:after {
    content: none;
}
</style>
