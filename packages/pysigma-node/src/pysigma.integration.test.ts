/**
 * End-to-end integration tests.
 *
 * Unlike the unit tests (which mock the transport), these boot a *real* Pyodide
 * instance, install pySigma plus a backend from PyPI over the network, and run
 * an actual Sigma rule conversion. They are therefore slow and require network
 * access, so they live in a dedicated `*.integration.test.ts` file that is
 * excluded from the default `test` run — use `bun run test:integration`.
 *
 * In Node, the engine loads the locally installed `pyodide` package (with its
 * bundled wheels for micropip/pyyaml); pySigma and the backends are fetched
 * from PyPI by micropip at runtime.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PyodideSigmaEngine } from "./core";
import { SigmaConverter } from "./SigmaConverter";
import type { EngineStatus } from "./types";

/** A minimal, valid Sigma rule that every backend should be able to convert. */
const SIGMA_RULE = `title: Whoami Execution
status: test
logsource:
    category: process_creation
    product: windows
detection:
    selection:
        Image|endswith: \\whoami.exe
    condition: selection
`;

// Booting Pyodide + installing wheels over the network is slow; give each hook
// and test plenty of headroom.
const BOOT_TIMEOUT = 180_000;
const CONVERT_TIMEOUT = 120_000;

describe("integration: PyodideSigmaEngine", () => {
    let engine: PyodideSigmaEngine;
    const statuses: EngineStatus[] = [];

    beforeAll(async () => {
        engine = new PyodideSigmaEngine({
            onStatus: (s) => statuses.push(s),
        });
        await engine.init();
    }, BOOT_TIMEOUT);

    it("becomes ready after init and reports pyodide loaded", () => {
        expect(engine.isReady()).toBe(true);
        const status = engine.getStatus();
        expect(status.ready).toBe(true);
        expect(status.pyodideReady).toBe(true);
        expect(status.error).toBeUndefined();
    });

    it("emitted a pyodideReady status before becoming fully ready", () => {
        expect(statuses.some((s) => s.pyodideReady)).toBe(true);
        expect(statuses.some((s) => s.ready)).toBe(true);
    });

    it(
        "installs the splunk backend on demand and converts a Sigma rule",
        async () => {
            const install = await engine.installBackend("splunk");
            expect(install.success).toBe(true);
            expect(engine.getStatus().installedBackends).toContain("splunk");

            const result = await engine.convert({
                rule: SIGMA_RULE,
                target: "splunk",
            });

            expect(result.success).toBe(true);
            expect(result.error).toBeUndefined();
            // The Splunk backend lowercases the field and emits an SPL search.
            expect(result.result).toBeTypeOf("string");
            expect(result.result).toContain("whoami.exe");
            expect(result.result).toContain("Image=");
        },
        CONVERT_TIMEOUT,
    );

    it(
        "lists available pipelines for an installed backend",
        async () => {
            await engine.installBackend("splunk");
            const { success, pipelines } = await engine.getAvailablePipelines(
                "splunk",
            );
            expect(success).toBe(true);
            expect(Array.isArray(pipelines)).toBe(true);
        },
        CONVERT_TIMEOUT,
    );

    it(
        "returns a structured error for an unknown backend target",
        async () => {
            const result = await engine.convert({
                rule: SIGMA_RULE,
                target: "does-not-exist",
            });
            expect(result.success).toBe(false);
            expect(result.error).toBeTruthy();
        },
        CONVERT_TIMEOUT,
    );
});

describe("integration: SigmaConverter (high-level facade)", () => {
    let converter: SigmaConverter;

    beforeAll(() => {
        // DirectTransport (no worker) runs the engine in-process and kicks off
        // initialisation eagerly.
        converter = new SigmaConverter();
    });

    afterAll(() => {
        converter.dispose();
    });

    it(
        "becomes ready, then converts a rule to a non-empty Splunk query",
        async () => {
            await converter.installBackend("splunk");
            expect(converter.isReady()).toBe(true);

            const { query, error } = await converter.convert(
                SIGMA_RULE,
                "splunk",
            );

            expect(error).toBeUndefined();
            expect(query).toContain("whoami.exe");
        },
        BOOT_TIMEOUT,
    );

    it(
        "converts the same rule to a second backend (elasticsearch / esql)",
        async () => {
            const { query, error } = await converter.convert(
                SIGMA_RULE,
                "esql",
            );

            expect(error).toBeUndefined();
            expect(query).toContain("whoami.exe");
        },
        CONVERT_TIMEOUT,
    );

    it(
        "surfaces an error for a target not in the registry",
        async () => {
            const restricted = new SigmaConverter({
                targets: new Map([
                    [
                        "splunk",
                        {
                            id: "splunk",
                            title: "Splunk",
                            backend: "pysigma-backend-splunk",
                        },
                    ],
                ]),
            });

            const { query, error } = await restricted.convert(
                SIGMA_RULE,
                "loki",
            );
            expect(query).toBe("");
            expect(error).toBe("Unsupported target: loki");

            restricted.dispose();
        },
        BOOT_TIMEOUT,
    );
});
