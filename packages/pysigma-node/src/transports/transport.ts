import type { ConversionParams, EngineStatus } from "../types";

/**
 * Abstraction over "where" the Pyodide engine runs. A transport may drive the
 * engine in-process (Node / browser main thread) or proxy to a Web Worker.
 */
export interface SigmaTransport {
    /** Subscribe to status updates. Returns an unsubscribe function. */
    addStatusListener(listener: (status: EngineStatus) => void): () => void;
    /** Fetch the current status. */
    getStatus(): Promise<EngineStatus>;
    /** Install a backend for the given target. */
    installBackend(target: string): Promise<{ success: boolean; error?: string }>;
    /** Convert a single rule. */
    convert(
        params: ConversionParams,
    ): Promise<{ result?: string; error?: string; success?: boolean }>;
    /** List pipelines available for a target. */
    getAvailablePipelines(
        target: string,
    ): Promise<{ success: boolean; pipelines: string[]; error?: string }>;
    /** Release any resources held by the transport. */
    dispose(): void;
}
