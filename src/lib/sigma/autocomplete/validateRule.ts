import * as yaml from "js-yaml";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates a Sigma rule for common issues and syntax problems
 * @param ruleContent - The YAML content of the Sigma rule to validate
 * @returns A validation result object with valid status and any error messages
 */
export function validateSigmaRule(ruleContent: string): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
  };

  // Try parsing the YAML first
  try {
    const yamlContent = yaml.load(ruleContent) as Record<string, any>;

    // Check for required fields
    const requiredFields = ["title", "logsource", "detection"];
    for (const field of requiredFields) {
      if (!yamlContent[field]) {
        result.valid = false;
        result.errors.push(`Missing required field: ${field}`);
      }
    }

    // Check detection section
    if (yamlContent.detection) {
      if (!yamlContent.detection.condition) {
        result.valid = false;
        result.errors.push("Missing required field: detection.condition");
      }

      // Check that at least one search identifier is defined (not just condition)
      const hasSearchIdentifier = Object.keys(yamlContent.detection).some(
        (key) => key !== "condition",
      );
      if (!hasSearchIdentifier) {
        result.valid = false;
        result.errors.push("At least one search identifier is required in the detection section");
      }

      // Validate condition syntax (simple check)
      const condition = yamlContent.detection.condition;
      if (condition && typeof condition === "string") {
        // Get all search identifiers in detection section
        const searchIdentifiers = Object.keys(yamlContent.detection).filter(
          (key) => key !== "condition",
        );

        // Check that condition references existing search identifiers
        const conditionTokens = condition.split(/\s+/);
        const wildcardPattern = /\*/;

        // Filter out known keywords and check if remaining tokens reference existing search identifiers
        const conditionIdentifiers = conditionTokens.filter(
          (token) =>
            !["and", "or", "not", "1", "all", "of", "them", "(", ")"].includes(token) &&
            !wildcardPattern.test(token),
        );

        for (const id of conditionIdentifiers) {
          if (!searchIdentifiers.includes(id)) {
            result.valid = false;
            result.errors.push(`Condition references undefined search identifier: ${id}`);
          }
        }
      }
    }

    // Check logsource section
    if (yamlContent.logsource) {
      const logsource = yamlContent.logsource;
      // At least one of category, product, or service should be defined
      if (!logsource.category && !logsource.product && !logsource.service) {
        result.valid = false;
        result.errors.push(
          "Logsource section should specify at least one of: category, product, or service",
        );
      }
    }

    // Check level values
    if (
      yamlContent.level &&
      !["informational", "low", "medium", "high", "critical"].includes(yamlContent.level)
    ) {
      result.valid = false;
      result.errors.push(
        `Invalid level value: ${yamlContent.level}. Expected one of: informational, low, medium, high, critical`,
      );
    }

    // Check status values
    if (
      yamlContent.status &&
      !["stable", "test", "experimental", "deprecated", "unsupported"].includes(yamlContent.status)
    ) {
      result.valid = false;
      result.errors.push(
        `Invalid status value: ${yamlContent.status}. Expected one of: stable, test, experimental, deprecated, unsupported`,
      );
    }
  } catch (error) {
    result.valid = false;
    result.errors.push(`YAML parsing error: ${(error as Error).message}`);
  }

  return result;
}
