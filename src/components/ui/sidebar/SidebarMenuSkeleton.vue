<script lang="ts" setup>
import {cn} from '@/lib/utils'
import {Skeleton} from '@/components/ui/skeleton'
import {computed, type HTMLAttributes} from 'vue'

const props = defineProps<{
    showIcon?: boolean
    class?: HTMLAttributes['class']
}>()

const width = computed(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
})
</script>

<template>
    <div
        :class="cn('rounded-md h-8 flex gap-2 px-2 items-center', props.class)"
        data-sidebar="menu-skeleton"
    >
        <Skeleton
            v-if="showIcon"
            class="size-4 rounded-md"
            data-sidebar="menu-skeleton-icon"
        />

        <Skeleton
            :style="{ '--skeleton-width': width }"
            class="h-4 flex-1 max-w-(--skeleton-width)"
            data-sidebar="menu-skeleton-text"
        />
    </div>
</template>
