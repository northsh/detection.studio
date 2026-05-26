import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";

// These tests load the real WASM binary that ships to users (via wasm-pack's
// `--target web` output) and exercise the parser through the public
// `evaluate(...)` entry point. They complement the Rust unit tests in
// `rsigma-wasm/src/lib.rs` by also catching "stale .wasm in pkg/" mismatches
// — i.e. the Rust source changed but `bun run build:wasm` was never run.
//
// We use `initSync(bytes)` to bootstrap the module, because Node's built-in
// `fetch` does not (yet) support `file://` URLs — the default `init()` path
// in the wasm-pack-generated bindings does `fetch(new URL('...wasm',
// import.meta.url))`, which fails under Vitest with `not implemented... yet`.
// `initSync` takes a `BufferSource | WebAssembly.Module`, which sidesteps
// fetch entirely.

import { initSync, evaluate } from "@/lib/rsigma-wasm/pkg/rsigma_wasm";

interface RawEvalResult {
    matches: Array<{
        event: Record<string, unknown>;
        index: number;
        matched_rules: Array<{
            rule_title: string;
            rule_id: string | null;
            level: string | null;
            tags: string[];
            matched_selections: string[];
            matched_fields: Array<{ field: string; value: unknown }>;
        }>;
    }>;
    stats: {
        total_records: number;
        total_matches: number;
    };
    field_analysis: {
        rule_fields: string[];
        data_fields: string[];
        missing_fields: string[];
    };
    error: string | null;
}

function run(rule: string, events: string): RawEvalResult {
    const raw = evaluate(rule, events, "[]", "[]");
    return JSON.parse(raw) as RawEvalResult;
}

const WHOAMI_RULE = `title: Whoami execution
id: 11111111-1111-1111-1111-111111111111
status: test
logsource:
    product: windows
    category: process_creation
detection:
    selection:
        Image|endswith: 'whoami.exe'
    condition: selection
level: low
`;

beforeAll(() => {
    // Read the .wasm bytes directly from disk and hand them to `initSync`.
    // The .wasm sits next to `rsigma_wasm.js` in the wasm-pack output dir.
    const wasmUrl = new URL("../pkg/rsigma_wasm_bg.wasm", import.meta.url);
    const wasmBytes = readFileSync(fileURLToPath(wasmUrl));
    initSync({ module: wasmBytes });
});

