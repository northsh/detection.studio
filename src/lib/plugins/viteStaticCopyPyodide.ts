import { createRequire } from "module";
import { dirname, join } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

const PYODIDE_EXCLUDE = ["!**/*.{md,html}", "!**/*.d.ts", "!**/*.whl", "!**/node_modules"];

function resolvePyodideDir(): string {
    // Use createRequire to avoid Vite intercepting import.meta.resolve
    // during config bundling, which rewrites it to an internal
    // vite-module-runner protocol that fails in CI environments.
    const require = createRequire(import.meta.url);
    const pyodidePackage = require.resolve("pyodide/package.json");
    return dirname(pyodidePackage);
}

export default function viteStaticCopyPyodide() {
    console.log("Including Pyodide static files...");

    const pyodideDir = resolvePyodideDir();
    console.log("Pyodide directory:", pyodideDir);

    return viteStaticCopy({
        targets: [
            {
                src: [join(pyodideDir, "*")].concat(PYODIDE_EXCLUDE),
                dest: "assets",
            },
            {
                src: "src/lib/sigma/python/*.py",
                dest: "",
            },
        ],
    });
}
