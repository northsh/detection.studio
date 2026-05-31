<script lang="ts" setup>
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent,
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
import {BookOpen, ChevronRight, GlobeIcon, PaletteIcon, Settings2, Sparkles, FileText,} from "lucide-vue-next";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {useSettingsStore} from "@/stores/SettingsStore";
import WorkspaceSelection from "@/components/WorkspaceSelection.vue";
import ChangelogDialog from "@/components/ChangelogDialog.vue";
import {ref} from "vue";
import {Toaster} from "@/components/ui/sonner";
import {useAppColorMode} from "@/composables/useAppColorMode";

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
const changelogDialogRef = ref<InstanceType<typeof ChangelogDialog>>();

// Apply persisted theme on boot
const settingsStore = useSettingsStore();
const { colorMode } = useAppColorMode();
colorMode.value = settingsStore.theme === 'system' ? 'auto' : settingsStore.theme;

function openChangelog() {
    changelogDialogRef.value?.openDialog();
}
</script>

<template>
  <SidebarProvider v-model:open="workStore.sidebarOpen" class="flex min-h-screen">
    <Sidebar collapsible="icon" variant="inset" class="-mr-1">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem :class="{'mx-2': workStore.sidebarOpen}" class="flex items-center gap-2 pb-2">
            <a v-if="workStore.sidebarOpen" href="https://north.sh/" target="_blank" class="w-full font-semibold whitespace-nowrap flex items-center gap-3 no-underline text-inherit">
              <img src="/images/logomark_light.png" class="h-5 dark:hidden"  alt="north.sh logo"/>
              <img src="/images/logomark_dark.png" class="h-5 hidden dark:block"  alt="north.sh logo"/>
              <div class="flex flex-col">
                <div class="">Detection Studio</div>
                <div class="text-xs text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-foreground">by north.sh</div>
              </div>
            </a>
            <a v-else href="https://north.sh/" target="_blank" class="pl-1 w-full font-semibold pt-2 pb-4">
              <img src="/images/logomark_light.png" class="translate-x-1 h-5 dark:hidden"  alt="north.sh logo"/>
              <img src="/images/logomark_dark.png" class="translate-x-1 h-5 hidden dark:block"  alt="north.sh logo"/>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <WorkspaceSelection />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <router-link v-slot="{ isActive, navigate }" custom to="/">
                  <SidebarMenuButton
                    :active="isActive"
                    :class="{
                                    'text-primary bg-primary/10': isActive,
                                }"
                    class="[active=true]/text-white"
                    @click="navigate"
                  >
                    <PaletteIcon />
                    <span>Studio</span>
                  </SidebarMenuButton>
                </router-link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <router-link v-slot="{ isActive, navigate }" custom to="/browser">
                  <SidebarMenuButton
                    :active="isActive"
                    :class="{
                                    'text-primary bg-primary/10': isActive,
                                }"
                    @click="navigate"
                  >
                    <GlobeIcon />
                    <span>Browser</span>
                  </SidebarMenuButton>
                </router-link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <router-link v-slot="{ isActive, navigate }" custom to="/settings">
                  <SidebarMenuButton
                    :active="isActive"
                    :class="{
                                    'text-primary bg-primary/10': isActive,
                                }"

                    @click="navigate"
                  >
                    <Settings2 />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </router-link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup class="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel class="text-muted-foreground">Documentation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible
                v-for="item in data.documentation"
                :key="item.title"
                :default-open="true"
                as-child
                class="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger as-child>
                    <SidebarMenuButton :tooltip="item.title">
                      <component :is="item.icon" />
                      <span>{{ item.title }}</span>
                      <ChevronRight
                        class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      />
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton class="relative" tooltip="Changelog" @click="openChangelog">
              <FileText />
              <span>What's New</span>
              <div class="relative flex size-3">
                <div
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
                ></div>
                <div class="relative inline-flex size-3 rounded-full bg-sky-500"></div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Transition>
              <a
                v-if="workStore.sidebarOpen"
                href="https://north.sh/"
                target="_blank"
                class="rounded-lg border bg-card text-card-foreground shadow-sm text-xs text-muted-foreground p-2 flex flex-col items-center gap-0 hover:bg-accent transition-colors no-underline"
              >
                Powered by
                <img src="/images/logo_dark.png" class="hidden dark:block h-7" alt="north.sh logo" />
                <img src="/images/logo_light.png" class="dark:hidden h-7" alt="north.sh logo" />
              </a>
            </Transition>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset class="dark:bg-muted/30 flex-1 flex flex-col overflow-hidden">
      <router-view class="flex-1 w-full overflow-hidden"></router-view>
      <Toaster  :position="'top-right'" />
    </SidebarInset>
  </SidebarProvider>

  <!-- Changelog Dialog with auto-show for new releases -->
  <ChangelogDialog ref="changelogDialogRef" :auto-show="true" />
</template>
