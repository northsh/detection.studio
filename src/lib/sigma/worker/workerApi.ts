import PromiseWorker from 'promise-worker';

// Create the worker instance
const worker = new Worker(new URL("./webWorker.ts", import.meta.url), { type: "module" });
const promiseWorker = new PromiseWorker(worker);

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

  return promiseWorker.postMessage({
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
  return promiseWorker.postMessage({
    type: 'install',
    target,
  });
}

/**
 * Check if Pyodide is ready
 */
export function isPyodideReadyAsync() {
  return promiseWorker.postMessage({
    type: 'status',
  });
}

/**
 * Load JSON log data into SQLite
 */
export function loadLogDataAsync(data: string) {
  return promiseWorker.postMessage({
    type: 'loadData',
    data
  });
}

/**
 * Search logs with the SQL query
 */
export function searchLogsAsync(query: string) {
  return promiseWorker.postMessage({
    type: 'search',
    query
  });
}