/**
 * Web Worker entry point.
 *
 * Bundle this as a worker and spawn it from the main thread. It runs the
 * {@link PyodideSigmaEngine} off the UI thread and speaks the request/response
 * protocol consumed by {@link WorkerTransport}.
 *
 * @example
 * ```ts
 * const worker = new Worker(
 *   new URL("@northsh/pysigma-node/worker", import.meta.url),
 *   { type: "module" },
 * );
 * const converter = new SigmaConverter({ worker });
 * ```
 */
import { PyodideSigmaEngine } from "./core";
import type { WorkerRequest } from "./transports/protocol";
import type { PyodideSigmaOptions } from "./types";

declare const self: DedicatedWorkerGlobalScope;

/**
 * Start the worker message loop. Called automatically when this module is
 * loaded as a worker; exported so consumers can pass engine options.
 */
export function startSigmaWorker(options: PyodideSigmaOptions = {}): void {
    const engine = new PyodideSigmaEngine({
        ...options,
        onStatus: (status) => {
            self.postMessage({ type: "status_update", status });
        },
    });

    void engine.init().catch(() => {
        /* error is surfaced through status updates */
    });

    self.addEventListener("message", async (event: MessageEvent<WorkerRequest>) => {
        const message = event.data;
        if (!message || typeof message.id !== "number") return;

        try {
            let result: unknown;
            switch (message.type) {
                case "convert":
                    result = await engine.convert(message.conversionParams);
                    break;
                case "install":
                    result = await engine.installBackend(message.target);
                    break;
                case "status":
                    result = engine.getStatus();
                    break;
                case "get_pipelines":
                    result = await engine.getAvailablePipelines(message.target);
                    break;
                default:
                    throw new Error(`Unknown message type: ${(message as { type: string }).type}`);
            }
            self.postMessage({ id: message.id, result });
        } catch (error) {
            self.postMessage({
                id: message.id,
                error: error instanceof Error ? error.message : String(error),
            });
        }
    });
}

// Auto-start when executed in a worker global scope.
if (typeof self !== "undefined" && typeof (self as unknown as { document?: unknown }).document === "undefined") {
    startSigmaWorker();
}
