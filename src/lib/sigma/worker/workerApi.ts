import PromiseWorker from "promise-worker";

// For client-side use only - lazy initialization
let worker: Worker;
let promiseWorker: PromiseWorker;

// Status event handlers
const statusListeners: ((status: WorkerStatus) => void)[] = [];

export type WorkerStatus = {
  ready: boolean;
  pyodideReady: boolean;
  installedBackends: string[];
  error?: string;
};

type WorkerMessage = {
  type: string;
  conversionParams?: ConversionParams;
  target?: string;
};

type WorkerResponse = {
  type?: string;
  status?: WorkerStatus;
  result?: string;
  error?: string;
  success?: boolean;
};

// Initialize worker only in browser environment
function getWorker(): PromiseWorker {
  if (!promiseWorker) {
    // Check if we're in a browser environment
    if (typeof window !== "undefined" && typeof Worker !== "undefined") {
      worker = new Worker(new URL("./webWorker.ts", import.meta.url), { type: "module" });
      promiseWorker = new PromiseWorker(worker);

      // Set up direct message handler for status updates
      worker.addEventListener("message", (event) => {
        const data = event.data;

        // Handle direct status updates that bypass PromiseWorker
        if (data && data.type === "status_update") {
          notifyStatusListeners(data.status);
        }
      });
    }
  }

  return promiseWorker;
}

export type ConversionParams = {
  rule: string;
  target: string;
  pipelines?: string[];
  pipelineYmls?: string[];
  filterYml?: string;
  format?: string;
  correlationMethod?: string;
  backendOptions?: Record<string, any>;
};

/**
 * Add a listener for worker status updates
 */
export function addStatusListener(listener: (status: WorkerStatus) => void) {
  statusListeners.push(listener);

  // Immediately request current status
  getWorkerStatus()
    .then((status) => {
      listener(status);
    })
    .catch((error) => {
      console.error("Error fetching initial worker status:", error);
    });

  return () => {
    const index = statusListeners.indexOf(listener);
    if (index !== -1) {
      statusListeners.splice(index, 1);
    }
  };
}

/**
 * Notify all status listeners of a status update
 */
function notifyStatusListeners(status: WorkerStatus) {
  statusListeners.forEach((listener) => listener(status));
}

/**
 * Convert a Sigma rule to a target query format
 */
export function convert(conversionParams: ConversionParams): Promise<WorkerResponse> {
  return getWorker().postMessage<WorkerResponse, WorkerMessage>({
    type: "convert",
    conversionParams,
  });
}

/**
 * Install a backend for a specific target
 */
export function installBackend(target: string): Promise<WorkerResponse> {
  return getWorker().postMessage<WorkerResponse, WorkerMessage>({
    type: "install",
    target,
  });
}

/**
 * Get current worker status
 */
export function getWorkerStatus(): Promise<WorkerStatus> {
  return getWorker().postMessage<WorkerStatus, WorkerMessage>({
    type: "status",
  });
}

/**
 * Get available pipelines from installed plugins
 */
export function getAvailablePipelines(target: string): Promise<{
  success: boolean;
  pipelines: string[];
  error?: string;
}> {
  return getWorker().postMessage<
    { success: boolean; pipelines: string[]; error?: string },
    WorkerMessage
  >({
    type: "get_pipelines",
    target,
  });
}
