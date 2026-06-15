import { PyodideSigmaEngine } from "../core";
import type { ConversionParams, EngineStatus, PyodideSigmaOptions } from "../types";
import type { SigmaTransport } from "./transport";

/**
 * Runs the {@link PyodideSigmaEngine} in-process. Suitable for Node.js, Bun,
 * Deno, or a browser context where blocking the current thread is acceptable
 * (including inside a Web Worker).
 */
export class DirectTransport implements SigmaTransport {
    private readonly engine: PyodideSigmaEngine;
    private readonly listeners = new Set<(status: EngineStatus) => void>();

    constructor(options: PyodideSigmaOptions = {}) {
        this.engine = new PyodideSigmaEngine({
            ...options,
            onStatus: (status) => {
                options.onStatus?.(status);
                this.listeners.forEach((l) => l(status));
            },
        });
        // Kick off initialisation eagerly.
        void this.engine.init().catch(() => {
            /* status listeners surface the error */
        });
    }

    addStatusListener(listener: (status: EngineStatus) => void): () => void {
        this.listeners.add(listener);
        listener(this.engine.getStatus());
        return () => this.listeners.delete(listener);
    }

    async getStatus(): Promise<EngineStatus> {
        return this.engine.getStatus();
    }

    installBackend(target: string): Promise<{ success: boolean; error?: string }> {
        return this.engine.installBackend(target);
    }

    convert(
        params: ConversionParams,
    ): Promise<{ result?: string; error?: string; success?: boolean }> {
        return this.engine.convert(params);
    }

    getAvailablePipelines(
        target: string,
    ): Promise<{ success: boolean; pipelines: string[]; error?: string }> {
        return this.engine.getAvailablePipelines(target);
    }

    dispose(): void {
        this.listeners.clear();
    }
}
