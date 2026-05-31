/** @module autocomplete/sigma */

import { registerCompletions } from "prism-code-editor/autocomplete";
import type { Completion, CompletionSource } from "./types.ts";
import { optionsFromKeys } from "./utils.ts";

import {
  categoryValues,
  conditionPatterns,
  correlationConditionOperators,
  correlationFields,
  correlationTypeValues,
  detectionFields,
  detectionItemConditionTypes,
  fieldNameConditionTypes,
  filterFields,
  finalizerTypes,
  levelValues,
  logsourceFields,
  mitreTactics,
  pipelineFields,
  productValues,
  ruleConditionTypes,
  serviceValues,
  sigmaFields,
  sigmaModifiers,
  statusValues,
  timespanValues,
  transformationFields,
  transformationTypes,
  windowsEventIds,
} from "./data.ts";
import type { PrismEditor } from "prism-code-editor";

// Pattern to match field modifiers
const fieldModifierPattern = /([a-zA-Z0-9_]+)(\|[a-zA-Z0-9_]+)*:?\s*$/;

// Pattern to match indentation
const indentationPattern = /^(\s*)/;

// Determine if we're inside a specific section
function isInSection(before: string, sectionName: string): boolean {
  const lines = before.split("\n");
  let inSection = false;
  let indentation = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(new RegExp(`^\\s*${sectionName}\\s*:`));

    if (match) {
      inSection = true;
      indentation = (line.match(/^\s*/) || [""])[0].length;
      continue;
    }

    if (inSection) {
      const currentIndent = (line.match(/^\s*/) || [""])[0].length;
      if (line.trim() === "" || currentIndent > indentation) {
        continue;
      } else {
        inSection = false;
      }
    }
  }

  return inSection;
}

// Extract the current line's indentation
function getIndentation(before: string): string {
  const lastLine = before.split("\n").pop() || "";
  const match = lastLine.match(indentationPattern);
  return match ? match[1] : "";
}

// Get detection section selection names (direct children of detection only)
function getSelectionNames(fullText: string): string[] {
  const lines = fullText.split("\n");
  const selectionNames: string[] = [];
  let inDetection = false;
  let detectionIndent = -1;
  let childIndent = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^\s*detection\s*:/)) {
      inDetection = true;
      detectionIndent = (line.match(/^\s*/) || [""])[0].length;
      childIndent = -1;
      continue;
    }

    if (!inDetection) continue;

    const currentIndent = (line.match(/^\s*/) || [""])[0].length;

    // Skip blank lines
    if (line.trim() === "") continue;

    // If we've returned to detection level or above, we've left the section
    if (currentIndent <= detectionIndent) {
      inDetection = false;
      continue;
    }

    // Determine the direct-child indent level from the first child we see
    if (childIndent === -1) {
      childIndent = currentIndent;
    }

    // Only extract keys at exactly the direct-child indent level
    if (currentIndent !== childIndent) continue;

    // Must be a key: value line (not condition)
    if (!line.match(/^\s*condition\s*:/) && line.includes(":")) {
      const selectionName = line.trim().split(":")[0].trim();
      if (selectionName && !selectionNames.includes(selectionName)) {
        selectionNames.push(selectionName);
      }
    }
  }

  return selectionNames;
}

// Define context type for Sigma completions
interface SigmaCompletionContext {
  inLogsource: boolean;
  inDetection: boolean;
  inCorrelation: boolean;
  inFilter: boolean;
  inTransformations: boolean;
  inFinalizers: boolean;
  fieldModifier: string | null;
  selectionNames: string[];
  /** True when doc appears to be a pipeline file (has `transformations:` at top level) */
  isPipeline: boolean;
}

