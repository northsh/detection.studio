<template>
    <div class="flex flex-col h-full overflow-hidden">
        <div v-if="!currentRule" class="flex items-center justify-center h-full text-gray-500">
            <p>Select a rule to view its details</p>
        </div>

        <div v-else-if="isLoadingIndividualRule" class="flex items-center justify-center h-full">
            <div class="flex flex-col items-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p class="mt-2">Loading rule content...</p>
            </div>
        </div>

        <template v-else>
            <div class="border-b p-6 bg-card shadow-sm h-full">
                <!-- Title section with level and status badges -->
                <div class="flex items-start justify-between">
                    <h2 class="text-2xl font-bold">{{ currentRule.title }}</h2>
                    <div class="flex gap-2">
                        <Badge
                            v-if="currentRule.level"
                            :class="getLevelBadgeClass(currentRule.level)"
                            class="uppercase font-semibold text-[10px] tracking-wider"
                        >
                            {{ currentRule.level }}
                        </Badge>
                        <Badge
                            v-if="currentRule.status"
                            class="uppercase font-semibold text-[10px] tracking-wider bg-gray-200 text-gray-800 hover:bg-gray-200"
                        >
                            {{ currentRule.status }}
                        </Badge>
                    </div>
                </div>

                <!-- Logsource section - styled prominently below title -->
                <div v-if="currentRule.logsource" class="mt-4 bg-muted/30 p-3 rounded-md border border-muted">
                    <div class="flex flex-wrap gap-3 items-center">
                        <span class="uppercase text-xs font-semibold text-gray-500 tracking-wider">Logsource</span>
                        <div class="flex flex-wrap gap-2">
                            <Badge v-if="currentRule.logsource.product" class="px-3 py-0.5" variant="secondary">
                                <span class="font-semibold">Product:</span> {{ currentRule.logsource.product }}
                            </Badge>
                            <Badge v-if="currentRule.logsource.category" class="px-3 py-0.5" variant="secondary">
                                <span class="font-semibold">Category:</span> {{ currentRule.logsource.category }}
                            </Badge>
                            <Badge v-if="currentRule.logsource.service" class="px-3 py-0.5" variant="secondary">
                                <span class="font-semibold">Service:</span> {{ currentRule.logsource.service }}
                            </Badge>
                        </div>
                    </div>
                </div>

                <!-- Description - more space and better typography -->
                <p class="text-gray-700 mt-4 mb-6 leading-relaxed">{{ currentRule.description }}</p>

                <!-- Tags section - improved styling with modern look -->
                <div class="mb-6">
                    <div class="flex flex-wrap gap-1.5">
                        <Badge
                            v-for="tag in currentRule.tags"
                            :key="tag"
                            class="text-xs px-2 py-0 border-gray-300 text-gray-700 hover:bg-gray-100"
                            variant="outline"
                        >
                            {{ tag }}
                        </Badge>
                        <span v-if="!currentRule.tags || currentRule.tags.length === 0" class="text-sm text-gray-500">
              No tags
            </span>
                    </div>
                </div>

                <!-- Metadata section - redesigned with better visual hierarchy -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 border-t border-gray-100 pt-4">
                    <div class="flex flex-col">
                        <span class="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Author</span>
                        <span class="text-xs">{{ currentRule.author || 'Unknown' }}</span>
                    </div>
                    <div v-if="currentRule.date" class="flex flex-col">
                        <span class="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Created</span>
                        <span class="text-xs">{{ formatDate(currentRule.date) }}</span>
                    </div>
                    <div v-if="currentRule.modified" class="flex flex-col">
                        <span class="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Modified</span>
                        <span class="text-xs">{{ formatDate(currentRule.modified) }}</span>
                    </div>
                    <div v-if="currentRule.id" class="flex flex-col">
                        <span class="text-[10px] uppercase tracking-wider text-gray-400 mb-1">ID</span>
                        <span class="text-xs opacity-60 font-mono truncate">{{ currentRule.id }}</span>
                    </div>
                </div>

                <!-- References section - improved link styling -->
                <div v-if="currentRule.references && currentRule.references.length > 0"
                     class="mt-6 border-t border-gray-100 pt-4">
                    <span class="text-[10px] uppercase tracking-wider text-gray-400 mb-2 block">References</span>
                    <div class="flex flex-col gap-2">
                        <a
                            v-for="ref in currentRule.references"
                            :key="ref"
                            :href="ref"
                            class="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 group"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <span class="i-lucide-external-link text-[10px] opacity-70 group-hover:opacity-100"></span>
                            {{ formatReferenceLink(ref) }}
                        </a>
                    </div>
                </div>
            </div>

            <!-- Rule Definition with code editor - full height and clean styling -->
            <div class="flex-grow flex flex-col h-full">
                <div class="px-6 py-3 bg-[#0D1116] text-gray-300 border-b border-gray-800">
                    <span class="text-xs uppercase tracking-wider font-medium">YAML Definition</span>
                </div>
                <div class="flex-grow bg-[#0D1116] h-full">
                    <ScrollArea class=" pb-[400px] h-full w-full">
                        <PrismEditor
                            v-model="currentRuleContent"
                            :insert-spaces="true"
                            :line-numbers="true"
                            :read-only="true"
                            :word-wrap="true"
                            class="text-xs md:text-sm h-full w-full"
                            language="yaml"
                        />
                    </ScrollArea>
                </div>
            </div>

            <div class="border-t p-4 flex justify-between bg-card">
                <Button class="gap-1.5" variant="outline" @click="copyRule">
                    <i class="i-lucide-clipboard text-base"></i>
                    Copy Rule
                </Button>
                <Button class="gap-1.5" variant="default" @click="importRule">
                    <i class="i-lucide-download text-base"></i>
                    Import
                </Button>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useSigmaRulesStore} from '../stores/SigmaBrowserStore.ts';
