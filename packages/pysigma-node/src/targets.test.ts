import { describe, it, expect } from "vitest";
import {
    DEFAULT_TARGETS,
    DEFAULT_SIGMA_TARGETS,
    createTargetRegistry,
    backendNameFromPackage,
} from "./targets";
import type { SigmaTarget } from "./types";

describe("DEFAULT_SIGMA_TARGETS", () => {
    it("is a Map keyed by target id", () => {
        expect(DEFAULT_SIGMA_TARGETS).toBeInstanceOf(Map);
        for (const [key, value] of DEFAULT_SIGMA_TARGETS) {
            expect(key).toBe(value.id);
        }
    });

    it("maps known targets to their backend packages", () => {
        expect(DEFAULT_SIGMA_TARGETS.get("splunk")?.backend).toBe(
            "pysigma-backend-splunk",
        );
        expect(DEFAULT_SIGMA_TARGETS.get("esql")?.backend).toBe(
            "pysigma-backend-elasticsearch",
        );
        expect(DEFAULT_SIGMA_TARGETS.get("loki")?.backend).toBe(
            "pysigma-backend-loki",
        );
    });

    it("has the same number of entries as DEFAULT_TARGETS", () => {
        expect(DEFAULT_SIGMA_TARGETS.size).toBe(DEFAULT_TARGETS.length);
    });
});

describe("DEFAULT_TARGETS", () => {
    it("has unique ids", () => {
        const ids = DEFAULT_TARGETS.map((t) => t.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it("every entry has id, title and backend", () => {
        for (const t of DEFAULT_TARGETS) {
            expect(typeof t.id).toBe("string");
            expect(t.id.length).toBeGreaterThan(0);
            expect(typeof t.title).toBe("string");
            expect(t.backend).toMatch(/^pysigma-backend-/);
        }
    });
});

describe("createTargetRegistry", () => {
    it("builds a Map keyed by id", () => {
        const targets: SigmaTarget[] = [
            { id: "a", title: "A", backend: "pysigma-backend-a" },
            { id: "b", title: "B", backend: "pysigma-backend-b" },
        ];
        const registry = createTargetRegistry(targets);

        expect(registry).toBeInstanceOf(Map);
        expect(registry.size).toBe(2);
        expect(registry.get("a")).toEqual(targets[0]);
        expect(registry.get("b")).toEqual(targets[1]);
        expect(registry.has("c")).toBe(false);
    });

    it("returns an empty Map for an empty list", () => {
        const registry = createTargetRegistry([]);
        expect(registry.size).toBe(0);
    });
});

describe("backendNameFromPackage", () => {
    it("extracts the bare backend name from a pysigma-backend package", () => {
        expect(backendNameFromPackage("pysigma-backend-splunk", "x")).toBe(
            "splunk",
        );
        expect(
            backendNameFromPackage("pysigma-backend-elasticsearch", "x"),
        ).toBe("elasticsearch");
    });

    it("returns the fallback when the package does not match", () => {
        expect(backendNameFromPackage("something-else", "fallback")).toBe(
            "fallback",
        );
    });
});
