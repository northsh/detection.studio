<script lang="ts" setup>
import type {ComboboxEmptyProps} from 'reka-ui'
import {ComboboxEmpty} from 'reka-ui'
import {cn} from '@/lib/utils'
import {computed, type HTMLAttributes} from 'vue'

const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})
</script>

<template>
    <ComboboxEmpty :class="cn('py-6 text-center text-sm', props.class)" v-bind="delegatedProps">
        <slot/>
    </ComboboxEmpty>
</template>