import {ScrollArea} from './ui/scroll-area';
import {Badge} from './ui/badge';
import {Button} from './ui/button';
import PrismEditor from './PrismEditor.vue';

const sigmaRulesStore = useSigmaRulesStore();

const currentRule = computed(() => sigmaRulesStore.currentRule);
const currentRuleContent = computed(() => sigmaRulesStore.currentRuleContent);
const isLoadingIndividualRule = computed(() => sigmaRulesStore.isLoadingIndividualRule);

// Format date if it exists
function formatDate(dateString?: string): string {
    if (!dateString) return 'Not specified';

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        return dateString;
    }
}

// Format reference links to show a more user-friendly version
function formatReferenceLink(url: string): string {
    try {
        // Extract domain and path for cleaner display
        const urlObj = new URL(url);
        const domain = urlObj.hostname.replace('www.', '');
        const path = urlObj.pathname.slice(0, 30);
        return `${domain}${path}${path.length > 29 ? '...' : ''}`;
    } catch (e) {
        // If URL parsing fails, just return the original URL
        return url;
    }
}

// Copy rule content to clipboard
async function copyRule() {
    if (!currentRuleContent.value) return;

    try {
        await navigator.clipboard.writeText(currentRuleContent.value);
    } catch (err) {
        console.error('Failed to copy rule to clipboard:', err);
    }
}

// Import the rule into the editor
function importRule() {
    // This functionality would need to be implemented based on
    // how your application handles importing Sigma rules
    console.log('Import rule:', currentRule.value);
}

// Get level color class for the indicator dot
function getLevelColorClass(level: string): string {
    const lowerLevel = level.toLowerCase();

    if (lowerLevel === 'critical') return 'bg-red-600';
    if (lowerLevel === 'high') return 'bg-red-500';
    if (lowerLevel === 'medium') return 'bg-amber-500';
    if (lowerLevel === 'low') return 'bg-blue-400';
    if (lowerLevel === 'informational') return 'bg-green-400';

    return 'bg-gray-400';
}

// Get badge class based on rule level for the badge styling
function getLevelBadgeClass(level: string): string {
    const lowerLevel = level.toLowerCase();

    if (lowerLevel === 'critical') return 'bg-red-600 hover:bg-red-700';
    if (lowerLevel === 'high') return 'bg-red-500 hover:bg-red-600';
    if (lowerLevel === 'medium') return 'bg-amber-500 hover:bg-amber-600';
    if (lowerLevel === 'low') return 'bg-blue-500 hover:bg-blue-600';
    if (lowerLevel === 'informational') return 'bg-green-500 hover:bg-green-600';

    return 'bg-gray-500 hover:bg-gray-600';
}

// Get badge variant based on rule level - kept for compatibility
function getBadgeVariant(level: string) {
    const lowerLevel = level.toLowerCase();

    if (lowerLevel === 'critical') return 'destructive';
    if (lowerLevel === 'high') return 'destructive';
    if (lowerLevel === 'medium') return 'warning';
    if (lowerLevel === 'low') return 'secondary';
    if (lowerLevel === 'informational') return 'default';

    return 'outline';
}
</script>

<style>
.prism-editor-ref {
    width: 100%;
    height: 100%;
    min-height: 300px;
}

/* Ensure YAML content fills the available height */
.flex-grow.bg-\[\#0D1116\] {
    display: flex;
    flex-direction: column;
}

.flex-grow.bg-\[\#0D1116\] .prism-editor-ref {
    flex: 1;
}

/* Add hover effect for logsource badges */
.bg-muted\/30 .badge:hover {
    transform: translateY(-1px);
    transition: transform 0.2s ease;
}

/* Style for icons (ensure you have the right icon library) */
.i-lucide-external-link,
.i-lucide-clipboard,
.i-lucide-download {
    display: inline-block;
    width: 1em;
    height: 1em;
    background-size: cover;
    vertical-align: middle;
}

.i-lucide-external-link {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'/%3E%3Cpolyline points='15 3 21 3 21 9'/%3E%3Cline x1='10' y1='14' x2='21' y2='3'/%3E%3C/svg%3E");
}

.i-lucide-clipboard {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/%3E%3Crect x='8' y='2' width='8' height='4' rx='1' ry='1'/%3E%3C/svg%3E");
}

.i-lucide-download {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/%3E%3Cpolyline points='7 10 12 15 17 10'/%3E%3Cline x1='12' y1='15' x2='12' y2='3'/%3E%3C/svg%3E");
}
</style>