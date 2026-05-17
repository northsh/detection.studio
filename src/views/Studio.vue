<script lang="ts" setup>
import {Separator} from "@/components/ui/separator";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import Editor from "@/components/Editor.vue";
import {Github, MoreVertical, Share, Download, PlusIcon} from "lucide-vue-next";
import {useWorkspaceStore} from "@/stores/WorkspaceStore.ts";
import {computed} from "vue";
import ShareButton from "@/components/ShareWorkspaceButton.vue";
import DataView from "@/components/DataView.vue";
import SIEMSelector from "@/components/SIEMSelector.vue";
import PipelineSelector from "@/components/PipelineSelector.vue";
import {useFileDialog} from '@vueuse/core';
import {useOverflowItems} from "@/composables/useOverflowItems";
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
import {ref} from 'vue';
import {Badge} from "@/components/ui/badge";

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

const hasData = computed(() => !!workspaceStore.currentWorkspace?.dataStore()?.current_data_frame);

// File dialog for the upload-sample-data button (shown when no data is loaded)
const { open: openDataUpload, onChange: onDataFileChange } = useFileDialog({
    accept: 'application/json,.ndjson,.jsonl',
    directory: false,
});

onDataFileChange(async (files: FileList | null) => {
    if (!files?.length) return;
    const ds = workspaceStore.currentWorkspace?.dataStore();
    if (ds) {
        ds.current_data_frame = await files[0].text();
    }
});

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

// Import workspace from URL
const importDialogOpen = ref(false);
const importUrl = ref('');
const importError = ref('');

function openImportDialog() {
    importUrl.value = '';
    importError.value = '';
    importDialogOpen.value = true;
}

function handleImport() {
    importError.value = '';
    const raw = importUrl.value.trim();
    if (!raw) {
        importError.value = 'Please enter a share URL.';
        return;
    }

    try {
        // Accept a full URL with a hash, or just the raw base64url hash
        let hash = raw;
        if (raw.includes('#')) {
            hash = raw.split('#')[1];
        }

        if (!hash) {
            importError.value = 'Could not find a workspace hash in the provided URL.';
            return;
        }

        const workspace = shareStore.reconstructFromUrl(hash);

        // Handle duplicate names
        const existingName = workspaceStore.availableWorkspaces.some(
            (w) => w.name.replace(' (Imported)', '') === workspace.name.replace(' (Imported)', ''),
        );

        if (existingName) {
            const baseNameMatch = workspace.name.match(/(.*?)( \(\d+\))?( \(Imported\))?$/);
            const baseName = baseNameMatch ? baseNameMatch[1] : workspace.name;
            let counter = 1;
            let newName = `${baseName} (${counter})`;
            while (workspaceStore.availableWorkspaces.some((w) => w.name.replace(' (Imported)', '') === newName)) {
                counter++;
                newName = `${baseName} (${counter})`;
            }
            workspace.name = `${newName} (Imported)`;
        }

        workspaceStore.availableWorkspaces.push(workspace);
        workspaceStore.setCurrentWorkspace(workspace);
        importDialogOpen.value = false;
    } catch (e) {
        importError.value = 'Invalid workspace URL. Make sure you paste the full share link.';
    }
}

// Export functionality — delegated to ExportButton component
const exportButtonRef = ref<InstanceType<typeof ExportButton> | null>(null);
const fs = computed(() => workspaceStore.currentWorkspace?.fileStore());

function exportFiles() {
    exportButtonRef.value?.exportFiles();
}

// Header overflow.
// containerRef on the full row (no overflow-hidden) so ResizeObserver sees the real width.
// reservedWidth: SidebarTrigger 28px + Separator 1px + 2 gaps at 8px + grow spacer 0px
//   + overflow button 32px is handled by overflowButtonWidth separately.
// Items are split into left (siem, pipeline) and right (github, share, export) for rendering,
// but the composable treats them as a single flat list sorted by priority.
type HeaderItem = { id: string; priority: number };
const headerItems: HeaderItem[] = [
    { id: 'siem',     priority: 50 },
    { id: 'pipeline', priority: 20 },
    { id: 'github',   priority: 10 },
    { id: 'share',    priority: 40 },
    { id: 'export',   priority: 30 },
];

