import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from "vite-svg-loader";
import path, {dirname, join} from "path";
import {fileURLToPath} from "url";
import {viteStaticCopy} from "vite-plugin-static-copy";
const PYODIDE_EXCLUDE = [
    "!**/*.{md,html}",
    "!**/*.d.ts",
    "!**/*.whl",
    "!**/node_modules",
];

export function viteStaticCopyPyodide() {
    const pyodideDir = dirname(fileURLToPath(import.meta.resolve("pyodide")));
    return viteStaticCopy({
        targets: [
            {
                src: [join(pyodideDir, "*")].concat(PYODIDE_EXCLUDE),
                dest: "assets",
            },
            {
                src: 'src/lib/sigma/python/*.py',
                dest: '',
            },
        ],
    });
}

// https://vite.dev/config/
export default defineConfig({

    plugins: [
        vue(),
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
    }
})
