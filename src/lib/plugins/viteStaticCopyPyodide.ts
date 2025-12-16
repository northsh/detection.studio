import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { viteStaticCopy } from "vite-plugin-static-copy";

const PYODIDE_EXCLUDE = ["!**/*.{md,html}", "!**/*.d.ts", "!**/*.whl", "!**/node_modules"];

function resolvePyodideDir(): string {
  // Try import.meta.resolve first (Node.js 20.6+, modern runtimes)
  if (typeof import.meta.resolve === "function") {
    try {
      const resolved = import.meta.resolve("pyodide");
      return dirname(fileURLToPath(resolved));
    } catch (e) {
      console.warn("import.meta.resolve failed, falling back to require.resolve:", e);
    }
  }

  // Fallback to require.resolve (Bun, CommonJS, older Node.js)
  try {
    const pyodidePackage = require.resolve("pyodide/package.json");
    return dirname(pyodidePackage);
  } catch {
    throw new Error(
      "Failed to resolve pyodide directory with both import.meta.resolve and require.resolve",
    );
  }
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
