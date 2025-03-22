<script lang="ts" setup>
import type {ComboboxTriggerProps} from 'reka-ui'
import {ComboboxTrigger, useForwardProps} from 'reka-ui'
import {cn} from '@/lib/utils'
import {computed, type HTMLAttributes} from 'vue'

const props = defineProps<ComboboxTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
    <ComboboxTrigger
        :class="cn('', props.class)"
        tabindex="0"
        v-bind="forwarded"
    >
        <slot/>
    </ComboboxTrigger>
</template>
