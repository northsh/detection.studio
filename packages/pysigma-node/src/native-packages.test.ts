import type { PyodideInterface } from "pyodide";
import { describe, expect, it, vi } from "vitest";
import { installJq } from "./native-packages";

function runtime() {
    const micropip = { install: vi.fn().mockResolvedValue(undefined), destroy: vi.fn() };
    const pyodide = {
        FS: { writeFile: vi.fn(), unlink: vi.fn() },
        pyimport: vi.fn().mockReturnValue(micropip),
    };
    return { pyodide, micropip };
}

describe("installJq", () => {
    it("installs the bundled wheel from the virtual filesystem and cleans up", async () => {
        const { pyodide, micropip } = runtime();
        await installJq(pyodide as unknown as PyodideInterface);
        const [path, bytes] = pyodide.FS.writeFile.mock.calls[0];
        expect(bytes).toBeInstanceOf(Uint8Array);
        expect(Array.from(bytes.slice(0, 2))).toEqual([0x50, 0x4b]);
        expect(micropip.install).toHaveBeenCalledWith(`emfs:${path}`);
        expect(pyodide.FS.unlink).toHaveBeenCalledWith(path);
        expect(micropip.destroy).toHaveBeenCalledOnce();
    });

    it("removes the wheel and releases the Python proxy if installation fails", async () => {
        const { pyodide, micropip } = runtime();
        const error = new Error("incompatible wheel");
        micropip.install.mockRejectedValue(error);
        await expect(installJq(pyodide as unknown as PyodideInterface)).rejects.toThrow(error);
        expect(pyodide.FS.unlink).toHaveBeenCalledOnce();
        expect(micropip.destroy).toHaveBeenCalledOnce();
    });

    it("releases the Python proxy if writing the wheel fails", async () => {
        const { pyodide, micropip } = runtime();
        pyodide.FS.writeFile.mockImplementation(() => {
            throw new Error("write failed");
        });
        await expect(installJq(pyodide as unknown as PyodideInterface)).rejects.toThrow(
            "write failed",
        );
        expect(micropip.install).not.toHaveBeenCalled();
        expect(pyodide.FS.unlink).not.toHaveBeenCalled();
        expect(micropip.destroy).toHaveBeenCalledOnce();
    });
});
