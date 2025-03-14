<script lang="ts" setup>
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import {
    BookOpen,
    ChevronRight,
    ChevronsUpDown,
    Edit2,
    GlobeIcon,
    Layers2,
    PaletteIcon,
    Plus,
    Settings2,
    Sparkles,
    Trash2,
} from "lucide-vue-next";
import {computed, ref, watch} from "vue";
import {Card} from "@/components/ui/card";
// Importing Prism grammars
import "prism-code-editor/prism/languages/markup";

import "prism-code-editor/prism/languages/javascript";
import "prism-code-editor/prism/languages/yaml";

import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {useMagicKeys} from '@vueuse/core'
import {supportedSiems} from "@/types/SIEMs";
import Main from "@/components/Main.vue";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Studio",
            url: "#",
            icon: PaletteIcon,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Browser",
            url: "#",
            icon: GlobeIcon,
            items: [
                {
                    title: "Recent",
                    url: "#",
                },
                {
                    title: "Saved",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Profile",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
            ],
        },
    ],
    documentation: [
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Sigma Documentation",
                    url: "https://sigmahq.io/docs/",
                },
            ],
        },
    ],
};

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

/**
 * Workspace Shortcuts
 */

// const { Cmd, Num1, Num2, Num3, Num4, Num5, Num6, Num7, Num8, Num9 } = useMagicKeys({
//
//     passive: false,
//     onEventFired: (e) => {
//         // if (e.ctrlKey && e.key === 's' && e.type === 'keydown')
//         if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
//             e.preventDefault();
//         }
//     },
// })
//
// const hotkeys = [Num1, Num2, Num3, Num4, Num5, Num6, Num7, Num8, Num9]
//
// watch(hotkeys, (keys) => {
//     keys.forEach((key, index) => {
//         if (key && Cmd.value) {
//             workStore.setCurrentWorkspace(workStore.availableWorkspaces[index])
//         }
//     })
// })


/**
 * Undo / Redo Shortcuts
 */
const {Cmd, Z, Y} = useMagicKeys({
    passive: false,
    onEventFired: (e) => {
        if (e.ctrlKey && e.key === 'z' && e.type === 'keydown') {
            e.preventDefault();
        }
    },
})

watch([Z, Y], ([undo, redo]) => {
    if (undo && Cmd.value) {
        fs.value.undo();
    }

    if (redo && Cmd.value) {
        fs.value.redo();
    }
})

</script>

<template>
    <SidebarProvider v-model:open="workStore.sidebarOpen" class="">
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem class="flex items-center gap-2" :class="{'mx-2': workStore.sidebarOpen}">
                        <div v-if="workStore.sidebarOpen" class="w-full font-semibold whitespace-nowrap">Detection Studio</div>
                        <div v-else class="pl-1 w-full font-semibold">D.S</div>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarSeparator class="w-full !bg-border mx-0" :class="{'mx-2': workStore.sidebarOpen}" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <SidebarMenuButton
                                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    size="lg">
                                    <div
                                        class="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground">
                                        <Layers2 class="h-4 shrink-0"/>
                                    </div>
                                    <div class="grid text-left text-sm leading-tight">
                                        <span class="truncate font-semibold">{{ workStore.currentWorkspace?.name }}</span>
                                        <span class="truncate text-xs">{{ supportedSiems.find((s) => s.id === sigma.selected_siem)?.name ?? '' }}</span>
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
                                                <Layers2 class="h-4 shrink-0"/>
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
                                            <button class="rounded p-1 hover:bg-muted" 
                                                    @click.stop="deleteWorkspace(workspace.id)"
                                                    :disabled="workStore.availableWorkspaces.length <= 1"
                                                    :class="{'opacity-40': workStore.availableWorkspaces.length <= 1}">
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
                                            v-model="newWorkspaceName" 
                                            class="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            placeholder="Workspace name"
                                            @keydown.enter="confirmRename"
                                            @keydown.escape="cancelRename"
                                            @click.stop
                                            ref="renameInput"
                                            autofocus
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
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel class="text-muted-foreground">Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <router-link to="/" custom v-slot="{ isActive, href, navigate }">
                                <SidebarMenuButton :active="isActive" @click="navigate">
                                    <PaletteIcon />
                                    <span>Studio</span>
                                </SidebarMenuButton>
                            </router-link>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                            <router-link to="/browser" custom v-slot="{ isActive, href, navigate }">
                                <SidebarMenuButton :active="isActive" @click="navigate">
                                    <GlobeIcon />
                                    <span>Sigma Rules</span>
                                </SidebarMenuButton>
                            </router-link>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                            <router-link to="/settings" custom v-slot="{ isActive, href, navigate }">
                                <SidebarMenuButton :active="isActive" @click="navigate">
                                    <Settings2 />
                                    <span>Settings</span>
                                </SidebarMenuButton>
                            </router-link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                
                <SidebarGroup class="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel class="text-muted-foreground">Documentation</SidebarGroupLabel>
                    <SidebarMenu>
                        <Collapsible v-for="item in data.documentation" :key="item.title" as-child :default-open="true"
                                     class="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger as-child>
                                    <SidebarMenuButton :tooltip="item.title">
                                        <component :is="item.icon"/>
                                        <span>{{ item.title }}</span>
                                        <ChevronRight
                                            class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                                            <SidebarMenuSubButton as-child>
                                                <a :href="subItem.url" target="_blank">
                                                    <span>{{ subItem.title }}</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Transition>
                            <Card v-if="workStore.sidebarOpen" class="text-xs text-muted-foreground p-2 flex items-center gap-2">
                                Powered by
                                <Sparkles class="text-primary h-4 w-4"/>
                                <span class="text-primary font-semibold">north.sh</span>
                            </Card>
                        </Transition>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
        <SidebarInset class="bg-muted/30">
            <router-view></router-view>
        </SidebarInset>
    </SidebarProvider>
</template>
