<script lang="ts" setup>
import type {DropdownMenuTriggerProps} from 'radix-vue'
import {DropdownMenuTrigger, useForwardProps} from 'radix-vue'

const props = defineProps<DropdownMenuTriggerProps>()

const forwardedProps = useForwardProps(props)
</script>

<template>
    <DropdownMenuTrigger class="outline-hidden" v-bind="forwardedProps">
        <slot/>
    </DropdownMenuTrigger>
</template>
