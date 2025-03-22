<script lang="ts" setup>
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <li
        :class="cn('group/menu-item relative', props.class)"
        data-sidebar="menu-item"
    >
        <slot/>
    </li>
</template>
