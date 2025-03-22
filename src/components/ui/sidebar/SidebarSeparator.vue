<script lang="ts" setup>
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'
import {Separator} from '@/components/ui/separator'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <Separator
        :class="cn('mx-2 w-auto bg-sidebar-border', props.class)"
        data-sidebar="separator"
    >
        <slot/>
    </Separator>
</template>
