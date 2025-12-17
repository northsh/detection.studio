<script lang="ts" setup>
import {computed, ref} from "vue";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {ChevronDown, Check} from 'lucide-vue-next';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from "@/components/ui/button";
import {
  Combobox,
  ComboboxGroup,
  ComboboxItem
} from '@/components/ui/combobox';
import {supportedSiems} from "@/types/SIEMs";
import {Badge} from "@/components/ui/badge";
import {Card} from "@/components/ui/card";
import splunk_svg from '@/images/splunk.svg?component';
import loki_svg from '@/images/grafana.svg?component';
import elasticsearch_svg from '@/images/elasticsearch.svg?component';

const workspace = useWorkspaceStore();
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

const open = ref(false);

const updateSelectedSiem = (value: string) => {
  if (sigma.value) {
    sigma.value.selected_siem = value;
  }
  open.value = false;
};

const selectedSiem = computed(() => {
  return supportedSiems.find(siem => siem.id === sigma.value?.selected_siem);
});
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                role="combobox"
                :aria-expanded="open"
                class="w-50! h-8 border-primary justify-between bg-background px-3 font-normal hover:bg-background"
            >
                <template v-if="selectedSiem">
                    <span class="flex min-w-0 items-center gap-2">
                        <component
                            v-if="selectedSiem.icon"
                            :is="selectedSiem.icon as any"
                            class="h-4 w-4"
                            :class="selectedSiem.colorClass"
                        />
                        <span class="truncate flex items-center">
                            {{ selectedSiem.name }}
                            <Badge
                                variant="outline"
                                class="ml-2 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
                                v-if="selectedSiem.correlation"
                                >Correlation</Badge
                            >
                        </span>
                    </span>
                </template>
                <template v-else>
                    <span class="text-muted-foreground">Select a SIEM</span>
                </template>
                <ChevronDown
                    :size="16"
                    :stroke-width="2"
                    class="shrink-0 text-muted-foreground/80"
                    aria-hidden="true"
                />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-full p-1 rounded-xl" align="start">
            <Combobox :model-value="sigma?.selected_siem" @update:model-value="updateSelectedSiem">
                <!-- Header -->
                <div class="m-0 pt-2 pb-0 px-3 text-sm font-medium">
                    SIEMs <span class="opacity-30 px-1">/</span> Log Engines
                </div>

                <!-- Main vendor cards in 3 columns -->
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-2 pb-0">
                    <template
                        v-for="vendor in ['Splunk', 'Elasticsearch', 'Grafana']"
                        :key="vendor"
                    >
                        <Card class="p-1 px-3 mb-1 flex flex-col w-[220px]">
                            <div class="flex gap-3 items-center p-1">
                                <component
                                    :is="vendor === 'Splunk' ? splunk_svg : vendor === 'Elasticsearch' ? elasticsearch_svg : loki_svg"
                                    class="h-4 w-4 opacity-30"
                                />
                                <span>{{ vendor }}</span>
                            </div>

                            <ComboboxGroup>
                                <template v-for="siem in supportedSiems" :key="siem.id">
                                    <ComboboxItem
                                        v-if="siem.company === vendor"
                                        :value="siem.id"
                                        class="justify-start transition-colors duration-75 hover:bg-secondary"
                                        :class="[siem.id === sigma?.selected_siem ? 'bg-primary/10' : '']"
                                    >
                                        <span class="flex items-center gap-2 flex-1">
                                            <component
                                                :is="siem.icon as any"
                                                :class="[siem.colorClass]"
                                                class="h-4 w-4"
                                            />
                                            <span class="flex items-center"
                                                >{{ siem.name }}
                                                <Badge
                                                    variant="outline"
                                                    class="ml-1 text-[5pt] bg-cyan-500/10 text-cyan-500 border-cyan-600/40 px-1 py-0"
                                                    v-if="siem.correlation"
                                                    >Correlation</Badge
                                                ></span
                                            >
                                        </span>
                                        <Check
                                            v-if="siem.id === sigma?.selected_siem"
                                            :size="16"
                                            class="text-primary"
                                        />
                                    </ComboboxItem>
                                </template>
                            </ComboboxGroup>
                        </Card>
                    </template>
                </div>

                <!-- Other SIEMs without company -->
                <ComboboxGroup
                    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 p-2 pt-0"
                >
                    <template v-for="siem in supportedSiems" :key="siem.id">
                        <ComboboxItem
                            v-if="!siem.company"
                            :value="siem.id"
                            class="justify-start transition-colors duration-75 hover:bg-secondary"
                            :class="[siem.id === sigma?.selected_siem ? 'bg-primary/10' : '']"
                        >
                            <component
                                v-if="siem.icon"
                                :is="siem.icon as any"
                                :class="[siem.colorClass]"
                                class="h-4 w-4"
                            />
                            <span class="flex-1">{{ siem.name }}</span>
                            <Check
                                v-if="siem.id === sigma?.selected_siem"
                                :size="16"
                                class="text-primary"
                            />
                        </ComboboxItem>
                    </template>
                </ComboboxGroup>
            </Combobox>
        </PopoverContent>
    </Popover>
</template>
