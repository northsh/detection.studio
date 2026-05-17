<script lang="ts" setup>
import {onMounted, onBeforeUnmount, useTemplateRef, watch} from "vue";
import {useAppColorMode} from "@/composables/useAppColorMode";
import type {PrismEditor} from "prism-code-editor/dist/types.d";
import {highlightSelectionMatches, searchWidget} from "prism-code-editor/search"
import {defaultCommands} from "prism-code-editor/commands"
import {cursorPosition} from "prism-code-editor/cursor"
import {copyButton} from "prism-code-editor/copy-button"
import {matchTags} from "prism-code-editor/match-tags"
import {highlightBracketPairs} from "prism-code-editor/highlight-brackets"
import {indentGuides} from "prism-code-editor/guides";
import {createEditor} from "prism-code-editor";
import {autoComplete, fuzzyFilter} from "prism-code-editor/autocomplete";

// Import Sigma autocomplete (side-effect: registers completions for "yaml" language)
import "../lib/sigma/autocomplete";

// Import theme CSS as raw strings so we can swap them at runtime.
// Static imports of both CSS files would mean whichever loads last wins permanently.
import githubDarkCss from "prism-code-editor/themes/github-dark.css?inline";
import githubLightCss from "prism-code-editor/themes/github-light.css?inline";

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
import "prism-code-editor/autocomplete.css"
import "prism-code-editor/autocomplete-icons.css"

const { isDark } = useAppColorMode();

// Shared <style> tag for the prism theme — one per app, swapped on mode change.
let themeStyleEl: HTMLStyleElement | null = null;

function getThemeCss() {
    return isDark.value ? githubDarkCss : githubLightCss;
}

function applyTheme() {
    if (!themeStyleEl) {
        themeStyleEl = document.createElement("style");
        themeStyleEl.id = "prism-theme";
        document.head.appendChild(themeStyleEl);
    }
    themeStyleEl.textContent = getThemeCss();
}

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        language?: string;
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
const cleanups: (() => void)[] = [];

onMounted(() => {
    if (!editorRef.value) return;

    // Apply the correct theme immediately on mount
    applyTheme();

    // Create extensions array with the default ones
    const extensions = [
        highlightSelectionMatches(),
        searchWidget(),
        defaultCommands(),
        copyButton(),
        matchTags(),
        highlightBracketPairs(),
        cursorPosition(),
        indentGuides(),
    ];

    // Add autocomplete extension if enabled
    if (props.enableAutocompletion) {
        extensions.push(
            autoComplete({
                filter: fuzzyFilter,
                closeOnBlur: true,
                explicitOnly: false,
                preferAbove: false,
            })
        );
    }

    editor = createEditor(
        editorRef.value,
        {
            value: props.modelValue,
            language: props.language,
            tabSize: props.tabSize,
            insertSpaces: props.insertSpaces,
            lineNumbers: props.lineNumbers,
            readOnly: props.readOnly,
            wordWrap: props.wordWrap,
        },
        ...extensions
    );

    editor.textarea?.addEventListener('beforeinput', () => {}, true);

    cleanups.push(editor.on("update", (value: string) => {
        emit("update:modelValue", value);
    }));

    cleanups.push(editor.on("selectionChange", (_selection, value: string) => {
        emit("selectionChange", value);
    }));

    emit("ready", editor);
});

onBeforeUnmount(() => {
    cleanups.forEach(cleanup => cleanup());
    cleanups.length = 0;
    editor?.remove();
});

watch(() => props.modelValue, () => {
    if (!editor) return;
    editor.setOptions({value: props.modelValue});
});

watch(() => props.language, (newLanguage) => {
    if (!editor) return;
    editor.setOptions({language: newLanguage});
});

// Swap the theme style tag when dark/light changes
watch(isDark, () => {
    applyTheme();
});
</script>

<template>
  <div ref="prism-editor-ref" :class="props.class" class="prism-editor-ref"></div>
</template>

<style></style>
