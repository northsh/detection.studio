<script lang="ts" setup>
import type {DialogTitleProps} from 'radix-vue'
import {DialogTitle, useForwardProps} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <DialogTitle
        :class="
      cn(
        'text-lg font-semibold leading-none tracking-tight',
        props.class,
      )
    "
        v-bind="forwardedProps"
    >
        <slot/>
    </DialogTitle>
</template>
