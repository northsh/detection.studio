<template>
    <ScrollArea class="flex flex-col h-full">
        <div v-if="!currentRule" class="flex items-center justify-center h-full">
            <p>Select a rule to view its details</p>
        </div>

        <div v-else-if="isLoadingIndividualRule" class="flex flex-col h-full">
            <div class="border-b p-6 bg-card shadow-xs h-full">
                <!-- Skeleton title section -->
                <div class="flex items-start justify-between">
                    <Skeleton class="h-8 w-64"/>
                    <div class="flex gap-2">
                        <Skeleton class="h-5 w-20"/>
                    </div>
                </div>

                <!-- Skeleton logsource section -->
                <div class="mt-4 bg-muted/30 p-3 rounded-md border border-muted">
                    <div class="flex flex-wrap gap-3 items-center">
                        <Skeleton class="h-4 w-24"/>
                        <div class="flex flex-wrap gap-2">
                            <Skeleton class="h-6 w-32"/>
                            <Skeleton class="h-6 w-36"/>
                            <Skeleton class="h-6 w-28"/>
                        </div>
                    </div>
                </div>

                <!-- Skeleton description -->
                <Skeleton class="h-4 w-full mt-4"/>
                <Skeleton class="h-4 w-5/6 mt-2"/>
                <Skeleton class="h-4 w-4/6 mt-2 mb-6"/>

                <!-- Skeleton tags section -->
                <div class="mb-6">
                    <div class="flex flex-wrap gap-1.5">
                        <Skeleton class="h-5 w-16"/>
                        <Skeleton class="h-5 w-24"/>
                        <Skeleton class="h-5 w-20"/>
                        <Skeleton class="h-5 w-18"/>
                    </div>
                </div>

                <!-- Skeleton metadata section -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 border-t border-muted pt-4">
                    <div class="flex flex-col">
                        <Skeleton class="h-3 w-16 mb-2"/>
                        <Skeleton class="h-4 w-24"/>
                    </div>
                    <div class="flex flex-col">
                        <Skeleton class="h-3 w-16 mb-2"/>
                        <Skeleton class="h-4 w-20"/>
                    </div>
                    <div class="flex flex-col">
                        <Skeleton class="h-3 w-16 mb-2"/>
                        <Skeleton class="h-4 w-24"/>
                    </div>
                    <div class="flex flex-col">
                        <Skeleton class="h-3 w-16 mb-2"/>
                        <Skeleton class="h-4 w-32"/>
                    </div>
                </div>

                <!-- Skeleton references section -->
                <div class="mt-6 border-t border-gray-100 pt-4">
                    <Skeleton class="h-3 w-24 mb-3"/>
                    <div class="flex flex-col gap-2">
                        <Skeleton class="h-4 w-64"/>
                        <Skeleton class="h-4 w-72"/>
                    </div>
                </div>
            </div>

            <!-- Skeleton code editor -->
            <div class="grow flex flex-col h-full">
                <div class="px-6 py-3 bg-[#0D1116]  border-b border-gray-800">
                    <Skeleton class="h-4 w-32 bg-gray-700/20"/>
                </div>
                <div class="grow bg-[#0D1116] h-full p-4">
                    <Skeleton class="h-full w-full bg-gray-700/20"/>
                </div>
            </div>

            <div class="border-t p-4 flex justify-between bg-card">
                <Skeleton class="h-9 w-28"/>
                <Skeleton class="h-9 w-28"/>
            </div>
        </div>

        <template v-else>            
            <div class="border-b p-6 bg-card shadow-xs">
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
                            class="uppercase font-semibold text-[10px] tracking-wider"
                        >
                            {{ currentRule.status }}
                        </Badge>
                    </div>
                </div>

                <!-- Logsource section - styled prominently below title -->
                <div v-if="currentRule.logsource" class="py-2">
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
                <p class="text-muted-foreground mt-4 mb-6 leading-relaxed">{{ currentRule.description }}</p>

                <!-- Tags section - improved styling with modern look -->
                <div class="mb-6">
                    <div class="flex flex-wrap gap-1.5">
                        <Badge
                            v-for="tag in currentRule.tags"
                            :key="tag"
                            class=""
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
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="flex flex-col">
                        <span class="text-[10px] uppercase tracking-wider text-card-foreground mb-1">Author</span>
                        <span class="text-sm">{{ currentRule.author || 'Unknown' }}</span>
                    </div>
                    <div v-if="currentRule.date" class="flex flex-col">
                        <span class="text-[10px] uppercase tracking-wider text-card-foreground mb-1">Created</span>
                        <span class="text-sm">{{ formatDate(currentRule.date) }}</span>
                    </div>
                    <div v-if="currentRule.modified" class="flex flex-col">
                        <span class="text-[10px] uppercase tracking-wider text-card-foreground mb-1">Modified</span>
                        <span class="text-sm">{{ formatDate(currentRule.modified) }}</span>
                    </div>
                    <div v-if="currentRule.id" class="flex flex-col">
                        <span class="text-[10px] uppercase tracking-wider text-card-foreground mb-1">ID</span>
                        <span class="text-sm opacity-60 font-mono truncate">{{ currentRule.id }}</span>
                    </div>
                </div>

                <!-- References section - improved link styling -->
                <div v-if="currentRule.references && currentRule.references.length > 0"
                     class="mt-3 border-t border-secondary pt-4">
                    <span class="text-[10px] uppercase tracking-wider text-card-foreground mb-1 block">References</span>
                    <div class="flex flex-col gap-2">
                        <a
                            v-for="ref in currentRule.references"
                            :key="ref"
                            :href="ref"
                            class="text-sm text-primary hover:text-primary-foreground transition-colors hover:underline flex items-center gap-1 group"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <ExternalLink
                                class="h-3 w-3 mr-3 text-secondary-foreground opacity-70 group-hover:opacity-100"/>
                            {{ formatReferenceLink(ref) }}
                        </a>
                    </div>
                </div>
            </div>
            <!-- Add the buttons at the top -->
            <div class="border-b p-4 flex justify-between bg-card">
                <Button class="gap-1.5" variant="outline" @click="copyRule">
                    <Clipboard class="h-4 w-4"/>
                    Copy Rule
                </Button>
                <Button
                    :disabled="isImporting"
                    class="gap-1.5"
                    variant="default"
                    @click="importRule"
                >
                    <Download v-if="!isImporting" class="h-4 w-4"/>
                    <Loader2 v-else class="h-4 w-4"/>
                    {{ isImporting ? 'Importing...' : 'Import to Studio' }}
                </Button>
            </div>

            <!-- Rule Definition with code editor - full height and clean styling -->
            <div class="grow flex flex-col h-full">
                <div class="px-6 py-3 bg-[#0D1116]  border-b border-gray-800">
                    <span class="text-xs uppercase tracking-wider font-medium">YAML Definition</span>
                </div>
                <div class="grow bg-[#0D1116] h-full">
                    <PrismEditor
                        v-model="currentRuleContent"
                        :insert-spaces="true"
                        :line-numbers="true"
                        :read-only="true"
                        :word-wrap="true"
                        class="text-xs md:text-sm h-full w-full"
                        language="yaml"
                    />
                </div>
            </div>
        </template>
    </ScrollArea>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import {useSigmaRulesStore} from '../stores/SigmaBrowserStore.ts';
