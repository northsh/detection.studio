<script lang="ts" setup>
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import {SidebarMenuButton,} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ChevronsUpDown, Edit2, Layers2, Plus, Trash2,} from "lucide-vue-next";
import {computed, nextTick, ref} from "vue";
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
const isRenameDialogOpen = ref(false);
const workspaceToRename = ref('');
const newWorkspaceName = ref('');

// State for delete operation
const isDeleteDialogOpen = ref(false);
const workspaceToDelete = ref('');
const workspaceNameToDelete = ref('');

// Start rename operation
function startRename(workspace) {
    workspaceToRename.value = workspace.id;
    newWorkspaceName.value = workspace.name;
    isRenameDialogOpen.value = true;
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
    isRenameDialogOpen.value = false;
    workspaceToRename.value = '';
    newWorkspaceName.value = '';
}

// Start delete operation
function startDelete(workspace) {
    workspaceToDelete.value = workspace.id;
    workspaceNameToDelete.value = workspace.name;
    isDeleteDialogOpen.value = true;
}

// Confirm delete operation
function confirmDelete() {
    if (workspaceToDelete.value) {
        workStore.deleteWorkspace(workspaceToDelete.value);
        cancelDelete();
    }
}

// Cancel delete operation
function cancelDelete() {
    isDeleteDialogOpen.value = false;
    workspaceToDelete.value = '';
    workspaceNameToDelete.value = '';
}

// Handle input keydown
function handleKeydown(e) {
    if (e.key === 'Enter') {
        confirmRename();
    }
}
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <SidebarMenuButton
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                size="lg"
            >
                <div
                    class="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground border-2 border-primary"
                >
                    <component
                        :is="supportedSiems.find((s) => s.id === workStore.currentWorkspace.sigmaStore().selected_siem)?.icon"
                        v-if="supportedSiems.find((s) => s.id === workStore.currentWorkspace.sigmaStore().selected_siem)?.icon"
                        class="w-4 h-4 shrink-0 "
                    />
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
        <DropdownMenuContent
            :side-offset="4"
            align="start"
            class="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
        >
            <DropdownMenuLabel class="text-xs text-muted-foreground"> Workspaces</DropdownMenuLabel>
            <DropdownMenuItem
                v-for="(workspace, index) in workStore.availableWorkspaces"
                :key="workspace.name"
                class="gap-2 p-2"
                @click.stop="workStore.setCurrentWorkspace(workspace)"
            >
                <div class="flex w-full items-center justify-between">
                    <div class="flex items-center gap-2 cursor-pointer">
                        <div class="flex size-6 items-center justify-center rounded-sm border">
                            <component
                                :is="splunk_svg"
                                v-if="workspace.sigmaStore().selected_siem === 'splunk'"
                                class="w-4 h-4 shrink-0"
                            />
                            <component
                                :is="elasticsearch_svg"
                                v-else-if="
                                    workspace.sigmaStore().selected_siem === 'es|ql'
                                    || workspace.sigmaStore().selected_siem === 'eql'
                                    || workspace.sigmaStore().selected_siem === 'lucene'
                                "
                                class="w-4 h-4 shrink-0"
                            />
                            <component
                                :is="loki_svg"
                                v-else-if="workspace.sigmaStore().selected_siem === 'loki'"
                                class="w-4 h-4 shrink-0"
                            />
                            <Layers2 v-else class="h-4 shrink-0"/>
                        </div>
                        <span>{{ workspace.name }}</span>
                    </div>

                    <!-- Actions only appear for the active workspace -->
                    <div
                        v-if="workStore.currentWorkspaceID === workspace.id"
                        class="flex items-center gap-1 ml-2"
                    >
                        <!-- Edit button -->
                        <button class="rounded p-1 hover:bg-muted" @click.stop="startRename(workspace)">
                            <Edit2 class="h-4 w-4 text-muted-foreground"/>
                        </button>

                        <!-- Delete button (disabled if it's the only workspace) -->
                        <button
                            :class="{'opacity-40': workStore.availableWorkspaces.length <= 1}"
                            :disabled="workStore.availableWorkspaces.length <= 1"
                            class="rounded p-1 hover:bg-muted"
                            @click.stop="startDelete(workspace)"
                        >
                            <Trash2 class="h-4 w-4 text-destructive"/>
                        </button>
                    </div>
                </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem class="gap-2 p-2" @click="createWorkspace">
                <div class="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus class="size-4"/>
                </div>
                <div class="font-medium text-muted-foreground">New Workspace</div>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

    <!-- Rename Dialog -->
    <Dialog :open="isRenameDialogOpen" @update:open="isRenameDialogOpen = $event">
        <DialogContent class="sm:max-w-md">
            <DialogTitle>Rename Workspace</DialogTitle>
            <div class="mt-4">
                <Input
                    v-model="newWorkspaceName"
                    autofocus
                    class="w-full"
                    placeholder="Workspace name"
                    @keydown="handleKeydown"
                />
            </div>
            <DialogFooter class="mt-4">
                <Button variant="outline" @click="cancelRename">Cancel</Button>
                <Button @click="confirmRename">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <!-- Delete Dialog -->
    <Dialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
        <DialogContent class="sm:max-w-md">
            <DialogTitle>Delete Workspace</DialogTitle>
            <div class="mt-4">
                <p class="text-sm text-muted-foreground">
                    Are you sure you want to delete the workspace "{{ workspaceNameToDelete }}"? This action
                    cannot be undone.
                </p>
            </div>
            <DialogFooter class="mt-4">
                <Button variant="outline" @click="cancelDelete">Cancel</Button>
                <Button variant="destructive" @click="confirmDelete">Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
