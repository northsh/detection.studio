<script lang="ts" setup>
import type {ScrollAreaRootProps} from 'radix-vue'
import {ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport,} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'
import ScrollBar from './ScrollBar.vue'

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})
</script>

<template>
    <ScrollAreaRoot :class="cn('relative overflow-hidden', props.class)" v-bind="delegatedProps">
        <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
            <slot/>
        </ScrollAreaViewport>
        <ScrollBar/>
        <ScrollAreaCorner/>
    </ScrollAreaRoot>
</template>
