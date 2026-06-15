import type { ConversionParams, EngineStatus } from "../types";

/**
 * Message protocol shared between the Web Worker entry and the
 * {@link WorkerTransport}. A minimal request/response scheme keyed by `id`,
 * plus unsolicited `status_update` notifications from the worker.
 */

export type WorkerRequest =
    | { id: number; type: "convert"; conversionParams: ConversionParams }
    | { id: number; type: "install"; target: string }
    | { id: number; type: "status" }
    | { id: number; type: "get_pipelines"; target: string };

export interface WorkerResponse {
    id: number;
    result?: unknown;
    error?: string;
}

export interface StatusNotification {
    type: "status_update";
    status: EngineStatus;
}

export type WorkerOutbound = WorkerResponse | StatusNotification;
