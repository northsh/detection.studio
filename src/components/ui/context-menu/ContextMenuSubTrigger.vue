<script lang="ts" setup>
import type {ContextMenuSubTriggerProps} from 'radix-vue'
import {ContextMenuSubTrigger, useForwardProps,} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'
import {ChevronRightIcon} from '@radix-icons/vue'

const props = defineProps<ContextMenuSubTriggerProps & { class?: HTMLAttributes['class'], inset?: boolean }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <ContextMenuSubTrigger
        :class="cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      inset && 'pl-8',
      props.class,
    )"
        v-bind="forwardedProps"
    >
        <slot/>
        <ChevronRightIcon class="ml-auto h-4 w-4"/>
    </ContextMenuSubTrigger>
</template>
