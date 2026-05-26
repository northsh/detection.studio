/* tslint:disable */
/* eslint-disable */

/**
 * Evaluate one or more Sigma rules (YAML, possibly multi-doc) against a JSON
 * string that is either a single object or an array of objects.
 *
 * `pipeline_yamls` is a JSON array of pipeline YAML strings. Pass `"[]"` or
 * an empty string if no pipelines are needed.
 *
 * `filter_yamls` is a JSON array of Sigma filter rule YAML strings. Pass
 * `"[]"` or an empty string if no external filters are needed.
 *
 * Returns a JSON string with the shape of `EvalResult`.
 */
export function evaluate(rule_yaml: string, events_json: string, pipeline_yamls: string, filter_yamls: string): string;

/**
 * Initialise panic hook so Rust panics show up in the browser console.
 */
export function init(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly init: () => void;
    readonly evaluate: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => [number, number];
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
