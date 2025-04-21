<script lang="ts" setup>
import {FileText} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {computed, useTemplateRef, watchEffect} from "vue";
import {useDebounceFn, useFocus} from "@vueuse/core";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";


const workspace = useWorkspaceStore();
const fs = computed(() => workspace.currentWorkspace?.fileStore());
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());

const props = defineProps<{
    file: {
        id: string;
        name: string;
        active: boolean;
    };
}>();

const inputRef = useTemplateRef("rename-input");
const {focused} = useFocus(computed(() => inputRef?.value?.$el))

watchEffect(() => {
    focused.value = !!inputRef.value;
    if (focused.value) {
        inputRef.value?.$el.select();
    }
}, {
    flush: 'post'
});

/**
 * Lose focus on blur
 */
const debounceFocus = useDebounceFn(() => {
    if (!focused.value) {
        fs.value.saveRename();
    }
}, 100);

</script>

<template>
    <ContextMenu>
        <ContextMenuTrigger>
            <div class="group relative">
                <Button :class="[
                    'w-full justify-start h-7 px-2 hover:bg-muted/50 flex gap-2',
                    fs.currentlyOpenFileId == file.id && 'bg-muted outline outline-primary/30 outline-1'
                ]" variant="ghost" @click="fs.openFile(file.id)">
                    <FileText class="ml-4 text-muted-foreground min-h-4 min-w-4 h-4 w-4"/>
                    <span v-if="fs.fileBeingEdited === file.id" @click.stop>
                        <Input ref="rename-input" v-model="fs.editingFileName"
                               class="bg-transparent border-none outline-hidden focus:ring-1 focus:ring-primary px-1 -ml-1 h-8"
                               @blur="debounceFocus" @keyup.enter="fs.saveRename" @keyup.esc="fs.cancelRename"/>
                    </span>
                    <span v-else class="truncate"
                          @dblclick="fs.startRename(file.id)">

                        {{ file.name }}<span class="pl-0.5 text-muted-foreground/70 truncate">.yml</span>

                    </span>
                    <div class="grow"></div>

                    <Tooltip>
                        <TooltipTrigger>
                            <span v-if="sigma.active_sigma_rule_file_id === file.id"
                                  class="block rounded-full bg-sky-500 h-2 w-2"></span>
                        </TooltipTrigger>
                        <TooltipContent align="start" side="bottom">
                            <p>Active Sigma Rule</p>
                        </TooltipContent>
                    </Tooltip>
                </Button>
            </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuItem @click="fs.openFile(file.id)">Open</ContextMenuItem>
            <ContextMenuSeparator/>
            <ContextMenuItem disabled>Create Filter</ContextMenuItem>
            <ContextMenuItem disabled>Create Field Mapping Pipeline</ContextMenuItem>
            <ContextMenuItem disabled>Create Logsource Pipeline</ContextMenuItem>
            <ContextMenuSeparator/>
            <ContextMenuItem @click="fs.duplicateFile(file.id)">Duplicate</ContextMenuItem>
            <ContextMenuItem @click="fs.startRename(file.id)">Rename</ContextMenuItem>
            <ContextMenuItem class="text-red-600" @click="fs.deleteFile(file.id)">Delete</ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>
</template>
