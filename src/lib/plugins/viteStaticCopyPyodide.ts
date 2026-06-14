import { viteStaticCopy } from "vite-plugin-static-copy";

/**
 * Copies Python source files needed at runtime into the build output.
 *
 * Pyodide itself is loaded from the jsDelivr CDN at runtime, so we do NOT
 * copy the Pyodide dist from node_modules — only the application's .py
 * modules that are fetched by the web worker.
 */
export default function viteStaticCopyPyodide() {
    return viteStaticCopy({
        silent: true,
        targets: [
            {
                src: "src/lib/sigma/python/*.py",
                dest: "",
            },
        ],
    });
}
