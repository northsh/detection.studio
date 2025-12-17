import { vi } from "vitest";

// Mock Worker API types
export interface WorkerStatus {
    ready: boolean;
    pyodideReady: boolean;
    installedBackends: string[];
}

export interface ConversionParams {
    rule: string;
    target: string;
    pipelines: string[];
    pipelineYmls: string[];
    filterYml: string;
    format: string;
    correlationMethod: string;
    backendOptions: Record<string, any>;
}

export interface ConversionResult {
    result: string | null;
    error: string | null;
}

export interface InstallResult {
    success: boolean;
    error?: string;
}

// Mock implementations
export const mockWorkerApi = {
    convert: vi.fn<[ConversionParams], Promise<ConversionResult>>(),
    installBackend: vi.fn<[string], Promise<InstallResult>>(),
    getWorkerStatus: vi.fn<[], Promise<WorkerStatus>>(),
    addStatusListener: vi.fn<[(status: WorkerStatus) => void], () => void>(),
};

// Setup global mocks
vi.mock("@/lib/sigma/worker/workerApi", () => mockWorkerApi);

vi.mock("@/types/SIEMs", () => ({
    SIGMA_TARGETS: new Set(["splunk", "elastic", "qradar", "sentinel"]),
}));

// Mock global Worker for SSR tests
Object.defineProperty(global, "Worker", {
    writable: true,
    value: class MockWorker {
        constructor() {}
        postMessage() {}
        terminate() {}
    },
});
