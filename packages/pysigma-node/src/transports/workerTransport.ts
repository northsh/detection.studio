import type { ConversionParams, EngineStatus } from "../types";
import type { WorkerOutbound, WorkerRequest } from "./protocol";
import type { SigmaTransport } from "./transport";

/** `Omit` that distributes over union members (preserves the discriminant). */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
    ? Omit<T, K>
    : never;

/**
 * Proxies engine calls to a Web Worker running the package's worker entry.
 * Keeps the Pyodide workload off the main thread in browsers.
 */
export class WorkerTransport implements SigmaTransport {
    private readonly worker: Worker;
    private readonly listeners = new Set<(status: EngineStatus) => void>();
    private readonly pending = new Map<
        number,
        { resolve: (value: any) => void; reject: (reason: unknown) => void }
    >();
    private nextId = 1;
    private lastStatus: EngineStatus = {
        ready: false,
        pyodideReady: false,
        installedBackends: [],
    };

    constructor(worker: Worker) {
        this.worker = worker;
        this.worker.addEventListener("message", this.onMessage);
    }

    private onMessage = (event: MessageEvent<WorkerOutbound>): void => {
        const data = event.data;
        if (!data) return;

        if ("type" in data && data.type === "status_update") {
            this.lastStatus = data.status;
            this.listeners.forEach((l) => l(data.status));
            return;
        }

        if ("id" in data) {
            const entry = this.pending.get(data.id);
            if (!entry) return;
            this.pending.delete(data.id);
            if (data.error) entry.reject(new Error(data.error));
            else entry.resolve(data.result);
        }
    };

    private request<T>(message: DistributiveOmit<WorkerRequest, "id">): Promise<T> {
        const id = this.nextId++;
        return new Promise<T>((resolve, reject) => {
            this.pending.set(id, { resolve, reject });
            this.worker.postMessage({ ...message, id } as WorkerRequest);
        });
    }

    addStatusListener(listener: (status: EngineStatus) => void): () => void {
        this.listeners.add(listener);
        listener(this.lastStatus);
        // Request a fresh status snapshot.
        void this.getStatus()
            .then((status) => listener(status))
            .catch(() => {
                /* ignore */
            });
        return () => this.listeners.delete(listener);
    }

    getStatus(): Promise<EngineStatus> {
        return this.request<EngineStatus>({ type: "status" });
    }

    installBackend(target: string): Promise<{ success: boolean; error?: string }> {
        return this.request({ type: "install", target });
    }

    convert(
        params: ConversionParams,
    ): Promise<{ result?: string; error?: string; success?: boolean }> {
        return this.request({ type: "convert", conversionParams: params });
    }

    getAvailablePipelines(
        target: string,
    ): Promise<{ success: boolean; pipelines: string[]; error?: string }> {
        return this.request({ type: "get_pipelines", target });
    }

    dispose(): void {
        this.worker.removeEventListener("message", this.onMessage);
        this.listeners.clear();
        this.pending.clear();
        this.worker.terminate();
    }
}
