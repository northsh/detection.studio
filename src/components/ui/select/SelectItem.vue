<script lang="ts" setup>
import type {SelectItemProps} from 'radix-vue'
import {SelectItem, SelectItemIndicator, SelectItemText, useForwardProps,} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'
import {CheckIcon} from '@radix-icons/vue'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <SelectItem
        :class="
      cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        props.class,
      )
    "
        v-bind="forwardedProps"
    >
    <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <CheckIcon class="h-4 w-4"/>
      </SelectItemIndicator>
    </span>

        <SelectItemText>
            <slot/>
        </SelectItemText>
    </SelectItem>
</template>
