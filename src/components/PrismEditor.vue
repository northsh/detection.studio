<script lang="ts" setup>
import {onMounted, useTemplateRef, watch} from "vue";
import type {PrismEditor} from "prism-code-editor/dist/types.d";
import {highlightSelectionMatches, searchWidget} from "prism-code-editor/search"
import {defaultCommands} from "prism-code-editor/commands"
import {cursorPosition} from "prism-code-editor/cursor"
import {copyButton} from "prism-code-editor/copy-button"
import {matchTags} from "prism-code-editor/match-tags"
import {highlightBracketPairs} from "prism-code-editor/highlight-brackets"
import {createEditor} from "prism-code-editor";
import {autoComplete, fuzzyFilter} from "prism-code-editor/autocomplete";

// Import Sigma autocomplete
import {sigmaCompletion} from "../lib/sigma/autocomplete";

import "prism-code-editor/search.css"
import "prism-code-editor/languages/html"
import "prism-code-editor/languages/clike"
import "prism-code-editor/languages/css"
import "prism-code-editor/prism/languages/markup"
import "prism-code-editor/prism/languages/css-extras"
import "prism-code-editor/prism/languages/javascript"
import "prism-code-editor/prism/languages/yaml"
import "prism-code-editor/prism/languages/splunk-spl"
import "prism-code-editor/layout.css"
import "prism-code-editor/scrollbar.css"
import "prism-code-editor/copy-button.css"
import "prism-code-editor/themes/github-dark.css"
import "prism-code-editor/autocomplete.css"
import "prism-code-editor/autocomplete-icons.css"


const props = withDefaults(
    defineProps<{
        modelValue?: string;
        language?: string;
        theme?: string;
        tabSize?: string | number;
        insertSpaces?: boolean;
        lineNumbers?: boolean;
        readOnly?: boolean;
        wordWrap?: boolean;
        class?: string;
        enableAutocompletion?: boolean;
    }>(),
    {
        modelValue: "",
        language: "javascript",
        theme: "github-dark",
        tabSize: "2",
        insertSpaces: false,
        lineNumbers: false,
        readOnly: false,
        wordWrap: false,
        class: "",
        enableAutocompletion: true,
    },
);

const emit = defineEmits<{
    "update:modelValue": [value: string];
    "selectionChange": [value: string];
    ready: [editor: PrismEditor];
}>();

const editorRef = useTemplateRef("prism-editor-ref");
let editor: PrismEditor;

onMounted(() => {
    if (!editorRef.value) return;

    // Create extensions array with the default ones
    const extensions = [
        highlightSelectionMatches(),
        searchWidget(),
        defaultCommands(),
        copyButton(),
        matchTags(),
        highlightBracketPairs(),
        cursorPosition(),
    ];

    // Add autocomplete extension if enabled
    if (props.enableAutocompletion) {
        // Register completions for YAML (Sigma uses YAML format)
        if (props.language === 'yaml') {
            extensions.push(
                autoComplete({
                    filter: fuzzyFilter,
                    closeOnBlur: true,
                    explicitOnly: false,
                    preferAbove: false,
                }, sigmaCompletion)
            );
        } else {
            // For other languages, just add basic autocomplete
            extensions.push(
                autoComplete({
                    filter: fuzzyFilter,
                    closeOnBlur: true,
                    explicitOnly: false,
                    preferAbove: false,
                })
            );
        }
    }

    editor = createEditor(
        editorRef.value,
        {
            value: props.modelValue,
            language: props.language,
            theme: props.theme,
            tabSize: props.tabSize,
            insertSpaces: props.insertSpaces,
            lineNumbers: props.lineNumbers,
            readOnly: props.readOnly,
            wordWrap: props.wordWrap,
        },
        ...extensions
    );

    editor.textarea?.addEventListener('beforeinput', () => {
        // Placeholder for potential input handling logic
    }, true);

    editor.on("update", (e: string) => {
        emit("update:modelValue", e);
    });

    editor.on("selectionChange", (e: string) => {
        emit("selectionChange", e);
    });

    // Emit the ready event with the editor instance
    emit("ready", editor);
});

// On prop change, notify the editor
watch(
    () => props.modelValue,
    () => {
        if (!editor) return;

        editor.setOptions({value: props.modelValue});
    },
);

watch(
    () => props.language,
    (newLanguage) => {
        if (!editor) return;

        editor.setOptions({language: newLanguage});
    }
);
</script>

<template>
  <div ref="prism-editor-ref" :class="props.class" class="prism-editor-ref"></div>
</template>

<style></style>
