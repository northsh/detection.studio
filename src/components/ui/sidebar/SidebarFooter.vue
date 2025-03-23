<script lang="ts" setup>
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <div
        :class="cn('flex flex-col gap-2 p-2', props.class)"
        data-sidebar="footer"
    >
        <slot/>
    </div>
</template>
