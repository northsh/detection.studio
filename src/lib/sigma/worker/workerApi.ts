import PromiseWorker from 'promise-worker';

// For client-side use only - lazy initialization
let worker: Worker | null = null;
let promiseWorker: any = null;

// Initialize worker only in browser environment
function getPromiseWorker() {
    if (!promiseWorker) {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
            worker = new Worker(new URL("./webWorker.ts", import.meta.url), {type: "module"});
            promiseWorker = new PromiseWorker(worker);
        } else {
            // Mock for SSR/SSG context - return an object that can handle the method calls
            const errorHandler = () => Promise.resolve({ 
                error: "Worker not available in SSR/SSG context",
                ready: false 
            });
            promiseWorker = { postMessage: errorHandler };
        }
    }
    return promiseWorker;
}

/**
 * Convert a Sigma rule to a SIEM query
 */
export function convertSigmaRuleAsync(
    rule: string,
    target: string,
    pipelines: string[] = [],
    pipelineYmls: string[] = [],
    filterYml: string,
    format: string,
    correlationMethod: string,
    backendOptions: Record<string, any> = {}
) {
    return getPromiseWorker().postMessage({
        type: 'convert',
        rule,
        target,
        pipelines,
        pipelineYmls,
        filterYml,
        format,
        correlationMethod,
        backendOptions
    });
}

/**
 * Install a backend for a specific target
 */
export function installBackendAsync(target: string) {
    return getPromiseWorker().postMessage({
        type: 'install',
        target,
    });
}

/**
 * Check if Pyodide is ready
 */
export function isPyodideReadyAsync() {
    return getPromiseWorker().postMessage({
        type: 'status',
    });
}

/**
 * Load JSON log data into SQLite
 */
export function loadLogDataAsync(data: string) {
    return getPromiseWorker().postMessage({
        type: 'loadData',
        data
    });
}

/**
 * Search logs with the SQL query
 */
export function searchLogsAsync(query: string) {
    return getPromiseWorker().postMessage({
        type: 'search',
        query
    });
}