// Extract context for Sigma completions
const sigmaContext = (context: any, editor: PrismEditor): SigmaCompletionContext => {
  const { before } = context;
  const fullText = editor.value;
  const isPipeline = /^transformations\s*:/m.test(fullText);
  return {
    inLogsource: isInSection(before, "logsource"),
    inDetection: isInSection(before, "detection"),
    inCorrelation: isInSection(before, "correlation"),
    inFilter: isInSection(before, "filter"),
    inTransformations: isInSection(before, "transformations"),
    inFinalizers: isInSection(before, "finalizers"),
    fieldModifier: (before.match(fieldModifierPattern) || [])[1] || null,
    selectionNames: getSelectionNames(fullText),
    isPipeline,
  };
};

/**
 * Helper: extract the current word being typed (identifier chars at end of lineBefore).
 * Returns [word, startOffset] where startOffset is the position in the document where the word starts.
 */
function getCurrentWord(lineBefore: string, pos: number): [string, number] {
  const match = lineBefore.match(/([a-zA-Z0-9_]*)$/);
  const word = match ? match[1] : "";
  return [word, pos - word.length];
}

/**
 * Helper: extract the value being typed after a colon.
 * Returns [value, startOffset] or null if not after a colon.
 */
function getValueAfterColon(lineBefore: string, pos: number): [string, number] | null {
  const match = lineBefore.match(/:\s*([a-zA-Z0-9_.]*)$/);
  if (!match) return null;
  const value = match[1];
  return [value, pos - value.length];
}

