<script lang="ts" setup>
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <div
        :class="cn('relative flex w-full min-w-0 flex-col p-2', props.class)"
        data-sidebar="group"
    >
        <slot/>
    </div>
</template>
