<script lang="ts" setup>
import type {ScrollAreaScrollbarProps} from 'radix-vue'
import {ScrollAreaScrollbar, ScrollAreaThumb} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'

const props = withDefaults(defineProps<ScrollAreaScrollbarProps & { class?: HTMLAttributes['class'] }>(), {
    orientation: 'vertical',
})

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})
</script>

<template>
    <ScrollAreaScrollbar
        :class="
      cn('flex touch-none select-none transition-colors',
         orientation === 'vertical'
           && 'h-full w-2.5 border-l border-l-transparent p-px',
         orientation === 'horizontal'
           && 'h-2.5 flex-col border-t border-t-transparent p-px',
         props.class)"
        v-bind="delegatedProps"
    >
        <ScrollAreaThumb class="relative flex-1 rounded-full bg-border"/>
    </ScrollAreaScrollbar>
</template>
