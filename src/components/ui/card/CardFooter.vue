<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {cn} from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
    <div
        data-slot="card-footer"
        :class="cn('flex items-center px-6 py-4 -mb-6 border-t bg-muted/30', props.class)"
    >
        <slot />
    </div>
</template>