const {
    containerRef: headerRowRef,
    measurementRef: headerMeasureRef,
    setItemRef: setHeaderItemRef,
    visibleItems: visibleHeaderItems,
    overflowItems: overflowHeaderItems,
    hasOverflow: hasHeaderOverflow,
// overflowButtonWidth: 32px (⋮ button) + 8px gap = 40 handled internally
// reservedWidth: 0 — containerRef sits on the flex-1 zone that IS the available space
} = useOverflowItems(headerItems, { gap: 8, overflowButtonWidth: 32, reservedWidth: 0 });

const leftIds  = new Set(['siem', 'pipeline']);
const rightIds = new Set(['github', 'share', 'export']);
const visibleLeft  = computed(() => visibleHeaderItems.value.filter(i => leftIds.has(i.id)));
const visibleRight = computed(() => visibleHeaderItems.value.filter(i => rightIds.has(i.id)));
</script>

<template>
  <div class="flex flex-col h-screen w-full max-w-full overflow-hidden">
    <!-- Header -->
    <header class="flex h-14 shrink-0 items-center">
      <!-- Outer row: fixed anchors + flex-1 overflow zone + fixed ⋮ button -->
      <div class="w-full flex items-center gap-2 px-4">

        <!-- Fixed anchors — not part of overflow measurement -->
        <SidebarTrigger class="shrink-0" />
        <Separator class="h-4! shrink-0" orientation="vertical" />

        <!-- Overflow zone — containerRef here gets the true available width -->
        <div ref="headerRowRef" class="flex-1 flex items-center gap-2 min-w-0 relative">

          <!-- Hidden measurement layer -->
          <div ref="headerMeasureRef" class="absolute invisible flex items-center gap-2 pointer-events-none" aria-hidden="true">
            <div :ref="el => setHeaderItemRef('siem', el as HTMLElement | null)"><SIEMSelector /></div>
            <div :ref="el => setHeaderItemRef('pipeline', el as HTMLElement | null)"><PipelineSelector /></div>
            <div :ref="el => setHeaderItemRef('github', el as HTMLElement | null)">
              <Button size="sm" variant="ghost"><Github class="h-4 w-4 text-primary" />GitHub</Button>
            </div>
            <div :ref="el => setHeaderItemRef('share', el as HTMLElement | null)"><ShareButton /></div>
            <div :ref="el => setHeaderItemRef('export', el as HTMLElement | null)"><ExportButton /></div>
          </div>

          <!-- Left group: selectors, start-aligned -->
          <template v-for="item in visibleLeft" :key="item.id">
            <SIEMSelector v-if="item.id === 'siem'" />
            <PipelineSelector v-else-if="item.id === 'pipeline'" />
          </template>

          <!-- Spacer -->
          <div class="grow" />

          <!-- Right group: actions, end-aligned -->
          <template v-for="item in visibleRight" :key="item.id">
            <a v-if="item.id === 'github'" href="https://github.com/northsh/detection.studio/" target="_blank">
              <Button size="sm" variant="ghost"><Github class="h-4 w-4 text-primary" />GitHub</Button>
            </a>
            <ShareButton v-else-if="item.id === 'share'" />
            <ExportButton v-else-if="item.id === 'export'" ref="exportButtonRef" />
          </template>

        </div><!-- end overflow zone -->

        <!-- Overflow dropdown — fixed outside the zone so it doesn't affect measurement -->
        <DropdownMenu v-if="hasHeaderOverflow">
          <DropdownMenuTrigger as-child>
            <Button size="sm" variant="ghost" class="h-8 w-8 p-0 shrink-0">
              <MoreVertical class="h-4 w-4" />
              <span class="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="min-w-72">
            <!-- Pipeline renders as an inline selector, not a flat menu item -->
            <div
              v-if="overflowHeaderItems.some(i => i.id === 'pipeline')"
              class="px-2 py-1.5"
            >
              <p class="text-xs text-muted-foreground mb-1.5 px-1">Pipeline</p>
              <PipelineSelector :fluid="true" />
            </div>
            <DropdownMenuItem
              v-if="overflowHeaderItems.some(i => i.id === 'github')"
              as-child
            >
              <a
                href="https://github.com/northsh/detection.studio/"
                target="_blank"
                class="flex items-center gap-2 cursor-pointer"
              >
                <Github class="h-4 w-4" />
                GitHub
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem
              v-if="overflowHeaderItems.some(i => i.id === 'share')"
              @click="openShareDialog"
              class="flex items-center gap-2 cursor-pointer"
            >
              <Share class="h-4 w-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem
              v-if="overflowHeaderItems.some(i => i.id === 'export')"
              @click="exportFiles"
              :disabled="!fs?.files.length"
              class="flex items-center gap-2 cursor-pointer"
            >
              <Download class="h-4 w-4" />
              Export
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>

    <!-- Main Content - Flexbox layout with three sections -->
    <div
      class="flex flex-col flex-1 h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] min-h-0 w-full overflow-hidden"
    >
      <!-- Use ResizablePanelGroup for vertical layout -->
          <ResizablePanelGroup auto-save-id="studio-bottom" class="h-full min-h-0 w-full" direction="vertical">
        <!-- Editor Panel - Takes ~60% of the space -->
        <ResizablePanel :default-size="70" :min-size="20" class="p-1 min-h-0 flex flex-col">
          <div class="h-full w-full overflow-hidden flex flex-col">
            <Editor />
          </div>
        </ResizablePanel>

        <!-- Resize Handle -->
        <ResizableHandle with-handle />

        <!-- Bottom Section - Takes ~40% of the space -->
        <ResizablePanel :default-size="30" :min-size="10" class="p-1 min-h-0 flex flex-col">
          <!-- Nested ResizablePanelGroup for the bottom section -->
      <ResizablePanelGroup auto-save-id="studio-main" class="h-full min-h-0 w-full" direction="vertical">
            <!-- SIEM Query Output - Compact - Takes only 35% -->
            <ResizablePanel
              :default-size="35"
              :max-size="50"
              :min-size="15"
              class="min-h-0 flex flex-col"
            >
              <SiemOutputQuery class="border" />
            </ResizablePanel>

            <!-- Resize Handle + DataView panel: only when data is loaded -->
            <template v-if="hasData">
              <ResizableHandle with-handle class="my-1" />
              <ResizablePanel
                :default-size="30"
                :min-size="10"
                class="min-h-0 flex flex-col"
              >
                <DataView class="h-full w-full border" />
              </ResizablePanel>
            </template>

            <!-- Upload button: when no data is loaded -->
            <button
              v-else
              class="mx-1 mb-1 mt-1 h-12 w-full rounded-lg bg-gradient-to-t from-muted to-muted/60 border border-muted-foreground/10 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:from-muted hover:to-muted/40 transition-colors cursor-pointer"
              @click="openDataUpload()"
            >
              <PlusIcon class="h-3.5 w-3.5" />
              Upload Sample Data
              <Badge variant="default">New</Badge>
            </button>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>

    <!-- Mobile View Sheet for small viewports -->
    <Sheet v-if="false" side="bottom">
      <SheetTrigger as-child>
        <Button class="md:hidden fixed bottom-4 right-4 z-50" variant="outline">
          View Sample Data
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>SIEM Sample Data</SheetTitle>
          <SheetDescription> Examine sample data to test your SIEM queries </SheetDescription>
        </SheetHeader>
        <div class="py-4">
          <DataView />
        </div>
        <SheetFooter>
          <SheetClose as-child>
            <Button type="button"> Close </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>

    <!-- Import Workspace Dialog -->
    <Dialog v-model:open="importDialogOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import workspace</DialogTitle>
          <DialogDescription>
            Paste a detection.studio share URL to import a workspace into your session.
          </DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-1.5">
            <Label for="import-url">Share URL</Label>
            <Input
              id="import-url"
              v-model="importUrl"
              placeholder="https://detection.studio/#..."
              @keydown.enter="handleImport"
            />
            <p v-if="importError" class="text-xs text-destructive">{{ importError }}</p>
          </div>
          <Button class="w-full" @click="handleImport">
            Import workspace
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Share Dialog for mobile dropdown -->
    <Dialog v-model:open="shareDialogOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Share workspace </DialogTitle>
          <DialogDescription>
            Share your detection.studio workspace with others by sending them the link below.
          </DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-2">
          <Label for="share-url"> Shareable URL </Label>
          <Input id="share-url" :model-value="shareUrl" class="col-span-3" disabled />
          <Button
            v-if="isSupported"
            class="w-full"
            type="submit"
            variant="outline"
            @click="handleShare"
          >
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
