import type { PyodideInterface } from "pyodide";
import jqWheel from "./wheels/jq-1.13.0-cp314-cp314-pyemscripten_2026_0_wasm32.whl";

/** Install the bundled jq build without requiring a separate asset host. */
export async function installJq(pyodide: PyodideInterface): Promise<void> {
    const path = "/tmp/jq-1.13.0-cp314-cp314-pyemscripten_2026_0_wasm32.whl";
    const micropip = pyodide.pyimport("micropip");
    try {
        pyodide.FS.writeFile(path, jqWheel);
        try {
            await micropip.install(`emfs:${path}`);
        } finally {
            pyodide.FS.unlink(path);
        }
    } finally {
        micropip.destroy();
    }
}