// Define completion sources
const sources: CompletionSource<SigmaCompletionContext>[] = [
  // Top-level field completions (Sigma rules / meta rules)
  (context, _) => {
    const { before, lineBefore, explicit, inLogsource, inDetection, inCorrelation, inFilter, inTransformations, inFinalizers, isPipeline } = context;
    const indent = getIndentation(before);

    // Don't offer top-level fields if we're inside any section
    if (inLogsource || inDetection || inCorrelation || inFilter || inTransformations || inFinalizers) return null;

    // Check if the line looks like a field name being typed (no colon yet on this line)
    if (lineBefore.includes(":")) return null;

    // Must be at top-level indentation (0)
    if (indent.length !== 0) return null;

    const [word, from] = getCurrentWord(lineBefore, context.pos);

    // Only trigger if explicitly requested or at least 1 char typed
    if (!explicit && word.length === 0) return null;

    // Choose field set based on document type
    const fields = isPipeline ? pipelineFields : sigmaFields;

    return {
      from,
      options: optionsFromKeys(fields, "property"),
    };
  },

  // Logsource field completions
  (context, _) => {
    const { lineBefore, inLogsource, explicit } = context;

    if (!inLogsource) return null;

    // Don't suggest field names if there's already a colon (user is typing a value)
    if (lineBefore.includes(":")) return null;

    const [word, from] = getCurrentWord(lineBefore, context.pos);
    if (!explicit && word.length === 0) return null;

    return {
      from,
      options: optionsFromKeys(logsourceFields, "property"),
    };
  },

  // Category value completions
  (context, _) => {
    const { lineBefore, inLogsource, explicit } = context;
    if (!inLogsource) return null;

    // Check if we're on a line with "category:"
    if (!lineBefore.match(/category\s*:/)) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;

    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: categoryValues.map((v) => ({ label: v, icon: "constant" })),
    };
  },

  // Product value completions
  (context, _) => {
    const { lineBefore, inLogsource, explicit } = context;
    if (!inLogsource) return null;

    if (!lineBefore.match(/product\s*:/)) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;

    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: productValues.map((v) => ({ label: v, icon: "constant" })),
    };
  },

  // Service value completions
  (context, _) => {
    const { lineBefore, inLogsource, explicit } = context;
    if (!inLogsource) return null;

    if (!lineBefore.match(/service\s*:/)) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;

    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: serviceValues.map((v) => ({ label: v, icon: "constant" })),
    };
  },

  // Level value completions
  (context, _) => {
    const { lineBefore, explicit } = context;

    if (!lineBefore.match(/level\s*:/)) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;

    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: levelValues.map((v) => ({ label: v, icon: "enum" })),
    };
  },

  // Status value completions
  (context, _) => {
    const { lineBefore, explicit } = context;

    if (!lineBefore.match(/status\s*:/)) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;

    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: statusValues.map((v) => ({ label: v, icon: "enum" })),
    };
  },

  // Tags completions (MITRE ATT&CK tactics)
  (context, _) => {
    const { before, lineBefore, explicit } = context;

    // Check if we're in a tags list item (line starts with "- " or "  - ")
    const tagItemMatch = lineBefore.match(/^\s*-\s+([a-zA-Z0-9_.]*)?$/);
    if (!tagItemMatch) return null;

    // Check that we're inside a tags section
    if (!isInSection(before, "tags")) return null;

    const word = tagItemMatch[1] || "";
    const from = context.pos - word.length;

    if (!explicit && word.length === 0) return null;

    return {
      from,
      options: mitreTactics.map((value) => ({
        label: value,
        icon: "constant",
      })),
    };
  },

  // Detection field completions (selection names, condition)
  (context, _) => {
    const { before, lineBefore, inDetection, explicit } = context;

    if (!inDetection) return null;

    // Don't suggest field names if there's already a colon on this line
    if (lineBefore.includes(":")) return null;

    const [word, from] = getCurrentWord(lineBefore, context.pos);
    if (!explicit && word.length === 0) return null;

    // Exclude "condition" if already defined
    const hasCondition = before.includes("condition:");
    const options = optionsFromKeys(detectionFields, "property");

    if (hasCondition) {
      return {
        from,
        options: options.filter((o) => o.label !== "condition"),
      };
    }

    return { from, options };
  },

  // Field modifiers (after | character)
  (context, _) => {
    const { lineBefore } = context;

    // Match when typing after a pipe: e.g. "FieldName|con" or "FieldName|contains|end"
    const modifierMatch = lineBefore.match(/([a-zA-Z0-9_]+(?:\|[a-zA-Z0-9_]+)*)\|([a-zA-Z0-9_]*)$/);
    if (!modifierMatch) return null;

    const partial = modifierMatch[2];
    const from = context.pos - partial.length;

    return {
      from,
      options: sigmaModifiers.map((value) => ({
        label: value,
        icon: "function",
      })),
    };
  },

  // Condition value completions
  (context, _) => {
    const { lineBefore, inDetection, selectionNames, explicit } = context;

    if (!inDetection) return null;

    // Check if we're on a condition line (after "condition:")
    if (!lineBefore.match(/condition\s*:/)) return null;

    const valueInfo = lineBefore.match(/condition\s*:\s*(.*)$/);
    if (!valueInfo) return null;

    const typed = valueInfo[1];

    // If nothing typed yet after the colon, offer full condition patterns
    if (typed.trim().length === 0) {
      if (!explicit) return null;
      return {
        from: context.pos,
        options: conditionPatterns.map((pattern) => ({
          label: pattern,
          icon: "keyword",
        })),
      };
    }

    // Otherwise, complete the last word/token being typed
    const lastWordMatch = typed.match(/([a-zA-Z0-9_*]*)$/);
    const lastWord = lastWordMatch ? lastWordMatch[1] : "";
    const from = context.pos - lastWord.length;

    if (!explicit && lastWord.length === 0) return null;

    // Offer condition keywords + actual selection names
    const conditionKeywords = ["and", "or", "not", "1", "all", "of", "them"];
    const options: Completion[] = conditionKeywords.map((kw) => ({
      label: kw,
      icon: "keyword",
    }));

    // Add selection names and wildcard patterns
    selectionNames.forEach((name) => {
      options.push({ label: name, icon: "variable" });
    });

    // Add common wildcard patterns based on selection name prefixes
    const prefixes = new Set<string>();
    selectionNames.forEach((name) => {
      const match = name.match(/^([a-zA-Z]+)_/);
      if (match) prefixes.add(match[1]);
    });
    prefixes.forEach((prefix) => {
      options.push({ label: `${prefix}*`, icon: "variable" });
    });

    return { from, options };
  },

  // Windows Event ID completions
  (context, _) => {
    const { lineBefore, inDetection, explicit } = context;

    if (!inDetection) return null;

    if (!lineBefore.match(/EventID\s*:/)) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;

    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: windowsEventIds.map((id) => ({
        label: id,
        icon: "constant",
      })),
    };
  },

  // ── Correlation section completions ──

  // Correlation field names (direct children of `correlation:`)
  (context, _) => {
    const { lineBefore, inCorrelation, explicit } = context;
    if (!inCorrelation) return null;
    if (lineBefore.includes(":")) return null;

    const [word, from] = getCurrentWord(lineBefore, context.pos);
    if (!explicit && word.length === 0) return null;

    return {
      from,
      options: optionsFromKeys(correlationFields, "property"),
    };
  },

  // Correlation type value completions
  (context, _) => {
    const { lineBefore, inCorrelation, explicit } = context;
    if (!inCorrelation) return null;
    if (!lineBefore.match(/type\s*:/)) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;
    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: correlationTypeValues.map((v) => ({ label: v, icon: "enum" })),
    };
  },

  // Correlation timespan value completions
  (context, _) => {
    const { lineBefore, inCorrelation, explicit } = context;
    if (!inCorrelation) return null;
    if (!lineBefore.match(/timespan\s*:/)) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;
    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: timespanValues.map((v) => ({ label: v, icon: "constant" })),
    };
  },

  // Correlation generate value completions
  (context, _) => {
    const { lineBefore, inCorrelation, explicit } = context;
    if (!inCorrelation) return null;
    if (!lineBefore.match(/generate\s*:/)) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;
    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: [
        { label: "true", icon: "constant" },
        { label: "false", icon: "constant" },
      ],
    };
  },

  // Correlation condition operator completions (gte, gt, lte, lt, eq)
  (context, _) => {
    const { before, lineBefore, inCorrelation, explicit } = context;
    if (!inCorrelation) return null;

    // Must be inside the correlation > condition sub-section
    if (!isInSection(before, "condition")) return null;
    if (lineBefore.includes(":")) return null;

    const [word, from] = getCurrentWord(lineBefore, context.pos);
    if (!explicit && word.length === 0) return null;

    const options: Completion[] = correlationConditionOperators.map((op) => ({
      label: op,
      icon: "keyword",
    }));
    // Also offer "field" for value_count conditions
    options.push({ label: "field", icon: "property" });

    return { from, options };
  },

  // ── Filter section completions ──

  // Filter field names (direct children of `filter:`)
  (context, _) => {
    const { lineBefore, inFilter, explicit } = context;
    if (!inFilter) return null;
    if (lineBefore.includes(":")) return null;

    const [word, from] = getCurrentWord(lineBefore, context.pos);
    if (!explicit && word.length === 0) return null;

    return {
      from,
      options: optionsFromKeys(filterFields, "property"),
    };
  },

  // Filter condition value completions (not selection, selection, etc.)
  (context, _) => {
    const { lineBefore, inFilter, explicit } = context;
    if (!inFilter) return null;
    if (!lineBefore.match(/condition\s*:/)) return null;

    const valueInfo = lineBefore.match(/condition\s*:\s*(.*)$/);
    if (!valueInfo) return null;

    const typed = valueInfo[1];
    const lastWordMatch = typed.match(/([a-zA-Z0-9_*]*)$/);
    const lastWord = lastWordMatch ? lastWordMatch[1] : "";
    const from = context.pos - lastWord.length;

    if (!explicit && lastWord.length === 0) return null;

    const options: Completion[] = [
      { label: "not", icon: "keyword" },
      { label: "selection", icon: "variable" },
      { label: "and", icon: "keyword" },
      { label: "or", icon: "keyword" },
    ];

    return { from, options };
  },

  // Filter rules value completions
  (context, _) => {
    const { lineBefore, inFilter, explicit } = context;
    if (!inFilter) return null;
    if (!lineBefore.match(/rules\s*:/)) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;
    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: [{ label: "any", icon: "keyword" }],
    };
  },

  // ── Pipeline section completions ──

  // Transformation field completions (inside transformations list items)
  (context, _) => {
    const { lineBefore, inTransformations, explicit } = context;
    if (!inTransformations) return null;
    if (lineBefore.includes(":")) return null;

    const [word, from] = getCurrentWord(lineBefore, context.pos);
    if (!explicit && word.length === 0) return null;

    return {
      from,
      options: optionsFromKeys(transformationFields, "property"),
    };
  },

  // Transformation type value completions (only at transformation level, not inside condition sub-sections)
  (context, _) => {
    const { before, lineBefore, inTransformations, explicit } = context;
    if (!inTransformations) return null;
    if (!lineBefore.match(/type\s*:/)) return null;

    // Don't offer transformation types if we're inside a condition sub-section
    if (isInSection(before, "rule_conditions")) return null;
    if (isInSection(before, "detection_item_conditions")) return null;
    if (isInSection(before, "field_name_conditions")) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;
    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: transformationTypes.map((v) => ({ label: v, icon: "enum" })),
    };
  },

  // Rule condition type completions (inside rule_conditions)
  (context, _) => {
    const { before, lineBefore, inTransformations, explicit } = context;
    if (!inTransformations) return null;

    // Must be on a line with "type:" inside a rule_conditions context
    if (!lineBefore.match(/type\s*:/)) return null;
    if (!isInSection(before, "rule_conditions")) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;
    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: ruleConditionTypes.map((v) => ({ label: v, icon: "enum" })),
    };
  },

  // Detection item condition type completions
  (context, _) => {
    const { before, lineBefore, inTransformations, explicit } = context;
    if (!inTransformations) return null;

    if (!lineBefore.match(/type\s*:/)) return null;
    if (!isInSection(before, "detection_item_conditions")) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;
    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: detectionItemConditionTypes.map((v) => ({ label: v, icon: "enum" })),
    };
  },

  // Field name condition type completions
  (context, _) => {
    const { before, lineBefore, inTransformations, explicit } = context;
    if (!inTransformations) return null;

    if (!lineBefore.match(/type\s*:/)) return null;
    if (!isInSection(before, "field_name_conditions")) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;
    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: fieldNameConditionTypes.map((v) => ({ label: v, icon: "enum" })),
    };
  },

  // Finalizer field completions (inside finalizers list)
  (context, _) => {
    const { lineBefore, inFinalizers, explicit } = context;
    if (!inFinalizers) return null;
    if (lineBefore.includes(":")) return null;

    const [word, from] = getCurrentWord(lineBefore, context.pos);
    if (!explicit && word.length === 0) return null;

    const options: Completion[] = [
      { label: "type", icon: "property" },
      { label: "separator", icon: "property" },
      { label: "prefix", icon: "property" },
      { label: "suffix", icon: "property" },
      { label: "indent", icon: "property" },
      { label: "template", icon: "property" },
    ];

    return { from, options };
  },

  // Finalizer type value completions
  (context, _) => {
    const { lineBefore, inFinalizers, explicit } = context;
    if (!inFinalizers) return null;
    if (!lineBefore.match(/type\s*:/)) return null;

    const valueInfo = getValueAfterColon(lineBefore, context.pos);
    if (!valueInfo) return null;
    const [value, from] = valueInfo;
    if (!explicit && value.length === 0) return null;

    return {
      from,
      options: finalizerTypes.map((v) => ({ label: v, icon: "enum" })),
    };
  },
];

/**
 * Provides autocomplete suggestions for Sigma rules
 */
export const sigmaCompletion = {
  context: sigmaContext,
  sources: sources,
};

// Register sigma completions for YAML files

registerCompletions(["yaml"], sigmaCompletion);

// Export main entry point for the Sigma autocomplete feature
export { sigmaFields, sigmaModifiers } from "./data.ts";
