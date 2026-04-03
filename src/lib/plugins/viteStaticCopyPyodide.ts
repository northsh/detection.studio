import { createRequire } from "module";
import { readdirSync } from "fs";
import { dirname, join } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

function shouldIncludePyodideFile(name: string): boolean {
    if (name.endsWith(".md") || name.endsWith(".html")) return false;
    if (name.endsWith(".d.ts")) return false;
    if (name.endsWith(".whl")) return false;
    return true;
}

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

    // List pyodide files explicitly to avoid glob issues with
    // symlinked/hardlinked node_modules in CI (Bun's package layout).
    const pyodideFiles = readdirSync(pyodideDir, { withFileTypes: true })
        .filter((f) => f.isFile() && shouldIncludePyodideFile(f.name))
        .map((f) => join(pyodideDir, f.name));

    console.log(`Found ${pyodideFiles.length} Pyodide files to copy`);

    return viteStaticCopy({
        targets: [
            {
                src: pyodideFiles,
                dest: "assets",
            },
            {
                src: "src/lib/sigma/python/*.py",
                dest: "",
            },
        ],
    });
}
