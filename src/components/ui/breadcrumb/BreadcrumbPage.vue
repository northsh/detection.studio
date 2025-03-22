<script lang="ts" setup>
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
      :class="cn('font-normal text-foreground', props.class)"
      aria-current="page"
      aria-disabled="true"
      role="link"
  >
    <slot/>
  </span>
</template>
