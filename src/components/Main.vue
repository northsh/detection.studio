<script lang="ts" setup>
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
// Importing Prism grammars
import "prism-code-editor/prism/languages/markup";
import "prism-code-editor/prism/languages/javascript";
import "prism-code-editor/prism/languages/yaml";
import { Button } from "@/components/ui/button";
import PrismEditor from "./PrismEditor.vue";
import { Progress } from "@/components/ui/progress";
import Editor from "@/components/Editor.vue";
import { Download } from "lucide-vue-next";
import { useWorkspaceStore } from "@/stores/WorkspaceStore";
import { computed } from "vue";
import ShareButton from "@/components/ShareButton.vue";
import DataView from "@/components/DataView.vue";
import SIEMSelector from "@/components/SIEMSelector.vue";
import PipelineSelector from "@/components/PipelineSelector.vue";
import ConversionStrategyToggle from "@/components/ConversionStrategyToggle.vue";

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
import JSZip from 'jszip';
import { supportedSiems } from "@/types/SIEMs";

const workspace = useWorkspaceStore();
const fs = computed(() => workspace.currentWorkspace?.fileStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

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
    switch(siemId) {
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
  zip.generateAsync({ type: 'blob' })
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
  <header
    class="flex h-12 my-2 mb-1 shrink-0 items-center gap-1 md:gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
  >
    <div class="w-full flex items-center gap-1 md:gap-4 px-4">
      <SidebarTrigger class=""> </SidebarTrigger>
      <Separator class="!h-4" orientation="vertical" />
      <Breadcrumb v-if="false">
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbPage href="#"> Detection Studio </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div class="flex items-center gap-3">
        <SIEMSelector />
        <ConversionStrategyToggle />
        <Separator orientation="vertical" class="!h-6" />
        <PipelineSelector v-if="false"/>
      </div>
      <div class="grow"></div>
      <div class="flex items center gap-1 md:gap-2">
        <ShareButton />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                class="hidden h-8 md:flex gap-1 md:gap-2"
                size="sm"
                @click="exportFiles"
                :disabled="!fs?.files.length"
              >
                <Download class="h-3.5 w-3.5" />
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
  <div class="flex flex-col flex-1 gap-1 md:gap-4 p-3 md:p-4 pt-0 md:pt-0">
    <!-- Replace the grid with ResizablePanelGroup -->
    <Editor />

    <div class="min-h-[100px] rounded-xl bg-muted md:min-h-[100px] relative">
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
        class="h-full overflow-auto grid rounded-xl border border-border text-xs md:text-sm"
        language="splunk-spl"
      />
    </div>

    <Progress v-if="false" :model-value="33" class="h-4" />

    <DataView v-if="false" />
  </div>
</template>

<style>
#siem-query-editor .pce-line.active-line:after {
  content: none;
}
</style>
