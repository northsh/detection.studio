<script lang="ts" setup>
import type {SelectScrollUpButtonProps} from 'radix-vue'
import {SelectScrollUpButton, useForwardProps} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'
import {ChevronUpIcon} from '@radix-icons/vue'

const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <SelectScrollUpButton :class="cn('flex cursor-default items-center justify-center py-1', props.class)"
                          v-bind="forwardedProps">
        <slot>
            <ChevronUpIcon/>
        </slot>
    </SelectScrollUpButton>
</template>
