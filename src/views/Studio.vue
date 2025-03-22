<script lang="ts" setup>
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage,} from "@/components/ui/breadcrumb";
import {Separator} from "@/components/ui/separator";
import {SidebarTrigger} from "@/components/ui/sidebar";
// Importing Prism grammars
import "prism-code-editor/prism/languages/markup";
import "prism-code-editor/prism/languages/javascript";
import "prism-code-editor/prism/languages/yaml";
import {Button} from "@/components/ui/button";
import PrismEditor from "../components/PrismEditor.vue";
import {Progress} from "@/components/ui/progress";
import Editor from "@/components/Editor.vue";
import {Download} from "lucide-vue-next";
import {useWorkspaceStore} from "@/stores/WorkspaceStore.ts";
import {computed, ref, onMounted, onUnmounted} from "vue";
import ShareButton from "@/components/ShareButton.vue";
import DataView from "@/components/DataView.vue";
import SIEMSelector from "@/components/SIEMSelector.vue";
import PipelineSelector from "@/components/PipelineSelector.vue";
import {useWindowSize} from '@vueuse/core';

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
import JSZip from 'jszip';
import {supportedSiems} from "@/types/SIEMs.ts";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup
} from "@/components/ui/resizable";
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

import { Github } from 'lucide-vue-next';

