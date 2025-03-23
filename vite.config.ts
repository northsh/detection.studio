import {sentryVitePlugin} from "@sentry/vite-plugin";
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from "vite-svg-loader";
import path from "path";

import viteStaticCopyPyodide from "./src/lib/plugins/viteStaticCopyPyodide.ts";
import sigmaRepoPlugin from "./src/lib/plugins/sigmaRepoPlugin.ts";


export default defineConfig({

    plugins: [
        vue(),
        sigmaRepoPlugin(),
        svgLoader(),
        viteStaticCopyPyodide(),
        sentryVitePlugin({
            org: "northsh",
            project: "detection-studio"
        })
    ],
    root: './',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        sourcemap: true,
        target: 'esnext',
    },
    worker: {
        format: 'es',
    },
})
