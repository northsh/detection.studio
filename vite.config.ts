import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, type UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import path from "path";

import sigmaRepoPlugin from "./src/lib/plugins/sigmaRepoPlugin.ts";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    sigmaRepoPlugin(),
    svgLoader(),
    !process.env.CI &&
    sentryVitePlugin({
      org: "northsh",
      project: "detection-studio",
      telemetry: false,
    }),
  ],
  root: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      ignored: ["**/.sigma-repo/**"],
    },
  },
  optimizeDeps: {
    exclude: ["pyodide"],
    include: ["flexsearch"],
  },
  assetsInclude: ["**/*.wasm"],
  worker: {
    format: "es", // Use ES module format for workers (required for Vite 7/Rollup)
  },
  build: {
    sourcemap: true,
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    dirStyle: "nested",
    mock: true,
  },
}) as UserConfig;
