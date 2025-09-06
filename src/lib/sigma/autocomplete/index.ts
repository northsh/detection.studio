/** @module autocomplete/sigma */

import { registerCompletions } from "prism-code-editor/autocomplete";
import type { Completion, CompletionSource } from "./types.ts";
import { optionsFromKeys } from "./utils.ts";

import {
  categoryValues,
  conditionPatterns,
  detectionFields,
  levelValues,
  logsourceFields,
  mitreTactics,
  productValues,
  serviceValues,
  sigmaFields,
  sigmaModifiers,
  statusValues,
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

// Get detection section selection names
function getSelectionNames(before: string): string[] {
  if (!isInSection(before, "detection")) {
    return [];
  }

  const lines = before.split("\n");
  const selectionNames: string[] = [];
  let inDetection = false;
  let detectionIndent = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^\s*detection\s*:/)) {
      inDetection = true;
      detectionIndent = (line.match(/^\s*/) || [""])[0].length;
      continue;
    }

    if (inDetection) {
      const currentIndent = (line.match(/^\s*/) || [""])[0].length;
      if (line.trim() === "") {
        continue;
      }

      if (currentIndent <= detectionIndent) {
        inDetection = false;
        continue;
      }

      // Check if this is a selection name (not condition)
      if (!line.match(/^\s*condition\s*:/) && line.includes(":")) {
        const selectionName = line.trim().split(":")[0].trim();
        if (selectionName && !selectionNames.includes(selectionName)) {
          selectionNames.push(selectionName);
        }
      }
    }
  }

  return selectionNames;
}

// Define context type for Sigma completions
interface SigmaCompletionContext {
  inLogsource: boolean;
  inDetection: boolean;
  fieldModifier: string | null;
  selectionNames: string[];
}

// Extract context for Sigma completions
const sigmaContext = (context: any, _: PrismEditor): SigmaCompletionContext => {
  const { before } = context;
  return {
    inLogsource: isInSection(before, "logsource"),
    inDetection: isInSection(before, "detection"),
    fieldModifier: (before.match(fieldModifierPattern) || [])[1] || null,
    selectionNames: getSelectionNames(before),
  };
};

