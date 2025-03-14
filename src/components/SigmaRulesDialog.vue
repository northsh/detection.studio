<template>
  <Dialog :open="isOpen" @update:open="updateOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="w-full max-w-screen-lg" :class="{ 'h-[80vh]': isOpen }">
      <DialogHeader>
        <DialogTitle>Sigma Rules Library</DialogTitle>
        <DialogDescription>
          Browse and import rules from the SigmaHQ/sigma repository
        </DialogDescription>
      </DialogHeader>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-full pt-2">
        <SigmaRulesBrowser class="h-[60vh] border rounded-lg overflow-hidden" />
        <div class="md:col-span-2 h-[60vh] border rounded-lg overflow-hidden">
          <SigmaRuleViewer class="h-full" />
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" @click="closeDialog">Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';
import { Button } from './ui/button';
import SigmaRulesBrowser from './SigmaRulesBrowser.vue';
import SigmaRuleViewer from './SigmaRuleViewer.vue';

const props = defineProps<{
  open?: boolean;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const isOpen = ref(props.open || false);

function updateOpen(value: boolean) {
  isOpen.value = value;
  emit('update:open', value);
}

function closeDialog() {
  updateOpen(false);
}
</script>