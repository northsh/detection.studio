<script lang="ts" setup>
import type {DropdownMenuSubTriggerProps} from 'radix-vue'
import {DropdownMenuSubTrigger, useForwardProps,} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'
import {ChevronRightIcon} from '@radix-icons/vue'

const props = defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <DropdownMenuSubTrigger
        :class="cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      props.class,
    )"
        v-bind="forwardedProps"
    >
        <slot/>
        <ChevronRightIcon class="ml-auto h-4 w-4"/>
    </DropdownMenuSubTrigger>
</template>
