<script lang="ts" setup>
import type {ContextMenuSeparatorProps} from 'radix-vue'
import {ContextMenuSeparator,} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<ContextMenuSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})
</script>

<template>
    <ContextMenuSeparator :class="cn('-mx-1 my-1 h-px bg-border', props.class)" v-bind="delegatedProps"/>
</template>
