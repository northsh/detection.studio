<script lang="ts" setup>
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Files, Folder, Plus, TextCursor, Trash,} from "lucide-vue-next";
import sigmaTemplate from "@/templates/SigmaRuleTemplate";
import sigmaCorrelationTemplate from "@/templates/CorrelationRules/EventCountTemplate";
import sigmaFilterTemplate from "@/templates/SigmaFilterTemplate";
import sigmaPipelineTemplate from "@/templates/SigmaPipelineTemplate";
import {computed} from "vue";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
import FileListItem from "./FileListItem.vue";
import type {FileType} from "@/types/types.ts";
import {DropdownMenuPortal} from "radix-vue";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import SigmaLogo from '@/images/sigma.svg?component'

/**
 * Editing Focus
 */

const workspace = useWorkspaceStore();
const fs = computed(() => workspace.currentWorkspace?.fileStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

const templates: Record<FileType, () => string> = {
    sigma: sigmaTemplate,
    correlation: sigmaCorrelationTemplate,
    filter: () => sigmaFilterTemplate(fs.value.getFile(
        sigma.value.active_sigma_rule_file_id
    )),
    pipeline: () => sigmaPipelineTemplate(fs.value.getFile(
        sigma.value.active_sigma_rule_file_id
    )),
};

const newFile = (rule_type: FileType) => {
    fs.value.addFile({
        name: `new_${rule_type}_rule`,
        content: templates[rule_type]() as string,
        type: rule_type,
    });
};

const groupedFiles = computed(function () {
    const config = fs.value.files.filter((f) => f.type === "pipeline");
    const filters = fs.value.files.filter((f) => f.type === "filter");
    const rules = fs.value.files.filter((f) => ["sigma", "correlation"].includes(f.type));

    return {
        config,
        filters,
        rules,
    };
});
</script>

<template>
    <div class="flex flex-col h-full">

        <div class="space-y-2">
            <div class="flex bg-background pt-1 pl-2.5 pb-0 mb-0.5">
                <TooltipProvider>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button class="h-6 w-6" data-test-id="new-sigma-rule" size="icon">
                                        <Plus class="h-4 w-4"/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent align="start" side="bottom">
                                    <p>Add to library</p>
                                </TooltipContent>
                            </Tooltip>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" side="bottom">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Rule Type</DropdownMenuLabel>
                            </DropdownMenuGroup>
                            <DropdownMenuItem class="flex gap-2 items-center" @click="newFile('sigma')">
                                <SigmaLogo class="h-4 w-4"/>
                                Sigma Rule
                            </DropdownMenuItem>
                            <!--                            <DropdownMenuSub>-->
                            <!--                                <DropdownMenuSubTrigger class="flex gap-2 items-center">-->
                            <!--                                    <SigmaLogo class="h-4 w-4"/>-->
                            <!--                                    <span>Sigma Rule</span>-->
                            <!--                                </DropdownMenuSubTrigger>-->
                            <!--                                <DropdownMenuPortal>-->
                            <!--                                    <DropdownMenuSubContent>-->
                            <!--                                        <DropdownMenuItem @click="newFile('sigma')">Sigma</DropdownMenuItem>-->
                            <!--                                    </DropdownMenuSubContent>-->
                            <!--                                </DropdownMenuPortal>-->
                            <!--                            </DropdownMenuSub>-->
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger class="flex gap-2 items-center">
                                    <SigmaLogo class="h-4 w-4"/>
                                    <span>Sigma Correlation Rule</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem class="flex flex-col items-start gap-1"
                                                          @click="newFile('correlation')">
                                            Event Count
                                            <p class="text-muted-foreground">
                                                Count the number of events in a time window
                                            </p>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem class="flex flex-col items-start gap-1"
                                                          @click="newFile('correlation')">
                                            Value Count
                                            <p class="text-muted-foreground">
                                                Count the number of individual values in a time window
                                            </p>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem class="flex flex-col items-start gap-1"
                                                          @click="newFile('correlation')">
                                            Temporal
                                            <p class="text-muted-foreground">
                                                Multiple different events close together in time
                                            </p>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem disabled>Ordered Temporal</DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem @click="newFile('filter')">Sigma Filter</DropdownMenuItem>
                            <DropdownMenuItem @click="newFile('pipeline')">Sigma Pipeline</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Tooltip>
                        <TooltipTrigger>
                            <Button class="h-6 w-6" size="icon" variant="ghost"
                                    @click="fs.startRename(fs.currentlyOpenFileId)">
                                <TextCursor class="text-muted-foreground h-4 w-4"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent align="start" side="bottom">
                            <p>Rename File</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger>
                            <Button class="h-6 w-6" size="icon" variant="ghost"
                                    @click="fs.duplicateFile(fs.currentlyOpenFileId)">
                                <Files class="text-muted-foreground h-4 w-4"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent align="start" side="bottom">
                            <p>Duplicate</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger>
                            <Button class="h-6 w-6" size="icon" variant="ghost"
                                    @click="fs.deleteFile(fs.currentlyOpenFileId)">
                                <Trash class="text-muted-foreground h-4 w-4"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent align="start" side="bottom">
                            <p>Delete File(s)</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div class="min-h-0">
                <ScrollArea class="h-full">
                    <div class="space-y-1 p-2">
                        <template v-for="(files, type) in groupedFiles" :key="type">
                            <template v-if="files.length">
                                <div>
                                    <Button class="w-full justify-start h-7 px-2 hover:bg-muted/50" variant="ghost">
                                        <Folder class="mr-2 text-muted-foreground h-4 w-4"/>
                                        <span class="truncate">{{ type }}</span>
                                    </Button>
                                </div>
                                <FileListItem v-for="file in files" :key="file.id" :file="file"/>
                            </template>
                        </template>
                    </div>
                </ScrollArea>
            </div>
        </div>
    </div>
</template>

<style scoped>
.group:hover .hover-actions {
    opacity: 1;
}

.hover-actions {
    opacity: 0;
    transition: opacity 0.2s;
}
</style>
