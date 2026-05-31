<script lang="ts" setup>
import {useWorkspaceStore} from "@/stores/WorkspaceStore.ts";
import {computed, ref, onMounted, onBeforeUnmount} from "vue";
import { useChangeCase } from '@vueuse/integrations/useChangeCase'
import {useHead} from "@unhead/vue";
import PrismEditor from "./PrismEditor.vue";
import {ScrollArea} from "@/components/ui/scroll-area";


/**
 * Head
 */
useHead({
    title: 'Detection Studio – detection.studio',
    meta: [
        {
            name: 'description',
            content: 'Design, build and share detection rules for your security tools.',
        },
    ],
})


/**
 * Stores
 */
const workspace = useWorkspaceStore();
const sigma = computed(() => workspace.currentWorkspace?.sigmaStore());


const isReady = computed(() => {
    return sigma.value.isReady;
});

/**
 * Loading messages
 */
const loadingMessages = [
    // "Finding Attackers...",
    "Crafting \"next-gen\" Sigma rules...",
    "Hunting APT groups...",
    "Correlating suspicious events...",
    "Decoding obfuscated PowerShell...",
    "Detecting lateral movement...",
    "Analyzing behavior patterns...",
    "Investigating suspicious DNS queries...",
    "Scanning memory for IOCs...",
    "Chasing false positives away...",
    "Finding the next APT group...",
    "Decoding the latest Cobalt Strike...",
    "Hunting for the elusive \"Red Team\"...",
    "Searching for the next \"big\" threat...",
    "Going through the Sigma rule PR backlog...",
    "Sending Florian Roth an angry tweet...",


];

const index = ref(Math.floor(Math.random() * loadingMessages.length));
const currentLoadingMessage = computed(() => loadingMessages[index.value]);
let messageInterval: number | null = null;

// Cycle through messages every 3 seconds
onMounted(() => {
    messageInterval = window.setInterval(() => {
        index.value = (index.value + 1) % loadingMessages.length;
    }, 3000);
});

onBeforeUnmount(() => {
    if (messageInterval !== null) {
        clearInterval(messageInterval);
    }
});

const siem_title = computed(() => {
    return useChangeCase(sigma.value.selected_siem, 'sentenceCase')
});

/**
 * Parse a raw Python/Sigma error into a structured, user-friendly message.
 */
interface ParsedError {
    category: string;
    message: string;
    hint: string;
}

function parseSigmaError(raw: string): ParsedError {
    if (!raw) return { category: "", message: "", hint: "" };

    // ── 1. Extract the final meaningful error line ──
    // Python tracebacks chain errors with "The above exception ..." blocks.
    // The last `sigma.*Error:` or `SigmaError:` line is the most relevant.
    const sigmaErrorMatch = raw.match(/sigma\.\w+\.\w+:\s*(.+?)$/m)
        ?? raw.match(/SigmaError:\s*(.+?)$/m);

    const errorBody = sigmaErrorMatch ? sigmaErrorMatch[1].trim() : raw.trim();

    // ── 2. Classify the error and extract an actionable detail ──

    // Pipeline / transformation errors
    const transformationMatch = errorBody.match(
        /Error processing custom pipeline:.*?Error in transformation:\s*(.+)/
    );
    if (transformationMatch) {
        const detail = transformationMatch[1].trim();

        // "X.__init__() got an unexpected keyword argument 'Y'"
        const unexpectedArg = detail.match(
            /(\w+)\.__init__\(\) got an unexpected keyword argument '(\w+)'/
        );
        if (unexpectedArg) {
            const transformClass = unexpectedArg[1]
                .replace(/Transformation$/, "")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .toLowerCase();
            const badParam = unexpectedArg[2];
            return {
                category: "Pipeline Error",
                message: `The "${transformClass}" transformation does not accept the parameter "${badParam}".`,
                hint: `Remove or rename "${badParam}" in your pipeline YAML. Check the Sigma pipeline documentation for supported parameters for this transformation type.`,
            };
        }

        // "X.__init__() missing required argument: 'Y'"
        const missingArg = detail.match(
            /(\w+)\.__init__\(\) missing.*required.*argument.*'(\w+)'/
        );
        if (missingArg) {
            const transformClass = missingArg[1]
                .replace(/Transformation$/, "")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .toLowerCase();
            const param = missingArg[2];
            return {
                category: "Pipeline Error",
                message: `The "${transformClass}" transformation requires the parameter "${param}".`,
                hint: `Add "${param}" to this transformation in your pipeline YAML.`,
            };
        }

        // Generic transformation error
        return {
            category: "Pipeline Error",
            message: detail,
            hint: "Review the transformation definition in your pipeline YAML.",
        };
    }

    // Pipeline processing rule N errors
    const processingRuleMatch = errorBody.match(
        /Error in processing rule (\d+):\s*(.+)/
    );
    if (processingRuleMatch) {
        return {
            category: "Pipeline Error",
            message: processingRuleMatch[2].trim(),
            hint: `Check transformation #${processingRuleMatch[1]} in your pipeline YAML.`,
        };
    }

    // Built-in pipeline loading errors
    const builtinPipelineMatch = errorBody.match(
        /Error loading built-in pipelines.*?:\s*(.+)/
    );
    if (builtinPipelineMatch) {
        return {
            category: "Pipeline Error",
            message: builtinPipelineMatch[1].trim(),
            hint: "Make sure the pipeline name is correct and available for your selected backend.",
        };
    }

    // Filter processing errors
    const filterMatch = errorBody.match(/Filter processing error:\s*(.+)/);
    if (filterMatch) {
        return {
            category: "Filter Error",
            message: filterMatch[1].trim(),
            hint: "Check the YAML syntax and field names in your filter definition.",
        };
    }

    // Backend / format errors
    const backendMatch = errorBody.match(/Backend '(\w+)' (.+)/);
    if (backendMatch) {
        return {
            category: "Backend Error",
            message: `Backend "${backendMatch[1]}" ${backendMatch[2]}`,
            hint: "Select a different backend or check your configuration.",
        };
    }

    const formatMatch = errorBody.match(/Output format '(\w+)' (.+)/);
    if (formatMatch) {
        return {
            category: "Format Error",
            message: `Output format "${formatMatch[1]}" ${formatMatch[2]}`,
            hint: "Check the available output formats for your selected backend.",
        };
    }

    // Correlation method errors
    const correlationMatch = errorBody.match(/Correlation method '(\w+)' (.+)/);
    if (correlationMatch) {
        return {
            category: "Correlation Error",
            message: `Correlation method "${correlationMatch[1]}" ${correlationMatch[2]}`,
            hint: "Check the available correlation methods for your selected backend.",
        };
    }

    // Rule reference errors (common in correlations)
    const ruleRefMatch = errorBody.match(/Rule '([^']+)' not found/);
    if (ruleRefMatch) {
        return {
            category: "Rule Error",
            message: `Referenced rule "${ruleRefMatch[1]}" was not found.`,
            hint: 'Make sure the referenced rule is included in the same file (separated by "---") or supplied alongside this rule.',
        };
    }

    // YAML parse errors
    const yamlMatch = errorBody.match(/YAML parsing error:\s*(.+)/i)
        ?? errorBody.match(/yaml\.scanner\.ScannerError:\s*(.+)/i)
        ?? errorBody.match(/yaml\.parser\.ParserError:\s*(.+)/i);
    if (yamlMatch) {
        return {
            category: "YAML Error",
            message: yamlMatch[1].trim(),
            hint: "Check your YAML syntax — look for incorrect indentation, missing colons, or invalid characters.",
        };
    }

    // Fallback: return the last line of the raw error as the message
    const lines = raw.trim().split("\n");
    const lastLine = lines[lines.length - 1].trim();
    // Strip Python exception class prefix if present
    const cleaned = lastLine.replace(/^[\w.]+Error:\s*/, "");

    return {
        category: "Error",
        message: cleaned || lastLine,
        hint: "",
    };
}

