<script lang="ts" setup>
import type {ComboboxSeparatorProps} from 'reka-ui'
import {ComboboxSeparator} from 'reka-ui'
import {cn} from '@/lib/utils'
import {computed, type HTMLAttributes} from 'vue'

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})
</script>

<template>
    <ComboboxSeparator
        :class="cn('-mx-1 h-px bg-border', props.class)"
        v-bind="delegatedProps"
    >
        <slot/>
    </ComboboxSeparator>
</template>
