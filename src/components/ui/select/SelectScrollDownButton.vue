<script lang="ts" setup>
import type {SelectScrollDownButtonProps} from 'radix-vue'
import {SelectScrollDownButton, useForwardProps} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'
import {ChevronDownIcon} from '@radix-icons/vue'

const props = defineProps<SelectScrollDownButtonProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <SelectScrollDownButton :class="cn('flex cursor-default items-center justify-center py-1', props.class)"
                            v-bind="forwardedProps">
        <slot>
            <ChevronDownIcon/>
        </slot>
    </SelectScrollDownButton>
</template>
