import { describe, it, expect, vi, beforeEach } from "vitest";
import { SigmaConverter } from "./SigmaConverter";
import type { SigmaTransport } from "./transports/transport";
import type { ConversionParams, EngineStatus } from "./types";

const INITIAL_STATUS: EngineStatus = {
    ready: false,
    pyodideReady: false,
    installedBackends: [],
};

/**
 * A hand-written fake transport implementing {@link SigmaTransport}. It lets
 * tests drive status updates and inspect/override the engine call results
 * without ever loading Pyodide.
 */
class MockTransport implements SigmaTransport {
    installBackend = vi.fn(
        async (_target: string): Promise<{ success: boolean; error?: string }> => ({
            success: true,
        }),
    );
    convert = vi.fn(
        async (
            _params: ConversionParams,
        ): Promise<{ result?: string; error?: string; success?: boolean }> => ({
            result: "converted query",
            success: true,
        }),
    );
    getAvailablePipelines = vi.fn(
        async (
            _target: string,
        ): Promise<{ success: boolean; pipelines: string[]; error?: string }> => ({
            success: true,
            pipelines: ["windows", "sysmon"],
        }),
    );
    getStatus = vi.fn(async (): Promise<EngineStatus> => this.status);
    dispose = vi.fn();

    private status: EngineStatus = INITIAL_STATUS;
    private listeners = new Set<(status: EngineStatus) => void>();
    /** Spy on the unsubscribe returned to the SigmaConverter. */
    statusUnsubscribe = vi.fn();

    addStatusListener = vi.fn((listener: (status: EngineStatus) => void): (() => void) => {
        this.listeners.add(listener);
        listener(this.status);
        return () => {
            this.listeners.delete(listener);
            this.statusUnsubscribe();
        };
    });

    /** Test helper: push a new status to all subscribers. */
    emitStatus(status: EngineStatus): void {
        this.status = status;
        this.listeners.forEach((l) => l(status));
    }
}

