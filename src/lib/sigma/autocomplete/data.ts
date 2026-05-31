// Sigma autocomplete data for Prism Code Editor

import type { AttributeConfig } from "./types.ts";

// Define Sigma modifiers
export const sigmaModifiers = [
  "all",
  "base64",
  "base64offset",
  "cidr",
  "contains",
  "endswith",
  "eq",
  "exists",
  "expand",
  "gt",
  "gte",
  "lt",
  "lte",
  "re",
  "startswith",
  "utf16",
  "utf16be",
  "utf16le",
  "wide",
  "windash",
];

// Level values
export const levelValues = ["informational", "low", "medium", "high", "critical"];

// Status values
export const statusValues = ["stable", "test", "experimental", "deprecated", "unsupported"];

// Common logsource categories
export const categoryValues = [
  "process_creation",
  "file_event",
  "network_connection",
  "registry_event",
  "registry_add",
  "registry_delete",
  "registry_set",
  "image_load",
  "driver_load",
  "wmi_event",
  "dns_query",
  "firewall",
  "web",
  "antivirus",
  "authentication",
  "create_remote_thread",
  "create_stream_hash",
  "pipe_created",
];

// Common product values
export const productValues = [
  "windows",
  "linux",
  "macos",
  "azure",
  "aws",
  "gcp",
  "android",
  "ios",
  "apache",
  "nginx",
  "office365",
  "firewalls",
];

// Common service values
export const serviceValues = [
  "sysmon",
  "security",
  "system",
  "application",
  "applocker",
  "powershell",
  "defender",
  "sshd",
  "firewall-as",
  "auditd",
  "clamav",
  "apache",
  "nginx",
  "winevent",
  "windefend",
];

// Common condition patterns
export const conditionPatterns = [
  "selection",
  "selection and not filter",
  "1 of selection*",
  "all of selection*",
  "selection1 or selection2",
  "selection1 and selection2",
  "selection1 and not selection2",
  "1 of them",
  "all of them",
];

// Define top-level Sigma field structure (standard rules)
export const sigmaFields: AttributeConfig = {
  title: null,
  id: null,
  name: null,
  related: null,
  taxonomy: ["sigma"],
  status: statusValues,
  description: null,
  license: null,
  references: null,
  author: null,
  date: null,
  modified: null,
  logsource: null,
  detection: null,
  fields: null,
  falsepositives: null,
  level: levelValues,
  tags: null,
  scope: null,
  // Meta rule sections (correlation / filter rules use these instead of detection)
  correlation: null,
  filter: null,
};

// ── Correlation rule data ──

// Correlation type values
export const correlationTypeValues = [
  "event_count",
  "value_count",
  "temporal",
  "ordered_temporal",
];

// Direct children of `correlation:`
export const correlationFields: AttributeConfig = {
  type: correlationTypeValues,
  rules: null,
  "group-by": null,
  timespan: null,
  condition: null,
  aliases: null,
  generate: ["true", "false"],
};

// Correlation condition operators (children of `condition:` inside correlation)
export const correlationConditionOperators = [
  "gte",
  "gt",
  "lte",
  "lt",
  "eq",
];

// Common timespan patterns
export const timespanValues = [
  "1m",
  "5m",
  "10m",
  "15m",
  "30m",
  "1h",
  "6h",
  "12h",
  "24h",
  "1d",
  "7d",
];

// ── Sigma Filter data ──

// Direct children of `filter:`
export const filterFields: AttributeConfig = {
  rules: null,
  selection: null,
  condition: null,
};

// ── Processing Pipeline data ──

// Top-level pipeline fields
export const pipelineFields: AttributeConfig = {
  name: null,
  priority: null,
  transformations: null,
  vars: null,
  finalizers: null,
};

// Transformation types
export const transformationTypes = [
  "field_name_mapping",
  "field_name_prefix_mapping",
  "field_name_prefix",
  "field_name_suffix",
  "drop_detection_item",
  "add_condition",
  "change_logsource",
  "replace_string",
  "set_state",
  "value_placeholders",
  "query_expression_placeholders",
  "wildcard_placeholders",
  "rule_failure",
  "detection_item_failure",
  "detection_item_condition",
];

// Transformation fields (common keys inside a transformation item)
export const transformationFields: AttributeConfig = {
  id: null,
  type: transformationTypes,
  // field_name_mapping
  mapping: null,
  // field_name_prefix / suffix
  prefix: null,
  suffix: null,
  // add_condition / change_logsource
  conditions: null,
  category: null,
  product: null,
  service: null,
  // replace_string
  regex: null,
  replacement: null,
  // set_state
  key: null,
  val: null,
  // value / query_expression placeholders
  include: null,
  expression: null,
  // failure messages
  message: null,
  // condition blocks
  rule_conditions: null,
  rule_cond_expr: null,
  detection_item_conditions: null,
  field_name_conditions: null,
  field_name_cond_not: ["true", "false"],
  template: ["true", "false"],
};

// Rule condition types
export const ruleConditionTypes = [
  "logsource",
  "contains_detection_item",
  "processing_item_applied",
  "processing_state",
  "is_sigma_rule",
  "is_sigma_correlation_rule",
  "rule_attribute",
  "tag",
];

// Detection item condition types
export const detectionItemConditionTypes = [
  "match_string",
  "is_null",
  "processing_item_applied",
  "processing_state",
];

// Field name condition types
export const fieldNameConditionTypes = [
  "include_fields",
  "exclude_fields",
  "processing_item_applied",
  "processing_state",
];

// Finalizer types
export const finalizerTypes = [
  "concat",
  "json",
  "template",
];

// Define nested Sigma field structures
export const logsourceFields: AttributeConfig = {
  category: categoryValues,
  product: productValues,
  service: serviceValues,
  definition: null,
};

export const detectionFields: AttributeConfig = {
  selection: null,
  condition: conditionPatterns,
};

// Common MITRE ATT&CK tactics
export const mitreTactics = [
  "attack.reconnaissance",
  "attack.resource_development",
  "attack.initial_access",
  "attack.execution",
  "attack.persistence",
  "attack.privilege_escalation",
  "attack.defense_evasion",
  "attack.credential_access",
  "attack.discovery",
  "attack.lateral_movement",
  "attack.collection",
  "attack.command_and_control",
  "attack.exfiltration",
  "attack.impact",
];

// Common Windows event IDs
export const windowsEventIds = [
  "1", // Process creation
  "3", // Network connection
  "4624", // Logon success
  "4625", // Logon failure
  "4634", // Logoff
  "4688", // Process creation (Security log)
  "4698", // Scheduled task creation
  "4699", // Scheduled task deletion
  "4700", // Scheduled task enable
  "4701", // Scheduled task disable
  "4702", // Scheduled task update
  "4720", // User account creation
  "4724", // Password reset attempt
  "4728", // Member added to security-enabled global group
  "4732", // Member added to security-enabled local group
  "5156", // Windows Filtering Platform permitted connection
  "7045", // Service installation
];
