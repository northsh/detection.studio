<script lang="ts" setup>
import type {DropdownMenuItemProps} from 'radix-vue'
import {DropdownMenuItem, useForwardProps} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes['class'], inset?: boolean }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <DropdownMenuItem
        :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm gap-2 px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50  [&>svg]:size-4 [&>svg]:shrink-0',
      inset && 'pl-8',
      props.class,
    )"
        v-bind="forwardedProps"
    >
        <slot/>
    </DropdownMenuItem>
</template>