describe("rsigma-wasm: events parsing via evaluate()", () => {
    describe("JSON / NDJSON", () => {
        it("matches against a JSON array of events", () => {
            const events = JSON.stringify([
                { EventID: 1, Image: "/usr/bin/whoami.exe" },
                { EventID: 1, Image: "/usr/bin/cmd.exe" },
            ]);
            const r = run(WHOAMI_RULE, events);
            expect(r.error).toBeNull();
            expect(r.stats.total_records).toBe(2);
            expect(r.stats.total_matches).toBe(1);
            expect(r.matches[0]?.event.Image).toBe("/usr/bin/whoami.exe");
        });

        it("matches against a single JSON object", () => {
            const events = JSON.stringify({ EventID: 1, Image: "/usr/bin/whoami.exe" });
            const r = run(WHOAMI_RULE, events);
            expect(r.error).toBeNull();
            expect(r.stats.total_records).toBe(1);
            expect(r.stats.total_matches).toBe(1);
        });

        it("matches against NDJSON input", () => {
            const events = [
                JSON.stringify({ EventID: 1, Image: "/usr/bin/whoami.exe" }),
                JSON.stringify({ EventID: 1, Image: "/usr/bin/cmd.exe" }),
                JSON.stringify({ EventID: 1, Image: "/opt/whoami.exe" }),
            ].join("\n");
            const r = run(WHOAMI_RULE, events);
            expect(r.error).toBeNull();
            expect(r.stats.total_records).toBe(3);
            expect(r.stats.total_matches).toBe(2);
        });

        it("returns an error for malformed JSON that starts with `{`", () => {
            const r = run(WHOAMI_RULE, '{"EventID": 1');
            expect(r.error).toMatch(/Failed to parse events JSON/);
            expect(r.stats.total_records).toBe(0);
        });

        it("returns an error for empty input", () => {
            const r = run(WHOAMI_RULE, "");
            expect(r.error).toMatch(/empty/i);
        });
    });

    describe("CSV", () => {
        it("matches against a basic CSV file", () => {
            const csv = [
                "EventID,Image,CommandLine",
                "1,/usr/bin/whoami.exe,whoami",
                "1,/usr/bin/cmd.exe,cmd /c dir",
            ].join("\n");
            const r = run(WHOAMI_RULE, csv);
            expect(r.error).toBeNull();
            expect(r.stats.total_records).toBe(2);
            expect(r.stats.total_matches).toBe(1);
            expect(r.matches[0]?.event.EventID).toBe(1); // coerced to number
            expect(r.matches[0]?.event.Image).toBe("/usr/bin/whoami.exe");
        });

        it("coerces numbers, booleans, and empty cells", () => {
            // Probe coercion through the data_fields/event payload, since
            // `evaluate` exposes the parsed events back via `matches[].event`.
            const rule = `title: Always
id: 22222222-2222-2222-2222-222222222222
status: test
logsource:
    product: test
detection:
    selection:
        score|gte: 0
    condition: selection
level: low
`;
            const csv = [
                "id,score,enabled,note",
                "1,0.75,true,",
                "2,3,FALSE,hello",
            ].join("\n");
            const r = run(rule, csv);
            expect(r.error).toBeNull();
            expect(r.stats.total_records).toBe(2);
            expect(r.matches[0]?.event).toMatchObject({
                id: 1,
                score: 0.75,
                enabled: true,
                note: null,
            });
            expect(r.matches[1]?.event).toMatchObject({
                id: 2,
                score: 3,
                enabled: false,
                note: "hello",
            });
        });

        it("preserves zero-padded identifiers as strings", () => {
            // Regression: "0078" must stay "0078", not collapse to 78. Easiest
            // way to assert from JS is to look at the matched event payload.
            const rule = `title: Code probe
id: 33333333-3333-3333-3333-333333333333
status: test
logsource:
    product: test
detection:
    selection:
        code: '0078'
    condition: selection
level: low
`;
            const csv = "name,code\nfoo,0078\nbar,123\n";
            const r = run(rule, csv);
            expect(r.error).toBeNull();
            expect(r.stats.total_records).toBe(2);
            expect(r.stats.total_matches).toBe(1);
            expect(r.matches[0]?.event.code).toBe("0078");
        });

        it("regression: detects CSV that starts with a quoted header field", () => {
            // Mirrors the failure mode of an Elastic Discover CSV export, where
            // every header field is quoted and the first byte of the file is
            // therefore `"` (not `{` or `[`). Earlier versions of the sniffer
            // routed this into the JSON path and produced a confusing
            // "trailing characters at line 1 column 13" error.
            const csv = [
                '"@timestamp","event.id","Image"',
                '"2026-05-25T22:35:17.000Z","abc-123","/usr/bin/whoami.exe"',
                '"2026-05-25T22:35:18.000Z","def-456","/usr/bin/cmd.exe"',
            ].join("\n");
            const r = run(WHOAMI_RULE, csv);
            expect(r.error).toBeNull();
            expect(r.stats.total_records).toBe(2);
            expect(r.stats.total_matches).toBe(1);
            expect(r.matches[0]?.event["event.id"]).toBe("abc-123");
        });

        it("returns an error for a CSV with only a header row", () => {
            const r = run(WHOAMI_RULE, "EventID,Image\n");
            expect(r.error).toMatch(/no data rows/i);
        });

        it("handles CRLF line endings", () => {
            const csv = "EventID,Image\r\n1,/usr/bin/whoami.exe\r\n2,/usr/bin/cmd.exe\r\n";
            const r = run(WHOAMI_RULE, csv);
            expect(r.error).toBeNull();
            expect(r.stats.total_records).toBe(2);
            expect(r.stats.total_matches).toBe(1);
        });

        it("handles quoted fields containing commas and escaped quotes", () => {
            const csv = [
                "name,description,Image",
                '"a,b","He said ""hi""","/usr/bin/whoami.exe"',
            ].join("\n");
            const r = run(WHOAMI_RULE, csv);
            expect(r.error).toBeNull();
            expect(r.stats.total_records).toBe(1);
            expect(r.stats.total_matches).toBe(1);
            expect(r.matches[0]?.event.name).toBe("a,b");
            expect(r.matches[0]?.event.description).toBe('He said "hi"');
        });
    });
});
