<script lang="ts" setup>
import type {PrimitiveProps} from 'reka-ui'
import {Primitive} from 'reka-ui'
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<PrimitiveProps & {
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="cn(
      'duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-hidden ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
      props.class)"
        data-sidebar="group-label"
    >
        <slot/>
    </Primitive>
</template>