import {Badge} from './ui/badge';
import {Button} from './ui/button';
import {Skeleton} from './ui/skeleton';
import PrismEditor from './PrismEditor.vue';
import {toast} from 'vue-sonner';
import {Clipboard, Download, ExternalLink, Loader2} from "lucide-vue-next";
import {useRouter} from "vue-router";
import {ScrollArea} from "@/components/ui/scroll-area";


const router = useRouter()

const sigmaRulesStore = useSigmaRulesStore();
const isImporting = ref(false);

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
        toast('Rule copied to clipboard', {
            description: currentRule.value?.title || 'Sigma rule',
            duration: 3000,
        });
    } catch (err) {
        console.error('Failed to copy rule to clipboard:', err);
        toast.error('Failed to copy rule', {
            description: 'Could not access clipboard',
        });
    }
}

// Import the rule into the editor
async function importRule() {
    if (!currentRule.value || !currentRuleContent.value) {
        toast.error('Import failed', {
            description: 'No rule selected or rule content is empty',
        });
        return;
    }

    isImporting.value = true;

    try {
        // Import functionality using the router and workspace store
        const {useWorkspaceStore} = await import('@/stores/WorkspaceStore');


        const workspaceStore = useWorkspaceStore();


        // Get the current workspace's file store
        const fileStore = workspaceStore.currentWorkspace?.fileStore();

        if (!fileStore) {
            console.error('File store not available');
            toast.error('Import failed', {
                description: 'File store not available',
            });
            return;
        }

        // Check if we have a rule title or ID
        if (!currentRule.value.title && !currentRule.value.id) {
            console.warn('Rule missing title and ID');
        }

        // Prepare file name - use rule title or ID, sanitize it for file system
        let fileName = currentRule.value.title || currentRule.value.id || 'imported_rule';
        fileName = fileName
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special chars
            .replace(/\s+/g, '_'); // Replace spaces with underscores

        // Make sure we have content to import
        if (!currentRuleContent.value.trim()) {
            throw new Error('Rule content is empty');
        }

        // Check for duplicate rule based on ID if available
        let duplicateFile = null;
        if (currentRule.value.id) {
            // Look for rules with the same ID in YAML content
            duplicateFile = fileStore.files.find(file =>
                file.type === 'sigma' &&
                file.content.includes(`id: ${currentRule.value.id}`)
            );
        }

        // If we found a duplicate, ask before replacing or open the existing one
        if (duplicateFile) {
            // Open the existing file instead of importing a duplicate
            fileStore.openFile(duplicateFile.id);

            // Show a notification that we found an existing rule
            toast.info('Rule already exists', {
                description: `"${currentRule.value.title || 'Sigma rule'}" is already in your workspace`,
                action: {
                    label: 'Viewing',
                    onClick: () => {
                    },
                },
            });

            // Navigate to the studio view
            router.push({name: 'studio',});
            return;
        }

        // Add the rule to the file store (if no duplicate was found)
        const fileId = fileStore.addFile({
            name: fileName,
            content: currentRuleContent.value,
            type: 'sigma',
        });

        // Navigate to the studio view if we're not already there
        router.push({name: 'studio',});

        // Set this rule as the active file in the file store
        fileStore.openFile(fileId);

        // Show success toast with rule details
        toast.success('Rule imported to Studio', {
            description: `"${currentRule.value.title || 'Sigma rule'}" is now available in your workspace`,
            action: {
                label: 'Dismiss',
                onClick: () => {
                },
            },
        });

        console.log('Rule imported successfully:', fileName);
    } catch (err) {
        console.error('Failed to import rule:', err);
        toast.error('Import failed', {
            description: err instanceof Error ? err.message : 'An unknown error occurred',
        });
    } finally {
        isImporting.value = false;
    }
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
