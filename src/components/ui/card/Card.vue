<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {cn} from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
    <div
        :class="
      cn(
        'rounded-lg bg-card text-card-foreground flex flex-col gap-6 border py-6 overflow-hidden dark:shadow-sm',
        props.class,
      )
    "
    >
        <slot />
    </div>
</template>
