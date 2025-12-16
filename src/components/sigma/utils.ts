import type { SigmaRule } from "@/stores/SigmaBrowserStore";

/**
 * Get badge class based on rule level
 * @param level The severity level of the rule
 * @returns CSS class for the badge
 */
export function getLevelBadgeClass(level: string): string {
  const lowerLevel = level.toLowerCase();

  if (lowerLevel === "critical") return "bg-red-600 hover:bg-red-600";
  if (lowerLevel === "high") return "bg-red-500 hover:bg-red-500";
  if (lowerLevel === "medium") return "bg-amber-500 hover:bg-amber-500";
  if (lowerLevel === "low") return "bg-blue-500 hover:bg-blue-500";
  if (lowerLevel === "informational") return "bg-green-500 hover:bg-green-500";

  return "bg-gray-500 hover:bg-gray-500";
}

/**
 * Generate a mapping of products/categories/services
 * @param rules List of sigma rules
 * @returns Mapping of logsource components
 */
export function generateLogsourceMapping(
  rules: SigmaRule[],
): Record<string, { type: string; items: Set<string> }> {
  const mapping: Record<string, { type: string; items: Set<string> }> = {};

  rules.forEach((rule) => {
    if (rule.logsource?.product) {
      if (!mapping[rule.logsource.product]) {
        mapping[rule.logsource.product] = { type: "product", items: new Set() };
      }

      if (rule.logsource.category) {
        mapping[rule.logsource.product].items.add(rule.logsource.category);

        if (!mapping[rule.logsource.category]) {
          mapping[rule.logsource.category] = { type: "category", items: new Set() };
        }
      }

      if (rule.logsource.service) {
        mapping[rule.logsource.product].items.add(rule.logsource.service);

        if (!mapping[rule.logsource.service]) {
          mapping[rule.logsource.service] = { type: "service", items: new Set() };
        }
      }
    }
  });

  return mapping;
}

/**
 * Extract unique logsource options from rules
 * @param rules List of sigma rules
 * @returns Unique sorted options
 */
export function extractLogsourceOptions(rules: SigmaRule[]): string[] {
  const options = new Set<string>();

  rules.forEach((rule) => {
    if (rule.logsource?.product) {
      options.add(rule.logsource.product);
    }
    if (rule.logsource?.category) {
      options.add(rule.logsource.category);
    }
    if (rule.logsource?.service) {
      options.add(rule.logsource.service);
    }
  });

  return Array.from(options).sort();
}

/**
 * Available status options for Sigma rules
 */
export const STATUS_OPTIONS = ["stable", "test", "experimental", "deprecated", "unsupported"];

/**
 * Default status filter settings
 */
export const DEFAULT_STATUS_FILTERS = {
  stable: true,
  test: true,
  experimental: true,
  deprecated: false,
  unsupported: false,
};
