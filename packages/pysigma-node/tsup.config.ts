import { defineConfig } from "tsup";
import { copyFile } from "node:fs/promises";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        core: "src/core.ts",
        worker: "src/worker.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    sourcemap: true,
    onSuccess: async () => {
        await copyFile("src/wheels/LICENSES.txt", "dist/JQ-LICENSES.txt");
    },
    treeshake: true,
    // pyodide is a peer dependency and must never be bundled.
    external: ["pyodide"],
    target: "es2022",
    platform: "neutral",
    // Inline the Python source as a string at bundle time. The .py file stays
    // the single source of truth in src/ and the string only appears in dist/.
    loader: {
        ".py": "text",
        ".whl": "binary",
    },
});
