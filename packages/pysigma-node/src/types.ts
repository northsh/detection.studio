/**
 * Public types for @northsh/pysigma-node.
 */

/**
 * A Sigma conversion target (e.g. "splunk", "esql") and the PyPI backend
 * package required to convert to it.
 */
export interface SigmaTarget {
    /** Stable identifier passed to {@link SigmaConverter.convert}. */
    id: string;
    /** Human-readable title. */
    title: string;
    /** PyPI package name of the pySigma backend, e.g. `pysigma-backend-splunk`. */
    backend: string;
}

/**
 * Parameters for a single rule conversion.
 */
export interface ConversionParams {
    /** The Sigma rule as a YAML string. */
    rule: string;
    /** Target backend id (must exist in the configured target registry). */
    target: string;
    /** Names of built-in pipelines to apply (resolved by pySigma plugins). */
    pipelines?: string[];
    /** Custom pipeline definitions as YAML strings. */
    pipelineYmls?: string[];
    /** Optional Sigma filter definition as a YAML string. */
    filterYml?: string;
    /** Backend output format (e.g. "default"). */
    format?: string;
    /** Optional correlation method supported by the backend. */
    correlationMethod?: string;
    /** Arbitrary backend-specific options. */
    backendOptions?: Record<string, unknown>;
}

/**
 * Result of a conversion. On success `query` holds the converted output;
 * on failure `error` is populated and `query` is empty.
 */
export interface SigmaConversionResult {
    query: string;
    error?: string;
}

/**
 * Engine readiness / installation status, emitted to status listeners.
 */
export interface EngineStatus {
    /** True when the engine is fully initialised and idle. */
    ready: boolean;
    /** True once Pyodide and the base pySigma stack have loaded. */
    pyodideReady: boolean;
    /** Target ids whose backends have been installed. */
    installedBackends: string[];
    /** Last error message, if any. */
    error?: string;
}

/** @deprecated Use {@link EngineStatus}. Kept for backwards compatibility. */
export type WorkerStatus = EngineStatus;

/**
 * Options controlling how Pyodide and pySigma are loaded.
 */
export interface PyodideSigmaOptions {
    /**
     * The pySigma version to install (defaults to a known-good pin).
     */
    pysigmaVersion?: string;
    /**
     * Pipeline packages to install up front.
     */
    pipelinePackages?: string[];
    /**
     * Override the Pyodide `indexURL`. When omitted, a CDN URL is used in the
     * browser and the locally installed `pyodide` package is used in Node.
     */
    indexURL?: string;
    /**
     * Registry of conversion targets. Defaults to {@link DEFAULT_SIGMA_TARGETS}.
     */
    targets?: Map<string, SigmaTarget>;
    /**
     * Optional callback invoked whenever the engine status changes.
     */
    onStatus?: (status: EngineStatus) => void;
}
