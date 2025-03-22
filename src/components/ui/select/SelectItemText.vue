<script lang="ts" setup>
import type {SelectItemTextProps} from 'radix-vue'
import {SelectItemText} from 'radix-vue'

const props = defineProps<SelectItemTextProps>()
</script>

<template>
    <SelectItemText v-bind="props">
        <slot/>
    </SelectItemText>
</template>
