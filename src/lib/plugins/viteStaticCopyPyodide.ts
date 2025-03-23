import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {viteStaticCopy} from "vite-plugin-static-copy";

const PYODIDE_EXCLUDE = [
    "!**/*.{md,html}",
    "!**/*.d.ts",
    "!**/*.whl",
    "!**/node_modules",
];

export default function viteStaticCopyPyodide() {
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