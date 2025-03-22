<script lang="ts" setup>
import {cn} from '@/lib/utils'
import {Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits} from 'reka-ui'
import {computed, type HTMLAttributes} from 'vue'
import {type ToggleVariants, toggleVariants} from '.'

const props = withDefaults(defineProps<ToggleProps & {
    class?: HTMLAttributes['class']
    variant?: ToggleVariants['variant']
    size?: ToggleVariants['size']
}>(), {
    variant: 'default',
    size: 'default',
    disabled: false,
})

const emits = defineEmits<ToggleEmits>()

const delegatedProps = computed(() => {
    const {class: _, size, variant, ...delegated} = props

    return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
    <Toggle
        :class="cn(toggleVariants({ variant, size }), props.class)"
        v-bind="forwarded"
    >
        <slot/>
    </Toggle>
</template>
