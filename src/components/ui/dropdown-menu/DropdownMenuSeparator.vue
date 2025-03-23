<script lang="ts" setup>
import type {DropdownMenuSeparatorProps} from 'radix-vue'
import {DropdownMenuSeparator,} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<DropdownMenuSeparatorProps & {
    class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})
</script>

<template>
    <DropdownMenuSeparator :class="cn('-mx-1 my-1 h-px bg-muted', props.class)" v-bind="delegatedProps"/>
</template>
