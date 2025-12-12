import {sentryVitePlugin} from "@sentry/vite-plugin";
import {defineConfig, type UserConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import path from "path";

import viteStaticCopyPyodide from "./src/lib/plugins/viteStaticCopyPyodide.ts";
import sigmaRepoPlugin from "./src/lib/plugins/sigmaRepoPlugin.ts";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        sigmaRepoPlugin(),
        svgLoader(),
        viteStaticCopyPyodide(),
        sentryVitePlugin({
            org: "northsh",
            project: "detection-studio",
            telemetry: false
        }),
    ],
    root: "./",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    worker: {
        format: 'es', // Use ES module format for workers (required for Vite 7/Rollup)
    },
    build: {
        sourcemap: true
    },
    ssgOptions: {
        script: "async",
        formatting: "minify",
        dirStyle: "nested",
        mock: true,
    },
}) as UserConfig;
