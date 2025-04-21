<template>
    <div class="flex flex-col h-screen w-full max-w-full overflow-hidden">
        <!-- Header - Fixed height, no overflow -->
        <header class="flex h-14 shrink-0 items-center gap-1 md:gap-2">
            <div class="w-full flex items-center gap-1 md:gap-4 px-4">
                <SidebarTrigger/>
                <Separator class="h-4!" orientation="vertical"/>
                <div class="grow"></div>
                <div class="flex items-center gap-1 md:gap-2">
                    <Button
                        href="https://github.com/northsh/detection.studio/"
                        size="sm"
                        target="_blank"
                        variant="ghost"
                    >
                        <Github class="h-4 w-4 text-primary"/>
                        GitHub
                    </Button>

                    <ShareSigmaRuleButton />

                </div>
            </div>
        </header>

        <div class="px-1 pb-6 mt-1">
            <div class="mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
                    <SigmaRuleList
                        :initialRuleId="ruleId"
                        class="h-full border rounded-lg overflow-hidden shadow-xs"
                    />
                    <div class="md:col-span-2 h-full border rounded-lg overflow-hidden shadow-xs">
                        <SigmaRuleViewer class="h-full"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SigmaRuleList from '@/components/SigmaRuleList.vue';
import SigmaRuleViewer from '@/components/SigmaRuleViewer.vue';
import {Separator} from "@/components/ui/separator";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {Github} from "lucide-vue-next";
import {useHead} from "@unhead/vue";
import ShareSigmaRuleButton from "@/components/ShareSigmaRuleButton.vue";

/**
 * Head
 */
useHead({
    title: 'Sigma Browser – detection.studio',
    meta: [
        {
            name: 'description',
            content: 'Browse and Import Sigma rules from different available repos.',
        },
    ],
})

// Accept route props
defineProps<{
    ruleId?: string | null
}>();
</script>