<script lang="ts" setup>
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible";
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
import {BookOpen, ChevronRight, GlobeIcon, PaletteIcon, Settings2, Sparkles,} from "lucide-vue-next";
import {Card} from "@/components/ui/card";

import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import WorkspaceSelection from "@/components/WorkspaceSelection.vue";

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

</script>

<template>
    <SidebarProvider v-model:open="workStore.sidebarOpen" class="">
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem :class="{'mx-2': workStore.sidebarOpen}" class="flex items-center gap-2">
                        <div v-if="workStore.sidebarOpen" class="w-full font-semibold whitespace-nowrap">Detection
                            Studio
                        </div>
                        <div v-else class="pl-1 w-full font-semibold">D.S</div>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarSeparator :class="{'mx-2': workStore.sidebarOpen}" class="w-full bg-border! mx-0"/>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <WorkspaceSelection/>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel class="text-muted-foreground">Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <router-link v-slot="{ isActive, navigate }" custom to="/">
                                <SidebarMenuButton :active="isActive" class="[active=true]/text-white" @click="navigate" :class="{
                                    'text-primary bg-primary/10': isActive,
                                }">
                                    <PaletteIcon/>
                                    <span>Studio</span>
                                </SidebarMenuButton>
                            </router-link>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <router-link v-slot="{ isActive, navigate }" custom to="/browser">
                                <SidebarMenuButton :active="isActive" @click="navigate" :class="{
                                    'text-primary bg-primary/10': isActive,
                                }">
                                    <GlobeIcon/>
                                    <span>Browser</span>
                                </SidebarMenuButton>
                            </router-link>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <router-link v-slot="{ isActive, navigate }" custom disabled to="/settings">
                                <SidebarMenuButton :active="isActive" disabled @click="navigate" :class="{
                                    'text-primary bg-primary/10': isActive,
                                }">
                                    <Settings2/>
                                    <span>Settings</span>
                                </SidebarMenuButton>
                            </router-link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup class="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel class="text-muted-foreground">Documentation</SidebarGroupLabel>
                    <SidebarMenu>
                        <Collapsible v-for="item in data.documentation" :key="item.title" :default-open="true" as-child
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
                            <Card v-if="workStore.sidebarOpen"
                                  class="text-xs text-muted-foreground p-2 flex items-center gap-2">
                                Powered by
                                <Sparkles class="text-primary h-4 w-4"/>
                                <a href="https://north.sh/" target="_blank" class="text-primary font-semibold">
                                    north.sh
                                </a>
                            </Card>
                        </Transition>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
        <SidebarInset class="bg-muted/30 h-screen max-h-screen overflow-hidden">
            <router-view class="h-full w-full overflow-hidden"></router-view>
        </SidebarInset>
    </SidebarProvider>
</template>
