<script lang="ts" setup>
import {onMounted, useTemplateRef, watch} from "vue";
import type {PrismEditor} from "prism-code-editor/dist/types.d";
import {highlightSelectionMatches, searchWidget} from "prism-code-editor/search"
import {defaultCommands} from "prism-code-editor/commands"
import {cursorPosition} from "prism-code-editor/cursor"
import {copyButton} from "prism-code-editor/copy-button"
import {matchTags} from "prism-code-editor/match-tags"
import {highlightBracketPairs} from "prism-code-editor/highlight-brackets"
import {indentGuides} from "prism-code-editor/guides";
import {createEditor} from "prism-code-editor";

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
    }>(),
    {
        modelValue: "",
        language: "javascript",
        theme: "github-dark",
        tabSize: "4",
        insertSpaces: false,
        lineNumbers: false,
        readOnly: false,
        wordWrap: false,
        class: "",
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
        highlightSelectionMatches(),
        searchWidget(),
        defaultCommands(),
        copyButton(),
        matchTags(),
        highlightBracketPairs(),
        cursorPosition(),
        indentGuides(),
        // editHistory(),
    )

    // const test = copyButton()

    // const addTooltip = (editor: PrismEditor, element: HTMLElement, fixedWidth?: boolean): [ShowTooltip, HideTooltip]

    /**
     * Tooltip
     */
    const tooltipRef = useTemplateRef("tooltip");

    // const tooltip = document.createElement('div');
    // tooltip.className = 'bg-card shadow border border-border rounded-md p-2 text-xs text-white';
    // tooltip.textContent = 'Cannot edit read-only editor.';
    //
    // const [show, hide] = addTooltip(editor, tooltip, false)
    // show()

    editor.textarea?.addEventListener('beforeinput', () => {
        // debugger
        // show();
    }, true);
    // editor.textarea.addEventListener('click', hide);

    editor.addListener("update", (e: string) => {
        emit("update:modelValue", e);
    });

    editor.addListener("selectionChange", (e: string) => {
        // hide()
        // show();
        emit("selectionChange", e);
    });
});

// On prop change, notify the editor
watch(
    () => props.modelValue,
    () => {
        if (!editor) return;

        editor.setOptions({value: props.modelValue});
    },
);
</script>

<template>
    <div ref="prism-editor-ref" :class="props.class" class="prism-editor-ref"></div>
</template>

<style>
</style>