describe("SigmaConverter", () => {
    let transport: MockTransport;

    beforeEach(() => {
        transport = new MockTransport();
    });

    describe("constructor", () => {
        it("wires up a status listener and propagates initial status", () => {
            const converter = new SigmaConverter({ transport });

            expect(transport.addStatusListener).toHaveBeenCalledTimes(1);
            expect(converter.getStatus()).toEqual(INITIAL_STATUS);
            expect(converter.isReady()).toBe(false);
        });
    });

    describe("status / readiness listeners", () => {
        it("addStatusListener invokes immediately with current status and on updates", () => {
            const converter = new SigmaConverter({ transport });
            const listener = vi.fn();

            const unsub = converter.addStatusListener(listener);
            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenLastCalledWith(INITIAL_STATUS);

            const ready: EngineStatus = {
                ready: true,
                pyodideReady: true,
                installedBackends: ["splunk"],
            };
            transport.emitStatus(ready);

            expect(listener).toHaveBeenCalledTimes(2);
            expect(listener).toHaveBeenLastCalledWith(ready);

            unsub();
            transport.emitStatus({ ...ready, ready: false });
            expect(listener).toHaveBeenCalledTimes(2);
        });

        it("addReadinessListener invokes immediately and on readiness changes", () => {
            const converter = new SigmaConverter({ transport });
            const listener = vi.fn();

            const unsub = converter.addReadinessListener(listener);
            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenLastCalledWith(false);

            transport.emitStatus({
                ready: true,
                pyodideReady: true,
                installedBackends: [],
            });
            expect(listener).toHaveBeenCalledTimes(2);
            expect(listener).toHaveBeenLastCalledWith(true);

            unsub();
            transport.emitStatus({
                ready: false,
                pyodideReady: true,
                installedBackends: [],
            });
            expect(listener).toHaveBeenCalledTimes(2);
        });
    });

    describe("convert", () => {
        it("happy path: installs backend then converts and maps result -> query", async () => {
            const converter = new SigmaConverter({ transport });

            const result = await converter.convert("rule", "splunk");

            expect(transport.installBackend).toHaveBeenCalledTimes(1);
            expect(transport.installBackend).toHaveBeenCalledWith("splunk");
            expect(transport.convert).toHaveBeenCalledTimes(1);
            expect(result).toEqual({ query: "converted query" });
        });

        it("skips installBackend when the backend is already installed", async () => {
            const converter = new SigmaConverter({ transport });
            transport.emitStatus({
                ready: true,
                pyodideReady: true,
                installedBackends: ["splunk"],
            });

            const result = await converter.convert("rule", "splunk");

            expect(transport.installBackend).not.toHaveBeenCalled();
            expect(transport.convert).toHaveBeenCalledTimes(1);
            expect(result).toEqual({ query: "converted query" });
        });

        it("returns Unsupported target without touching the transport when targets restricts it", async () => {
            const targets = new Map([
                ["splunk", { id: "splunk", title: "Splunk", backend: "pysigma-backend-splunk" }],
            ]);
            const converter = new SigmaConverter({ transport, targets });

            const result = await converter.convert("rule", "nope");

            expect(result).toEqual({ query: "", error: "Unsupported target: nope" });
            expect(transport.installBackend).not.toHaveBeenCalled();
            expect(transport.convert).not.toHaveBeenCalled();
        });

        it("returns the converted query when target is allowed by targets", async () => {
            const targets = new Map([
                ["splunk", { id: "splunk", title: "Splunk", backend: "pysigma-backend-splunk" }],
            ]);
            const converter = new SigmaConverter({ transport, targets });

            const result = await converter.convert("rule", "splunk");

            expect(result).toEqual({ query: "converted query" });
        });

        it("returns a Failed to install backend error when installBackend fails", async () => {
            transport.installBackend.mockResolvedValueOnce({
                success: false,
                error: "boom",
            });
            const converter = new SigmaConverter({ transport });

            const result = await converter.convert("rule", "splunk");

            expect(result).toEqual({
                query: "",
                error: "Failed to install backend: boom",
            });
            expect(transport.convert).not.toHaveBeenCalled();
        });

        it("propagates a conversion error from the transport", async () => {
            transport.convert.mockResolvedValueOnce({ error: "conversion failed" });
            const converter = new SigmaConverter({ transport });

            const result = await converter.convert("rule", "splunk");

            expect(result).toEqual({ query: "", error: "conversion failed" });
        });

        it("catches exceptions thrown by the transport", async () => {
            transport.convert.mockRejectedValueOnce(new Error("transport crashed"));
            const converter = new SigmaConverter({ transport });

            const result = await converter.convert("rule", "splunk");

            expect(result).toEqual({ query: "", error: "transport crashed" });
        });

        it("forwards all parameters as a plain JSON-cloned object", async () => {
            const converter = new SigmaConverter({ transport });

            await converter.convert(
                "my rule",
                "splunk",
                ["windows"],
                ["pipeline: yml"],
                "filter: yml",
                "json",
                "and",
                { timeout: 30 },
            );

            const [params] = transport.convert.mock.calls[0];
            expect(params).toEqual({
                rule: "my rule",
                target: "splunk",
                pipelines: ["windows"],
                pipelineYmls: ["pipeline: yml"],
                filterYml: "filter: yml",
                format: "json",
                correlationMethod: "and",
                backendOptions: { timeout: 30 },
            });
            // Must be a plain object (reactivity/proxies stripped via JSON clone).
            expect(Object.getPrototypeOf(params)).toBe(Object.prototype);
        });

        it("strips proxies/reactivity from the rule and options", async () => {
            const converter = new SigmaConverter({ transport });

            const reactiveOptions = new Proxy(
                { nested: { a: 1 } },
                { get: (t, p) => Reflect.get(t, p) },
            );

            await converter.convert(
                "rule",
                "splunk",
                [],
                [],
                "",
                "",
                "",
                reactiveOptions as Record<string, unknown>,
            );

            const [params] = transport.convert.mock.calls[0];
            expect(params.backendOptions).toEqual({ nested: { a: 1 } });
            expect(Object.getPrototypeOf(params.backendOptions)).toBe(
                Object.prototype,
            );
        });
    });

    describe("delegation", () => {
        it("installBackend delegates to the transport", async () => {
            const converter = new SigmaConverter({ transport });

            const result = await converter.installBackend("splunk");

            expect(transport.installBackend).toHaveBeenCalledWith("splunk");
            expect(result).toEqual({ success: true });
        });

        it("getAvailablePipelines delegates to the transport", async () => {
            const converter = new SigmaConverter({ transport });

            const result = await converter.getAvailablePipelines("splunk");

            expect(transport.getAvailablePipelines).toHaveBeenCalledWith("splunk");
            expect(result).toEqual({
                success: true,
                pipelines: ["windows", "sysmon"],
            });
        });
    });

    describe("status snapshots", () => {
        it("isReady and getStatus reflect the latest status", () => {
            const converter = new SigmaConverter({ transport });
            expect(converter.isReady()).toBe(false);

            const ready: EngineStatus = {
                ready: true,
                pyodideReady: true,
                installedBackends: ["splunk"],
                error: undefined,
            };
            transport.emitStatus(ready);

            expect(converter.isReady()).toBe(true);
            expect(converter.getStatus()).toEqual(ready);
        });

        it("getStatus returns a fresh copy each call", () => {
            const converter = new SigmaConverter({ transport });
            const a = converter.getStatus();
            const b = converter.getStatus();
            expect(a).toEqual(b);
            expect(a).not.toBe(b);
        });
    });

    describe("dispose", () => {
        it("disposes the transport, unsubscribes, and clears listeners", () => {
            const converter = new SigmaConverter({ transport });
            const statusListener = vi.fn();
            const readinessListener = vi.fn();
            converter.addStatusListener(statusListener);
            converter.addReadinessListener(readinessListener);
            statusListener.mockClear();
            readinessListener.mockClear();

            converter.dispose();

            expect(transport.dispose).toHaveBeenCalledTimes(1);
            expect(transport.statusUnsubscribe).toHaveBeenCalledTimes(1);

            // Status updates no longer reach the converter's listeners.
            transport.emitStatus({
                ready: true,
                pyodideReady: true,
                installedBackends: ["splunk"],
            });
            expect(statusListener).not.toHaveBeenCalled();
            expect(readinessListener).not.toHaveBeenCalled();
        });
    });
});
