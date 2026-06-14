import { describe, expect, it } from "vitest";
import {
    isEvtxFile,
    buildEvtxErrorPayload,
    handleDataFile,
    EVTX_ERROR_MESSAGE,
} from "@/lib/dataFileHandler";

function mockFile(name: string, type: string, content = ""): File {
    return new File([content], name, { type });
}

describe("dataFileHandler", () => {
    describe("isEvtxFile", () => {
        it("detects .evtx extension (lowercase)", () => {
            expect(isEvtxFile({ name: "events.evtx", type: "" })).toBe(true);
        });

        it("detects .EVTX extension (uppercase)", () => {
            expect(isEvtxFile({ name: "EVENTS.EVTX", type: "" })).toBe(true);
        });

        it("detects .Evtx extension (mixed case)", () => {
            expect(isEvtxFile({ name: "Security.Evtx", type: "" })).toBe(true);
        });

        it("detects application/x-evtx MIME type regardless of extension", () => {
            expect(isEvtxFile({ name: "events.bin", type: "application/x-evtx" })).toBe(true);
        });

        it("rejects .csv files", () => {
            expect(isEvtxFile({ name: "events.csv", type: "text/csv" })).toBe(false);
        });

        it("rejects .json files", () => {
            expect(isEvtxFile({ name: "events.json", type: "application/json" })).toBe(false);
        });

        it("rejects .jsonl files", () => {
            expect(isEvtxFile({ name: "events.jsonl", type: "application/jsonl" })).toBe(false);
        });

        it("rejects .ndjson files", () => {
            expect(isEvtxFile({ name: "events.ndjson", type: "application/x-ndjson" })).toBe(false);
        });

        it("rejects files with no extension", () => {
            expect(isEvtxFile({ name: "events", type: "" })).toBe(false);
        });

        it("rejects files with unknown extension and no MIME", () => {
            expect(isEvtxFile({ name: "events.log", type: "" })).toBe(false);
        });

        it("rejects files with evtx in the name but not as extension", () => {
            expect(isEvtxFile({ name: "evtx-export.csv", type: "text/csv" })).toBe(false);
        });
    });

    describe("buildEvtxErrorPayload", () => {
        it("returns valid JSON array with error message", () => {
            const payload = buildEvtxErrorPayload();
            const parsed = JSON.parse(payload);
            expect(Array.isArray(parsed)).toBe(true);
            expect(parsed).toHaveLength(1);
            expect(parsed[0].error).toBe(EVTX_ERROR_MESSAGE);
        });

        it("error message mentions conversion tools", () => {
            const payload = buildEvtxErrorPayload();
            expect(payload).toContain("evtx2json");
            expect(payload).toContain("EvtxECmd");
        });
    });

    describe("handleDataFile", () => {
        it("returns evtx kind for .evtx files", async () => {
            const file = mockFile("events.evtx", "application/x-evtx", "binary data");
            const result = await handleDataFile(file);
            expect(result.kind).toBe("evtx");
            const parsed = JSON.parse(result.content);
            expect(parsed[0].error).toBe(EVTX_ERROR_MESSAGE);
        });

        it("returns evtx kind for files with application/x-evtx MIME", async () => {
            const file = mockFile("events.bin", "application/x-evtx", "binary data");
            const result = await handleDataFile(file);
            expect(result.kind).toBe("evtx");
        });

        it("reads CSV file as text", async () => {
            const csvContent = "EventID,Image\n1,C:\\Windows\\System32\\whoami.exe\n";
            const file = mockFile("events.csv", "text/csv", csvContent);
            const result = await handleDataFile(file);
            expect(result.kind).toBe("text");
            expect(result.content).toBe(csvContent);
        });

        it("reads JSON file as text", async () => {
            const jsonContent = JSON.stringify([{ EventID: 1, Image: "whoami.exe" }]);
            const file = mockFile("events.json", "application/json", jsonContent);
            const result = await handleDataFile(file);
            expect(result.kind).toBe("text");
            expect(result.content).toBe(jsonContent);
        });

        it("reads JSONL file as text", async () => {
            const jsonlContent = '{"EventID":1,"Image":"whoami.exe"}\n{"EventID":2,"Image":"cmd.exe"}\n';
            const file = mockFile("events.jsonl", "application/jsonl", jsonlContent);
            const result = await handleDataFile(file);
            expect(result.kind).toBe("text");
            expect(result.content).toBe(jsonlContent);
        });

        it("reads NDJSON file as text", async () => {
            const ndjsonContent = '{"EventID":1}\n{"EventID":2}\n';
            const file = mockFile("events.ndjson", "application/x-ndjson", ndjsonContent);
            const result = await handleDataFile(file);
            expect(result.kind).toBe("text");
            expect(result.content).toBe(ndjsonContent);
        });

        it("handles empty CSV file", async () => {
            const file = mockFile("empty.csv", "text/csv", "");
            const result = await handleDataFile(file);
            expect(result.kind).toBe("text");
            expect(result.content).toBe("");
        });

        it("handles CSV with UTF-8 BOM (BOM stripped by File.text())", async () => {
            const csvContent = "\uFEFFEventID,Image\n1,whoami.exe\n";
            const file = mockFile("events.csv", "text/csv", csvContent);
            const result = await handleDataFile(file);
            expect(result.kind).toBe("text");
            expect(result.content).toBe("EventID,Image\n1,whoami.exe\n");
        });

        it("handles large CSV content", async () => {
            const header = "EventID,Image,CommandLine,ParentImage,Timestamp";
            const rows = Array.from({ length: 1000 }, (_, i) =>
                `${i},C:\\Windows\\System32\\svchost.exe,-k netsvcs,C:\\Windows\\System32\\cmd.exe,2026-05-31T00:00:${String(i % 60).padStart(2, "0")}Z`
            );
            const csvContent = [header, ...rows].join("\n");
            const file = mockFile("large.csv", "text/csv", csvContent);
            const result = await handleDataFile(file);
            expect(result.kind).toBe("text");
            expect(result.content).toBe(csvContent);
            expect(result.content.split("\n").length).toBe(1001);
        });
    });
});
