<script lang="ts" setup>
import {Button} from "@/components/ui/button";
import {Download} from "lucide-vue-next";
import {useWorkspaceStore} from "@/stores/WorkspaceStore.ts";
import {computed} from "vue";

import JSZip from 'jszip';
import {supportedSiems} from "@/types/SIEMs.ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";


/**
 * Stores
 */
const workspace = useWorkspaceStore();
const fs = computed(() => workspace.currentWorkspace?.fileStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

// Use VueUse's useWindowSize for responsive behavior

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
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Button
          :disabled="!fs?.files.length"
          class="hidden h-8 md:flex gap-1 md:gap-2"
          size="sm"
          variant="secondary"
          @click="exportFiles"
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
</template>