const parsedError = computed(() => parseSigmaError(sigma.value?.siem_conversion_error ?? ""));
const showRawError = ref(false);
</script>
<template>
  <div class="h-full w-full rounded-xl bg-muted relative overflow-hidden flex flex-col">
    <div class="flex items-center gap-2 px-3 py-1.5">
      <h3 class="text-xs font-medium">SIEM Query Output</h3>
      <p class="text-xs font-bold text-muted-foreground title">
        {{ siem_title }}
      </p>
    </div>

    <!-- Loading overlay -->
    <Transition name="fade">
      <div
        v-if="!isReady && !sigma.siem_conversion_error"
        class="absolute inset-0 flex items-center justify-center z-10 bg-secondary/70 backdrop-blur-sm"
      >
        <div class="text-center px-4 py-8 gap-4 flex flex-col items-center">
          <div
            class="animate-spin h-8 w-8 border-4 border-secondary border-t-primary rounded-full mx-auto"
          ></div>
          <div class="animate-pulse text-secondary-foreground text-lg font-medium">
            {{ currentLoadingMessage }}
          </div>
        </div>
      </div>
    </Transition>

    <div
      v-if="sigma.siem_conversion_error"
      class="absolute inset-0 flex z-10 bg-red-100/80 dark:bg-red-950/60 backdrop-blur-sm"
    >
      <ScrollArea class="h-full w-full">
        <div class="p-6 md:p-10 space-y-4 max-w-full">
          <!-- Category badge -->
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold bg-red-500/10 text-red-800 ring-1 ring-red-700/20 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/25">
              {{ parsedError.category }}
            </span>
          </div>

          <!-- Main error message -->
          <p class="text-red-900 dark:text-red-200 text-sm md:text-base font-medium leading-relaxed break-words whitespace-pre-wrap">
            {{ parsedError.message }}
          </p>

          <!-- Hint -->
          <p v-if="parsedError.hint" class="text-red-800/80 dark:text-red-300/70 text-xs md:text-sm leading-relaxed break-words whitespace-pre-wrap">
            {{ parsedError.hint }}
          </p>

          <!-- Toggle raw traceback -->
          <button
            class="text-red-700/50 dark:text-red-400/50 text-xs underline underline-offset-2 hover:text-red-800 dark:hover:text-red-300 transition-colors cursor-pointer"
            @click="showRawError = !showRawError"
          >
            {{ showRawError ? 'Hide' : 'Show' }} full error
          </button>
          <pre
            v-if="showRawError"
            class="text-red-800/70 dark:text-red-400/60 text-[10px] md:text-xs leading-relaxed whitespace-pre-wrap break-words overflow-x-hidden bg-red-200/50 dark:bg-red-950/30 rounded-md p-3 mt-2"
          >{{ sigma.siem_conversion_error }}</pre>
        </div>
      </ScrollArea>
    </div>

    <PrismEditor
      id="siem-query-editor"
      v-model:model-value="sigma.siem_query"
      :read-only="true"
      :word-wrap="true"
      class="h-full w-full m-[0.5px] rounded border-border text-xs md:text-sm overflow-y-auto overflow-x-hidden bg-[#0D1118]"
      language="splunk-spl"
    />
  </div>
</template>

<style scoped>
/* Fade transition for loading screen */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
