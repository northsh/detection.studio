<script setup lang="ts">
import {onMounted, ref} from 'vue';
import PrismEditor from './PrismEditor.vue';
import sigmaTemplate from '../templates/SigmaRuleTemplate';

// Import needed for registering sigma completions
import '../lib/sigma/autocomplete';

const props = defineProps<{
  modelValue?: string;
  validateOnChange?: boolean;
  class?: string;
}>();

const emits = defineEmits<{
  'update:modelValue': [value: string];
  'validation-result': [result: { valid: boolean; errors: string[] }];
}>();

const editorContent = ref<string>(props.modelValue || sigmaTemplate());

// Watch for changes and validate
const onEditorUpdate = (content: string) => {
  editorContent.value = content;
  emits('update:modelValue', content);
};

// Default to showing a basic template if no content is provided
onMounted(() => {
  if (!editorContent.value) {
    editorContent.value = sigmaTemplate();
    emits('update:modelValue', editorContent.value);
  }
});
</script>

<template>
  <PrismEditor
    v-model="editorContent"
    language="yaml"
    :lineNumbers="true"
    :insertSpaces="true"
    tabSize="2"
    :enableAutocompletion="true"
    :class="['h-full w-full border rounded', props.class]"
    @update:modelValue="onEditorUpdate"
  />
</template>
