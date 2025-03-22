<script lang="ts" setup>
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <div
        :class="cn('w-full text-sm', props.class)"
        data-sidebar="group-content"
    >
        <slot/>
    </div>
</template>
