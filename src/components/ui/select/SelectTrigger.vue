<script lang="ts" setup>
import type {SelectTriggerProps} from 'radix-vue'
import {SelectIcon, SelectTrigger, useForwardProps} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'
import {CaretSortIcon} from '@radix-icons/vue'

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <SelectTrigger
        :class="cn(
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background data-placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start',
      props.class,
    )"
        v-bind="forwardedProps"
    >
        <slot/>
        <SelectIcon as-child>
            <CaretSortIcon class="w-4 h-4 opacity-50 shrink-0"/>
        </SelectIcon>
    </SelectTrigger>
</template>
