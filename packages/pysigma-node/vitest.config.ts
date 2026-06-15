import { readFileSync } from "node:fs";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

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

export default defineConfig({
    plugins: [pythonText()],
    test: {
        environment: "node",
        include: ["src/**/*.test.ts"],
    },
});
