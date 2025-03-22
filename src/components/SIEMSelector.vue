<script lang="ts" setup>
import {computed} from "vue";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";


import splunk_svg from '@/images/splunk.svg?component';
import loki_svg from '@/images/grafana.svg?component';
import elasticsearch_svg from '@/images/elasticsearch.svg?component';
import {Card} from "@/components/ui/card";
import {supportedSiems} from "@/types/SIEMs";


const workspace = useWorkspaceStore();
const fs = computed(() => workspace.currentWorkspace?.fileStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

</script>

<template>
    <Select v-model="sigma.selected_siem">
        <SelectTrigger class="h-8 border-primary">
            <SelectValue placeholder="Select a SIEM"/>
        </SelectTrigger>
        <SelectContent>
            <SelectLabel class="m-0 pt-2 pb-0 px-3">SIEMs <span class="opacity-30 px-1">/</span> Log Engines
            </SelectLabel>
            <SelectGroup>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-2 pb-0">

                    <template v-for="vendor in ['Splunk', 'Elasticsearch', 'Grafana']">
                        <Card class="p-1 px-3 mb-1 flex flex-col w-[220px]">
                            <div class="flex gap-3 items-center mb-1 p-1">
                                <component
                                    :is="vendor === 'Splunk' ? splunk_svg : vendor === 'Elasticsearch' ? elasticsearch_svg : loki_svg"
                                    class="h-4 w-4"/>

                                <span>{{ vendor }}</span>
                            </div>

                            <template v-for="siem in supportedSiems" :key="siem.id">
                                <SelectItem v-if="siem.company === vendor" :value="siem.id" class="">
                                <span class="flex items-center gap-2">
                                    <component :is="siem.icon" :class="[siem.colorClass]" class="h-4 w-4"/>
                                    <span>{{ siem.name }}</span>
                                </span>
                                </SelectItem>
                            </template>
                        </Card>
                    </template>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-2 pt-0">
                    <template v-for="siem in supportedSiems" :key="siem.id">

                        <SelectItem v-if="!siem.company" :value="siem.id">
                            {{ siem.name }}
                        </SelectItem>
                    </template>
                </div>
            </SelectGroup>

        </SelectContent>
    </Select>
</template>
