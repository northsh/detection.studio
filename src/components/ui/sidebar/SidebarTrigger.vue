<script lang="ts" setup>
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {PanelLeft} from 'lucide-vue-next'
import {useSidebar} from './utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()

const {toggleSidebar} = useSidebar()
</script>

<template>
    <Button
        :class="cn('h-7 w-7', props.class)"
        data-sidebar="trigger"
        size="icon"
        variant="ghost"
        @click="toggleSidebar"
    >
        <PanelLeft/>
        <span class="sr-only">Toggle Sidebar</span>
    </Button>
</template>
