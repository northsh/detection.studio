<script lang="ts" setup>
import type {ProgressRootProps} from 'radix-vue'
import {ProgressIndicator, ProgressRoot,} from 'radix-vue'
import type {HTMLAttributes} from 'vue'
import {computed} from 'vue'
import {cn} from '@/lib/utils'

const props = withDefaults(
    defineProps<ProgressRootProps & { class?: HTMLAttributes['class'] }>(),
    {
        modelValue: 0,
    },
)

const delegatedProps = computed(() => {
    const {class: _, ...delegated} = props

    return delegated
})
</script>

<template>
    <ProgressRoot
        :class="
      cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
        props.class,
      )
    "
        v-bind="delegatedProps"
    >
        <ProgressIndicator
            :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
            class="h-full w-full flex-1 bg-primary transition-all"
        />
    </ProgressRoot>
</template>