const workspace = useWorkspaceStore();
const fs = computed(() => workspace.currentWorkspace?.fileStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

// Use VueUse's useWindowSize for responsive behavior
const { width, height } = useWindowSize();
const isCompactView = computed(() => width.value < 768 || height.value < 600);

const exportFiles = () => {
    if (!fs.value || !fs.value.files.length) return;

    const zip = new JSZip();

    // Create folders for different file types
    const rulesFolder = zip.folder("rules");
    const configFolder = zip.folder("config");
    const filtersFolder = zip.folder("filters");

    // Track file names to handle duplicates
    const fileNameCounts = {};

    // Add all files to the zip archive
    fs.value.files.forEach(file => {
        // All files will have .yaml extension
        const extension = '.yaml';

        // Count occurrences of file names to handle duplicates
        const baseFileName = file.name;
        fileNameCounts[baseFileName] = (fileNameCounts[baseFileName] || 0) + 1;

        // For duplicate file names, add a suffix
        const fileName = fileNameCounts[baseFileName] > 1
            ? `${baseFileName}_${fileNameCounts[baseFileName] - 1}${extension}`
            : `${baseFileName}${extension}`;

        // Add file to the appropriate folder based on type
        if (file.type === 'sigma') {
            rulesFolder.file(fileName, file.content);
        } else if (file.type === 'pipeline') {
            configFolder.file(fileName, file.content);
        } else if (file.type === 'filter') {
            filtersFolder.file(fileName, file.content);
        } else {
            // Default for correlation or any other types
            zip.file(fileName, file.content);
        }
    });

    // Create the dynamic README.md content based on the selected SIEM
    const generateReadme = () => {
        // Get the currently selected SIEM
        const selectedSiemId = sigma.value?.selected_siem;

        // Find the selected SIEM details from the imported types
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

## Specific Instructions for ${targetName}

${generateSiemSpecificInstructions(targetId)}

Visit https://sigmahq.io for more information about Sigma and its capabilities.
`;
    };

    // Helper function to generate SIEM-specific instructions
    const generateSiemSpecificInstructions = (siemId) => {
        // Add specific instructions based on the SIEM type
        switch (siemId) {
            case 'splunk':
                return `### For Splunk
- The converted queries will be in Splunk Processing Language (SPL) format
- You can paste these directly into your Splunk search bar
- For best results, use the Splunk Enterprise Security Content Update (ESCU) field mappings`;

            case 'esql':
            case 'lucene':
            case 'eql':
                return `### For Elasticsearch
- The converted queries will be in ${siemId.toUpperCase()} format
- You can use these queries in Kibana or directly with the Elasticsearch API
- Consider using Elastic Security for additional integration capabilities`;

            case 'loki':
                return `### For Grafana Loki
- The converted queries will be in LogQL format
- You can use these in Grafana dashboards with Loki datasources
- For optimal performance, ensure your Loki deployment has appropriate index configurations`;

            default:
                return `### For ${siemId}
- The converted queries will be specific to your ${siemId} environment
- Refer to your SIEM's documentation for best practices when importing these queries
- Consider testing in a development environment before deploying to production`;
        }
    };

    // Add the dynamically generated README to the zip
    zip.file("README.md", generateReadme());

    // Generate the zip file
    zip.generateAsync({type: 'blob'})
        .then(content => {
            // Create a download link and trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'detection_studio_export.zip';
            link.click();

            // Clean up
            URL.revokeObjectURL(link.href);
        });
};
</script>

<template>
    <div class="flex flex-col h-screen w-full max-w-full overflow-hidden">
        <!-- Header - Fixed height, no overflow -->
        <header class="flex h-14 shrink-0 items-center gap-1 md:gap-2">
            <div class="w-full flex items-center gap-1 md:gap-4 px-4">
                <SidebarTrigger />
                <Separator class="!h-4" orientation="vertical"/>
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
                    <Button
                        variant="ghost"
                        size="sm"
                        href="https://github.com/northsh/detection.studio/"
                        target="_blank"
                    >
                        <Github class="h-4 w-4 text-primary"/>
                        GitHub
                    </Button>

                    <ShareButton/>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button
                                    variant="secondary"
                                    :disabled="!fs?.files.length"
                                    class="hidden h-8 md:flex gap-1 md:gap-2"
                                    size="sm"
                                    @click="exportFiles"
                                >
                                    <Download class="h-3.5 w-3.5"/>
                                    Export
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent align="end" side="bottom">
                                <p>Export files as ZIP archive</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </header>

        <!-- Main Content - Flexbox layout with three sections -->
        <div class="flex flex-col flex-1 h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] min-h-0 w-full overflow-hidden">
            <!-- Use ResizablePanelGroup for vertical layout -->
            <ResizablePanelGroup direction="vertical" class="h-full min-h-0 w-full">
                <!-- Editor Panel - Takes ~60% of the space -->
                <ResizablePanel :default-size="70" :min-size="20" class="p-1 min-h-0 flex flex-col">
                    <div class="h-full w-full rounded-xl overflow-hidden flex flex-col">
                        <Editor/>
                    </div>
                </ResizablePanel>

                <!-- Resize Handle -->
                <ResizableHandle with-handle />

                <!-- Bottom Section - Takes ~40% of the space -->
                <ResizablePanel :default-size="30" :min-size="10" class="p-1 min-h-0 flex flex-col">
                    <!-- Nested ResizablePanelGroup for the bottom section -->
                    <ResizablePanelGroup direction="vertical" class="h-full min-h-0 w-full">
                        <!-- SIEM Query Output - Compact - Takes only 35% -->
                        <ResizablePanel :default-size="35" :min-size="15" :max-size="50" class="min-h-0 flex flex-col">
                            <div class="h-full w-full rounded-xl bg-muted relative overflow-hidden flex flex-col">
                                <div class="flex items-center justify-between bg-muted-foreground/10 px-3 py-1.5">
                                    <h3 class="text-xs font-medium">SIEM Query Output</h3>
                                </div>

                                <div
                                    v-if="sigma.siem_conversion_error"
                                    class="absolute inset-0 flex p-10 z-10 bg-red-950/50 backdrop-blur-sm"
                                >
                                    <div v-if="sigma.siem_conversion_error" class="text-red-300">
                                        {{ sigma.siem_conversion_error }}
                                    </div>
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
                        <ResizableHandle with-handle />

                        <!-- SIEM Sample Data - Takes 65% -->
                        <ResizablePanel :default-size="30" :min-size="10" class="min-h-0 flex flex-col">
                            <DataView class="h-full w-full" />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>

        <!-- Mobile View Sheet for small viewports -->
        <Sheet v-if="isCompactView" side="bottom">
            <SheetTrigger as-child>
                <Button variant="outline" class="md:hidden fixed bottom-4 right-4 z-50">
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
                    <DataView />
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
