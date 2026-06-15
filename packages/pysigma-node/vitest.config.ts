import { readFileSync } from "node:fs";
import type { Plugin } from "vite";
import { configDefaults, defineConfig } from "vitest/config";

/**
 * Loads `.py` imports as a default-exported string, matching the esbuild
 * `text` loader used by tsup at build time.
 */
function pythonText(): Plugin {
    return {
        name: "python-text",
        transform(_code, id) {
            if (!id.endsWith(".py")) return null;
            const source = readFileSync(id, "utf8");
            return {
                code: `export default ${JSON.stringify(source)};`,
                map: null,
            };
        },
    };
}

/**
 * Set `PYSIGMA_INTEGRATION=1` to run the slow, network-dependent integration
 * tests (`*.integration.test.ts`) that boot a real Pyodide instance. They are
 * excluded from the default fast unit run.
 */
const RUN_INTEGRATION = process.env.PYSIGMA_INTEGRATION === "1";

export default defineConfig({
    plugins: [pythonText()],
    test: {
        environment: "node",
        include: RUN_INTEGRATION
            ? ["src/**/*.integration.test.ts"]
            : ["src/**/*.test.ts"],
        exclude: RUN_INTEGRATION
            ? configDefaults.exclude
            : [...configDefaults.exclude, "src/**/*.integration.test.ts"],
        // Pyodide bootstrap + wheel installs are slow; allow generous timeouts.
        testTimeout: RUN_INTEGRATION ? 180_000 : 5_000,
        hookTimeout: RUN_INTEGRATION ? 180_000 : 10_000,
    },
});
