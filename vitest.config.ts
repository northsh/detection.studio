import { defineConfig } from "vitest/config";
import path from "node:path";

// Vitest config kept separate from `vite.config.ts` so unit tests don't drag
// in the dev/build plugin chain (Sentry, Pyodide static-copy, sigma-repo, the
// SVG loader, etc.) — none of which are needed to exercise the WASM module
// or the small TS units that wrap it.
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        environment: "node",
        // Globs for the suites we own and want green in CI. Add more as
        // existing fragile tests are stabilised.
        include: ["src/lib/rsigma-wasm/__tests__/**/*.test.ts"],
        // Treat `.wasm` as a static asset — needed so `new URL('./foo.wasm',
        // import.meta.url)` resolves to a usable file:// URL under Vitest.
        server: {
            deps: {
                inline: ["@/lib/rsigma-wasm/pkg/rsigma_wasm"],
            },
        },
    },
});
