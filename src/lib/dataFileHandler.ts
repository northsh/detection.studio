export const EVTX_ERROR_MESSAGE =
    "EVTX binary files must be converted to JSON before uploading. Use a tool like evtx2json or EvtxECmd to convert.";

const EVTX_EXTENSIONS = [".evtx"];

export function isEvtxFile(file: { name: string; type: string }): boolean {
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    if (EVTX_EXTENSIONS.includes(ext)) return true;
    if (file.type === "application/x-evtx") return true;
    return false;
}

export function buildEvtxErrorPayload(): string {
    return JSON.stringify([{ error: EVTX_ERROR_MESSAGE }]);
}

export type FileHandlerResult =
    | { kind: "text"; content: string }
    | { kind: "evtx"; content: string };

export async function handleDataFile(file: File): Promise<FileHandlerResult> {
    if (isEvtxFile(file)) {
        return { kind: "evtx", content: buildEvtxErrorPayload() };
    }
    const text = await file.text();
    return { kind: "text", content: text };
}
