<script lang="ts" setup>
import type {DialogDescriptionProps} from 'radix-vue'
import {DialogDescription, useForwardProps} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <DialogDescription
        :class="cn('text-sm text-muted-foreground', props.class)"
        v-bind="forwardedProps"
    >
        <slot/>
    </DialogDescription>
</template>