// Define completion sources
const sources: CompletionSource<SigmaCompletionContext>[] = [
  // Top-level field completions
  (context, _) => {
    const { before, lineBefore } = context;
    const indent = getIndentation(before);

    // Only suggest top level fields if we're at the beginning of a line
    // and not inside another field's value
    if (lineBefore.trim() === "" || lineBefore.trim().endsWith(":")) {
      // Check if we're at the top level by checking indentation
      if (
        indent.length === 0 ||
        (lineBefore.trim() === "" && before.trim() === "")
      ) {
        return {
          from: context.pos - lineBefore.trim().length,
          options: optionsFromKeys(sigmaFields, "property"),
        };
      }
    }

    return null;
  },

  // Logsource field completions
  (context, _) => {
    const { lineBefore, inLogsource } = context;

    if (
      inLogsource &&
      (lineBefore.trim() === "" || lineBefore.trim().endsWith(":"))
    ) {
      return {
        from: context.pos - lineBefore.trim().length,
        options: optionsFromKeys(logsourceFields, "property"),
      };
    }

    return null;
  },

  // Category value completions
  (context, _) => {
    const { lineBefore, inLogsource } = context;

    if (inLogsource && lineBefore.trim().match(/^\s*category\s*:\s*$/)) {
      return {
        from: context.pos,
        options: categoryValues.map((value) => ({
          label: value,
          icon: "constant",
        })),
      };
    }

    return null;
  },

  // Product value completions
  (context, _) => {
    const { lineBefore, inLogsource } = context;

    if (inLogsource && lineBefore.trim().match(/^\s*product\s*:\s*$/)) {
      return {
        from: context.pos,
        options: productValues.map((value) => ({
          label: value,
          icon: "constant",
        })),
      };
    }

    return null;
  },

  // Service value completions
  (context, _) => {
    const { lineBefore, inLogsource } = context;

    if (inLogsource && lineBefore.trim().match(/^\s*service\s*:\s*$/)) {
      return {
        from: context.pos,
        options: serviceValues.map((value) => ({
          label: value,
          icon: "constant",
        })),
      };
    }

    return n;
  },

  // Level value completions
  (context, _) => {
    const { lineBefore } = context;

    if (lineBefore.trim().match(/^\s*level\s*:\s*$/)) {
      return {
        from: context.pos,
        options: levelValues.map((value) => ({
          label: value,
          icon: "enum",
        })),
      };
    }

    return null;
  },

  // Status value completions
  (context, _) => {
    const { lineBefore } = context;

    if (lineBefore.trim().match(/^\s*status\s*:\s*$/)) {
      return {
        from: context.pos,
        options: statusValues.map((value) => ({
          label: value,
          icon: "enum",
        })),
      };
    }

    return null;
  },

  // Tags completions
  (context, editor) => {
    const { lineBefore } = context;

    if (lineBefore.trim().match(/^\s*-\s*$/)) {
      const previousLine =
        editor.value
          .split("\n")
          .slice(0, (editor as any).posFromOffset(context.pos).line)
          .pop() || "";

      if (previousLine && previousLine.trim().match(/^\s*tags\s*:/)) {
        return {
          from: context.pos,
          options: mitreTactics.map((value) => ({
            label: value,
            icon: "constant",
          })),
        };
      }
    }

    return null;
  },

  // Detection field completions
  (context, _) => {
    const { before, lineBefore, inDetection } = context;

    if (
      inDetection &&
      (lineBefore.trim() === "" || lineBefore.trim().endsWith(":"))
    ) {
      // Exclude top-level "condition" field from suggestions unless we haven't provided it yet
      const hasCondition = before.includes("condition:");
      const options = optionsFromKeys(detectionFields, "property");

      if (hasCondition) {
        return {
          from: context.pos - lineBefore.trim().length,
          options: options.filter((o) => o.label !== "condition"),
        };
      }

      return {
        from: context.pos - lineBefore.trim().length,
        options,
      };
    }

    return null;
  },

  // Field modifiers
  (context, _) => {
    const { lineBefore } = context;

    // Check if we're in a position to offer modifiers (after a | character)
    const modifierMatch = lineBefore.match(
      /([a-zA-Z0-9_]+)(\|[a-zA-Z0-9_]+)*\|$/,
    );
    if (modifierMatch) {
      return {
        from: context.pos,
        options: sigmaModifiers.map((value) => ({
          label: value,
          icon: "function",
        })),
      };
    }

    return null;
  },

  // Condition value completions
  (context, _) => {
    const { lineBefore, inDetection, selectionNames } = context;

    if (inDetection && lineBefore.trim().match(/^\s*condition\s*:\s*$/)) {
      // Generate condition suggestions based on defined selections
      const options: Completion[] = conditionPatterns.map((pattern) => ({
        label: pattern,
        icon: "keyword",
      }));

      // Add condition options based on selection names
      if (selectionNames.length > 0) {
        selectionNames.forEach((name) => {
          options.push({
            label: name,
            icon: "keyword",
          });

          if (selectionNames.length > 1) {
            selectionNames
              .filter((n) => n !== name)
              .forEach((otherName) => {
                options.push({
                  label: `${name} and ${otherName}`,
                  icon: "keyword",
                });
                options.push({
                  label: `${name} or ${otherName}`,
                  icon: "keyword",
                });
                options.push({
                  label: `${name} and not ${otherName}`,
                  icon: "keyword",
                });
              });
          }
        });
      }

      return {
        from: context.pos,
        options,
      };
    }

    return null;
  },

  // Windows Event ID completions
  (context, _) => {
    const { lineBefore, inDetection } = context;

    if (inDetection && lineBefore.trim().match(/^\s*EventID\s*:\s*$/)) {
      return {
        from: context.pos,
        options: windowsEventIds.map((id) => ({
          label: id,
          icon: "constant",
        })),
      };
    }

    return null;
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
