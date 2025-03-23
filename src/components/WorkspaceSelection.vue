<script lang="ts" setup>
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {SidebarMenuButton,} from "@/components/ui/sidebar";
import {ChevronsUpDown, Edit2, Layers2, Plus, Trash2,} from "lucide-vue-next";
import {computed, ref} from "vue";
import {useWorkspaceStore} from "@/stores/WorkspaceStore.ts";
import {supportedSiems} from "@/types/SIEMs.ts";

import splunk_svg from '@/images/splunk.svg?component';
import loki_svg from '@/images/grafana.svg?component';
import elasticsearch_svg from '@/images/elasticsearch.svg?component';

/**
 * Sidebar
 */

const workStore = useWorkspaceStore();
const sigma = computed(() => workStore.currentWorkspace?.sigmaStore());
const fs = computed(() => workStore.currentWorkspace?.fileStore());

function createWorkspace() {
    workStore.newWorkspace('New Workspace', 'Free');
}

// State for rename operation
const isRenaming = ref(false);
const workspaceToRename = ref('');
const newWorkspaceName = ref('');

// Start rename operation
function startRename(workspace) {
    workspaceToRename.value = workspace.id;
    newWorkspaceName.value = workspace.name;
    isRenaming.value = true;
}

// Confirm rename operation
function confirmRename() {
    if (newWorkspaceName.value.trim() && workspaceToRename.value) {
        workStore.renameWorkspace(workspaceToRename.value, newWorkspaceName.value.trim());
        cancelRename();
    }
}

// Cancel rename operation
function cancelRename() {
    isRenaming.value = false;
    workspaceToRename.value = '';
    newWorkspaceName.value = '';
}

// Delete workspace
function deleteWorkspace(workspaceId) {
    workStore.deleteWorkspace(workspaceId);
}

</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <SidebarMenuButton
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                size="lg">
                <div
                    class="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground">

                    <component
                        :is="splunk_svg"
                        v-if="workStore.currentWorkspace.sigmaStore().selected_siem === 'splunk'"
                        class="w-4 h-4 shrink-0"/>
                    <component
                        :is="elasticsearch_svg"
                        v-else-if="
                                    workStore.currentWorkspace.sigmaStore().selected_siem === 'es|ql'
                                    || workStore.currentWorkspace.sigmaStore().selected_siem === 'eql'
                                    || workStore.currentWorkspace.sigmaStore().selected_siem === 'lucene'
                                "
                        class="w-4 h-4 shrink-0"/>
                    <component
                        :is="loki_svg"
                        v-else-if="workStore.currentWorkspace.sigmaStore().selected_siem === 'loki'"
                        class="w-4 h-4 shrink-0"/>
                    <Layers2 v-else class="h-4 shrink-0"/>
                </div>
                <div class="grid text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ workStore.currentWorkspace?.name }}</span>
                    <span class="truncate text-xs">{{
                            supportedSiems.find((s) => s.id === sigma.selected_siem)?.name ?? ''
                        }}</span>
                </div>
                <ChevronsUpDown class="ml-auto"/>
            </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent :side-offset="4" align="start"
                             class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                             side="bottom">
            <DropdownMenuLabel class="text-xs text-muted-foreground">
                Workspaces
            </DropdownMenuLabel>
            <DropdownMenuItem v-for="(workspace, index) in workStore.availableWorkspaces" :key="workspace.name"
                              class="gap-2 p-2"
                              @click.stop="isRenaming && workspaceToRename === workspace.id ? null : workStore.setCurrentWorkspace(workspace)">
                <!-- When not renaming this workspace -->
                <div v-if="!(isRenaming && workspaceToRename === workspace.id)"
                     class="flex w-full items-center justify-between">
                    <div class="flex items-center gap-2 cursor-pointer">
                        <div class="flex size-6 items-center justify-center rounded-sm border">
                            <component
                                :is="splunk_svg"
                                v-if="workspace.sigmaStore().selected_siem === 'splunk'"
                                class="w-4 h-4 shrink-0"/>
                            <component
                                :is="elasticsearch_svg"
                                v-else-if="
                                    workspace.sigmaStore().selected_siem === 'es|ql'
                                    || workspace.sigmaStore().selected_siem === 'eql'
                                    || workspace.sigmaStore().selected_siem === 'lucene'
                                "
                                class="w-4 h-4 shrink-0"/>
                            <component
                                :is="loki_svg"
                                v-else-if="workspace.sigmaStore().selected_siem === 'loki'"
                                class="w-4 h-4 shrink-0"/>
                            <Layers2 v-else class="h-4 shrink-0"/>
                        </div>
                        <span>{{ workspace.name }}</span>
                    </div>

                    <!-- Actions only appear for the active workspace -->
                    <div v-if="workStore.currentWorkspaceID === workspace.id"
                         class="flex items-center gap-1 ml-2">
                        <!-- Edit button -->
                        <button class="rounded p-1 hover:bg-muted"
                                @click.stop="startRename(workspace)">
                            <Edit2 class="h-4 w-4 text-muted-foreground"/>
                        </button>

                        <!-- Delete button (disabled if it's the only workspace) -->
                        <button :class="{'opacity-40': workStore.availableWorkspaces.length <= 1}"
                                :disabled="workStore.availableWorkspaces.length <= 1"
                                class="rounded p-1 hover:bg-muted"
                                @click.stop="deleteWorkspace(workspace.id)">
                            <Trash2 class="h-4 w-4 text-destructive"/>
                        </button>
                    </div>
                </div>

                <!-- Rename form -->
                <div v-else class="flex w-full items-center gap-2" @click.stop>
                    <div class="flex size-6 items-center justify-center rounded-sm border">
                        <Layers2 class="h-4 shrink-0"/>
                    </div>
                    <input
                        ref="renameInput"
                        v-model="newWorkspaceName"
                        autofocus
                        class="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        placeholder="Workspace name"
                        @keydown.enter="confirmRename"
                        @keydown.escape="cancelRename"
                        @click.stop
                    />
                    <div class="flex items-center gap-1">
                        <button class="rounded p-1 hover:bg-muted"
                                @click.stop="confirmRename">
                            <div class="text-xs">✓</div>
                        </button>
                        <button class="rounded p-1 hover:bg-muted"
                                @click.stop="cancelRename">
                            <div class="text-xs">✕</div>
                        </button>
                    </div>
                </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem class="gap-2 p-2" @click="createWorkspace">
                <div
                    class="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus class="size-4"/>
                </div>
                <div class="font-medium text-muted-foreground">
                    New Workspace
                </div>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>