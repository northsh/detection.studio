<script lang="ts" setup>
import type {ComboboxAnchorProps} from 'reka-ui'
import {ComboboxAnchor, useForwardProps} from 'reka-ui'
import {cn} from '@/lib/utils'
import {computed, type HTMLAttributes} from 'vue'

const props = defineProps<ComboboxAnchorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
    <ComboboxAnchor
        :class="cn('w-[200px]', props.class)"
        v-bind="forwarded"
    >
        <slot/>
    </ComboboxAnchor>
</template>
