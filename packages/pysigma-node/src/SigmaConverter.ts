import { DirectTransport } from "./transports/directTransport";
import { WorkerTransport } from "./transports/workerTransport";
import type { SigmaTransport } from "./transports/transport";
import type {
    ConversionParams,
    EngineStatus,
    PyodideSigmaOptions,
    SigmaConversionResult,
} from "./types";

/**
 * Options for {@link SigmaConverter}.
 */
export interface SigmaConverterOptions extends PyodideSigmaOptions {
    /**
     * A Web Worker running the package's worker entry. When provided, all
     * conversion work is proxied to it (keeping the main thread free). When
     * omitted, the engine runs in-process — appropriate for Node.js.
     */
    worker?: Worker;
    /**
     * Provide a custom transport. Overrides {@link worker}. Mostly useful for
     * testing.
     */
    transport?: SigmaTransport;
}

/**
 * High-level, stateful facade for converting Sigma rules to SIEM queries.
 *
 * Works in Node.js and the browser. In the browser, pass a `worker` to offload
 * Pyodide to a Web Worker; otherwise the engine runs in the current context.
 */
export class SigmaConverter {
    private readonly transport: SigmaTransport;
    private readonly targets: Map<string, { backend: string }> | null;
    private readonly cleanupListener: () => void;

    private readinessListeners: Array<(ready: boolean) => void> = [];
    private statusListeners: Array<(status: EngineStatus) => void> = [];
    private currentStatus: EngineStatus = {
        ready: false,
        pyodideReady: false,
        installedBackends: [],
    };

    constructor(options: SigmaConverterOptions = {}) {
        this.targets = options.targets ?? null;

        if (options.transport) {
            this.transport = options.transport;
        } else if (options.worker) {
            this.transport = new WorkerTransport(options.worker);
        } else {
            this.transport = new DirectTransport(options);
        }

        this.cleanupListener = this.transport.addStatusListener(
            this.handleStatusUpdate.bind(this),
        );
    }

    private handleStatusUpdate(status: EngineStatus): void {
        this.currentStatus = {
            ready: status?.ready ?? false,
            pyodideReady: status?.pyodideReady ?? false,
            installedBackends: status?.installedBackends ?? [],
            error: status?.error,
        };
        this.statusListeners.forEach((l) => l(this.currentStatus));
        this.readinessListeners.forEach((l) => l(this.currentStatus.ready));
    }

    /** Subscribe to status updates. Returns an unsubscribe function. */
    addStatusListener(listener: (status: EngineStatus) => void): () => void {
        this.statusListeners.push(listener);
        listener(this.currentStatus);
        return () => {
            const i = this.statusListeners.indexOf(listener);
            if (i !== -1) this.statusListeners.splice(i, 1);
        };
    }

    /** Subscribe to readiness changes. Returns an unsubscribe function. */
    addReadinessListener(listener: (ready: boolean) => void): () => void {
        this.readinessListeners.push(listener);
        listener(this.currentStatus.ready);
        return () => {
            const i = this.readinessListeners.indexOf(listener);
            if (i !== -1) this.readinessListeners.splice(i, 1);
        };
    }

    /**
     * Convert a Sigma rule to a SIEM query.
     */
    async convert(
        rule: string,
        target: string,
        pipeline: string[] = [],
        pipelineYmls: string[] = [],
        filterYml: string = "",
        format: string = "",
        correlationMethod: string = "",
        backendOptions: Record<string, unknown> = {},
    ): Promise<SigmaConversionResult> {
        if (this.targets && !this.targets.has(target)) {
            return { query: "", error: `Unsupported target: ${target}` };
        }

        try {
            if (!this.currentStatus.installedBackends.includes(target)) {
                const install = await this.transport.installBackend(target);
                if (!install.success && install.error) {
                    return { query: "", error: `Failed to install backend: ${install.error}` };
                }
            }

            const params: ConversionParams = {
                rule,
                target,
                pipelines: pipeline,
                pipelineYmls,
                filterYml,
                format,
                correlationMethod,
                backendOptions,
            };

            // Strip any framework reactivity proxies before crossing a worker
            // boundary or entering Pyodide.
            const plainParams: ConversionParams = JSON.parse(JSON.stringify(params));
            const result = await this.transport.convert(plainParams);

            if (result.error) {
                return { query: "", error: result.error };
            }
            return { query: result.result || "" };
        } catch (e) {
            return { query: "", error: e instanceof Error ? e.message : String(e) };
        }
    }

    /** Install a backend ahead of time. */
    installBackend(target: string): Promise<{ success: boolean; error?: string }> {
        return this.transport.installBackend(target);
    }

    /** List pipelines available for a target. */
    getAvailablePipelines(
        target: string,
    ): Promise<{ success: boolean; pipelines: string[]; error?: string }> {
        return this.transport.getAvailablePipelines(target);
    }

    /** True once the engine is initialised and idle. */
    isReady(): boolean {
        return this.currentStatus.ready;
    }

    /** Current status snapshot. */
    getStatus(): EngineStatus {
        return { ...this.currentStatus };
    }

    /** Release listeners and transport resources. */
    dispose(): void {
        this.cleanupListener();
        this.transport.dispose();
        this.readinessListeners = [];
        this.statusListeners = [];
    }
}
