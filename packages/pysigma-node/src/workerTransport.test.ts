import { describe, it, expect, vi, beforeEach } from "vitest";
import { WorkerTransport } from "./transports/workerTransport";
import type { WorkerOutbound, WorkerRequest } from "./transports/protocol";
import type { EngineStatus } from "./types";

/**
 * Minimal stand-in for the DOM `Worker`. Records posted messages and lets
 * tests deliver responses/notifications back to the registered listener.
 */
class FakeWorker {
    postMessage = vi.fn((message: WorkerRequest) => {
        this.posted.push(message);
    });
    terminate = vi.fn();

    posted: WorkerRequest[] = [];
    private messageListener: ((event: MessageEvent<WorkerOutbound>) => void) | null = null;

    addEventListener = vi.fn(
        (type: string, listener: (event: MessageEvent<WorkerOutbound>) => void) => {
            if (type === "message") this.messageListener = listener;
        },
    );
    removeEventListener = vi.fn(
        (type: string, listener: (event: MessageEvent<WorkerOutbound>) => void) => {
            if (type === "message" && this.messageListener === listener) {
                this.messageListener = null;
            }
        },
    );

    /** Deliver a message back to the transport's listener. */
    emit(data: WorkerOutbound): void {
        this.messageListener?.({ data } as MessageEvent<WorkerOutbound>);
    }

    /** True while a message listener is registered. */
    get hasListener(): boolean {
        return this.messageListener !== null;
    }
}

function makeTransport(): { transport: WorkerTransport; worker: FakeWorker } {
    const worker = new FakeWorker();
    const transport = new WorkerTransport(worker as unknown as Worker);
    return { transport, worker };
}

describe("WorkerTransport", () => {
    let transport: WorkerTransport;
    let worker: FakeWorker;

    beforeEach(() => {
        ({ transport, worker } = makeTransport());
    });

    it("registers a message listener on construction", () => {
        expect(worker.addEventListener).toHaveBeenCalledWith(
            "message",
            expect.any(Function),
        );
        expect(worker.hasListener).toBe(true);
    });

    it("convert sends a convert message with an incrementing id and resolves with result", async () => {
        const params = {
            rule: "rule",
            target: "splunk",
            pipelines: [],
            pipelineYmls: [],
            filterYml: "",
            format: "",
            correlationMethod: "",
            backendOptions: {},
        };
        const promise = transport.convert(params);

        const sent = worker.posted[0];
        expect(sent).toEqual({ id: 1, type: "convert", conversionParams: params });

        worker.emit({ id: 1, result: { result: "query", success: true } });
        await expect(promise).resolves.toEqual({ result: "query", success: true });
    });

    it("installBackend sends an install message and resolves with result", async () => {
        const promise = transport.installBackend("splunk");

        expect(worker.posted[0]).toEqual({ id: 1, type: "install", target: "splunk" });

        worker.emit({ id: 1, result: { success: true } });
        await expect(promise).resolves.toEqual({ success: true });
    });

    it("getStatus sends a status message and resolves with the status", async () => {
        const status: EngineStatus = {
            ready: true,
            pyodideReady: true,
            installedBackends: ["splunk"],
        };
        const promise = transport.getStatus();

        expect(worker.posted[0]).toEqual({ id: 1, type: "status" });

        worker.emit({ id: 1, result: status });
        await expect(promise).resolves.toEqual(status);
    });

    it("getAvailablePipelines sends a get_pipelines message and resolves with result", async () => {
        const promise = transport.getAvailablePipelines("splunk");

        expect(worker.posted[0]).toEqual({
            id: 1,
            type: "get_pipelines",
            target: "splunk",
        });

        worker.emit({ id: 1, result: { success: true, pipelines: ["windows"] } });
        await expect(promise).resolves.toEqual({
            success: true,
            pipelines: ["windows"],
        });
    });

    it("assigns incrementing ids to successive requests", () => {
        transport.installBackend("a");
        transport.installBackend("b");
        transport.installBackend("c");

        expect(worker.posted.map((m) => m.id)).toEqual([1, 2, 3]);
    });

    it("rejects when the response carries an error field", async () => {
        const promise = transport.convert({ rule: "r", target: "splunk" });
        worker.emit({ id: 1, error: "kaboom" });

        await expect(promise).rejects.toThrow("kaboom");
    });

    it("resolves the matching request even when responses arrive out of order", async () => {
        const first = transport.installBackend("a");
        const second = transport.installBackend("b");

        worker.emit({ id: 2, result: { success: true, who: "b" } });
        worker.emit({ id: 1, result: { success: true, who: "a" } });

        await expect(first).resolves.toEqual({ success: true, who: "a" });
        await expect(second).resolves.toEqual({ success: true, who: "b" });
    });

    it("ignores responses for unknown ids", async () => {
        const promise = transport.installBackend("a");
        // Unknown id should be silently ignored, not throw.
        worker.emit({ id: 999, result: { success: false } });
        worker.emit({ id: 1, result: { success: true } });
        await expect(promise).resolves.toEqual({ success: true });
    });

    it("delivers status_update notifications to listeners and caches the latest status", () => {
        const listener = vi.fn();
        transport.addStatusListener(listener);
        // Immediate call with the (initial) cached status.
        expect(listener).toHaveBeenCalledWith({
            ready: false,
            pyodideReady: false,
            installedBackends: [],
        });
        listener.mockClear();

        const status: EngineStatus = {
            ready: true,
            pyodideReady: true,
            installedBackends: ["splunk"],
        };
        worker.emit({ type: "status_update", status });
        expect(listener).toHaveBeenCalledWith(status);

        // A newly added listener immediately receives the cached latest status.
        const late = vi.fn();
        transport.addStatusListener(late);
        expect(late).toHaveBeenCalledWith(status);
    });

    it("addStatusListener returns a working unsubscribe", () => {
        const listener = vi.fn();
        const unsub = transport.addStatusListener(listener);
        listener.mockClear();
        unsub();

        worker.emit({
            type: "status_update",
            status: { ready: true, pyodideReady: true, installedBackends: [] },
        });
        expect(listener).not.toHaveBeenCalled();
    });

    it("dispose removes the listener, clears pending and terminates the worker", () => {
        transport.installBackend("a"); // leave a pending request

        transport.dispose();

        expect(worker.removeEventListener).toHaveBeenCalledWith(
            "message",
            expect.any(Function),
        );
        expect(worker.hasListener).toBe(false);
        expect(worker.terminate).toHaveBeenCalledTimes(1);

        // Pending requests are cleared: a late response is ignored (no throw).
        expect(() => worker.emit({ id: 1, result: { success: true } })).not.toThrow();
    });
});
