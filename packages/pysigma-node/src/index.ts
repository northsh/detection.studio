/**
 * @northsh/pysigma-node
 *
 * Run the Python pySigma library in Node.js and the browser via Pyodide
 * (WebAssembly) and convert Sigma detection rules to SIEM queries.
 */
export { SigmaConverter } from "./SigmaConverter";
export type { SigmaConverterOptions } from "./SigmaConverter";

export {
    PyodideSigmaEngine,
    DEFAULT_PYSIGMA_VERSION,
    DEFAULT_PIPELINE_PACKAGES,
    SIGMA_CONVERTER_PY,
} from "./core";

export {
    DEFAULT_TARGETS,
    DEFAULT_SIGMA_TARGETS,
    createTargetRegistry,
    backendNameFromPackage,
} from "./targets";

export type { SigmaTransport } from "./transports/transport";
export { DirectTransport } from "./transports/directTransport";
export { WorkerTransport } from "./transports/workerTransport";

export type {
    ConversionParams,
    EngineStatus,
    PyodideSigmaOptions,
    SigmaConversionResult,
    SigmaTarget,
    WorkerStatus,
} from "./types";
