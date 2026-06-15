import type { SigmaTarget } from "./types";

/**
 * Framework-agnostic registry of conversion targets and their pySigma backend
 * packages. This intentionally carries no UI metadata (icons, colors, etc.) so
 * the package stays free of framework/asset dependencies.
 *
 * Consumers may pass their own registry via {@link PyodideSigmaOptions.targets}.
 */
export const DEFAULT_TARGETS: readonly SigmaTarget[] = [
    { id: "splunk", title: "Splunk", backend: "pysigma-backend-splunk" },
    { id: "esql", title: "ES|QL", backend: "pysigma-backend-elasticsearch" },
    { id: "lucene", title: "Lucene", backend: "pysigma-backend-elasticsearch" },
    { id: "eql", title: "EQL", backend: "pysigma-backend-elasticsearch" },
    { id: "loki", title: "Loki", backend: "pysigma-backend-loki" },
    { id: "carbon_black", title: "Carbon Black", backend: "pysigma-backend-carbonblack" },
    { id: "log_scale", title: "CrowdStrike Logscale", backend: "pysigma-backend-crowdstrike" },
    { id: "datadog", title: "DataDog", backend: "pysigma-backend-datadog" },
    { id: "kusto", title: "KQL (Kusto)", backend: "pysigma-backend-kusto" },
    { id: "net_witness", title: "NetWitness", backend: "pysigma-backend-netwitness" },
    { id: "panther", title: "Panther", backend: "pysigma-backend-panther" },
    { id: "quickwit", title: "QuickWit", backend: "pysigma-backend-quickwit" },
    { id: "secops", title: "Google SecOps", backend: "pysigma-backend-secops" },
    { id: "sentinel_one", title: "Sentinel One", backend: "pysigma-backend-sentinelone" },
    { id: "sqlite", title: "SQLite", backend: "pysigma-backend-sqlite" },
    { id: "surreal_ql", title: "SurrealQL", backend: "pysigma-backend-surrealql" },
    { id: "uberagent", title: "uberAgent", backend: "pysigma-backend-uberagent" },
] as const;

/**
 * Default target registry keyed by target id.
 */
export const DEFAULT_SIGMA_TARGETS: Map<string, SigmaTarget> = new Map(
    DEFAULT_TARGETS.map((t) => [t.id, t]),
);

/**
 * Build a target registry from a list of {@link SigmaTarget}s.
 */
export function createTargetRegistry(targets: readonly SigmaTarget[]): Map<string, SigmaTarget> {
    return new Map(targets.map((t) => [t.id, t]));
}

/**
 * Extract the bare backend name pySigma uses internally from a backend package
 * name, e.g. `pysigma-backend-splunk` -> `splunk`.
 */
export function backendNameFromPackage(backendPackage: string, fallback: string): string {
    const match = backendPackage.match(/pysigma-backend-(.+)/);
    return match ? match[1] : fallback;
}
