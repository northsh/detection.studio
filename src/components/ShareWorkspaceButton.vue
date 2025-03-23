<script lang="ts" setup>
import {Button} from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Share} from "lucide-vue-next";
import {useWorkspaceSharingStore} from "@/stores/ShareStore";
import {useWorkspaceStore} from "@/stores/WorkspaceStore";
import {computed} from "vue";
import {useClipboard} from '@vueuse/core'

const workspaceStore = useWorkspaceStore()
const shareStore = useWorkspaceSharingStore()

const shareUrl = computed(() => {
    return shareStore.generateShareableUrl(
        workspaceStore.currentWorkspace
    )
})

const {copy, isSupported} = useClipboard({
    source: shareUrl
})

function share() {
    copy(shareUrl.value)
}

</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button class="hidden h-8 md:flex gap-2" size="sm" variant="secondary">
                <Share class="h-3.5 w-3.5"/>
                Share
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    Share workspace
                </DialogTitle>
                <DialogDescription>
                    Share your detection.studio workspace with others by sending them the link below.
                </DialogDescription>
            </DialogHeader>
            <div class="flex flex-col gap-2">
                <Label class="" for="name">
                    Shareable URL
                </Label>
                <Input id="name" :model-value="shareUrl" class="col-span-3" disabled/>
                <Button v-if="isSupported" class="w-full" type="submit" variant="outline" @click="share">
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
</template>
