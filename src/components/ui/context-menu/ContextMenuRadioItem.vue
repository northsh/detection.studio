<script lang="ts" setup>
import type {ContextMenuRadioItemEmits, ContextMenuRadioItemProps} from 'radix-vue'
import {ContextMenuItemIndicator, ContextMenuRadioItem, useForwardPropsEmits,} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'
import {DotFilledIcon} from '@radix-icons/vue'

const props = defineProps<ContextMenuRadioItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ContextMenuRadioItemEmits>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
    <ContextMenuRadioItem
        :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      props.class,
    )"
        v-bind="forwarded"
    >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuItemIndicator>
        <DotFilledIcon class="h-4 w-4 fill-current"/>
      </ContextMenuItemIndicator>
    </span>
        <slot/>
    </ContextMenuRadioItem>
</template>
