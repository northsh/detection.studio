// Sigma autocomplete data for Prism Code Editor

import type { AttributeConfig } from "./types.ts"

// Define Sigma modifiers
export const sigmaModifiers = [
    "contains",
    "endswith",
    "startswith",
    "all",
    "base64",
    "base64offset", 
    "cidr",
    "contains",
    "endswith",
    "eq",
    "exists",
    "gt",
    "gte",
    "lt",
    "lte",
    "expand",
    "re",
    "windash",
    "utf16le",
    "utf16be",
    "utf16",
    "wide"
]

// Level values
export const levelValues = ["informational", "low", "medium", "high", "critical"]

// Status values
export const statusValues = ["stable", "test", "experimental", "deprecated", "unsupported"]

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
    "pipe_created"
]

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
    "firewalls"
]

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
    "windefend"
]

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
    "all of them"
]

// Define top-level Sigma field structure
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
    scope: null
}

// Define nested Sigma field structures
export const logsourceFields: AttributeConfig = {
    category: categoryValues,
    product: productValues,
    service: serviceValues,
    definition: null
}

export const detectionFields: AttributeConfig = {
    selection: null,
    condition: conditionPatterns
}

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
    "attack.impact"
]

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
]