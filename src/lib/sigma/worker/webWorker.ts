import {loadPyodide, type PyodideInterface} from 'pyodide';
import {SIGMA_TARGETS} from '@/types/SIEMs';
import registerPromiseWorker from "promise-worker/register";
import type {ConversionParams, WorkerStatus} from "./workerApi";

// Runtime state
let pyodide: PyodideInterface | null = null;
let installedBackends = new Set<string>();
let pythonModuleLoaded = false;
let sigmaNamespace: any = null;

// Keep track of the initialization state
let initializationState: WorkerStatus = {
    ready: false,
    pyodideReady: false,
    installedBackends: [],
};

// Send status updates to the main thread
function updateStatus(status: Partial<WorkerStatus>) {
    // Update our local state
    initializationState = {
        ...initializationState,
        ...status,
        installedBackends: Array.from(installedBackends),
    };

    // Send the update to the main thread
    self.postMessage({
        type: 'status_update',
        status: initializationState
    });
}

// Initialize Pyodide in the background
const pyodideReadyPromise = (async () => {
    try {
        updateStatus({ready: false, pyodideReady: false});

        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.0/full/",
            convertNullToNone: true,
        });

        await pyodide?.loadPackage("micropip");
        const micropip = pyodide?.pyimport("micropip");

        // Install custom PyYAML 6.0.3 wheel for PySigma 2.x compatibility
        const wheelUrl = new URL('/wheels/pyyaml-6.0.3-cp313-cp313-pyodide_2025_0_wasm32.whl', self.location.origin).href;
        await micropip.install(wheelUrl);

        // Install PySigma (now compatible with PyYAML 6.0.3+)
        await micropip.install('pysigma');

        updateStatus({pyodideReady: true});
        await loadPythonModule();
        updateStatus({ready: true});

        return pyodide;
    } catch (error) {
        console.error('Error initializing Pyodide:', error);
        updateStatus({
            ready: false,
            pyodideReady: false,
            error: error instanceof Error ? error.message : String(error)
        });
        throw error;
    }
})();

/**
 * Load the Python sigma converter module
 */
async function loadPythonModule() {
    try {
        // Import the Python module using Vite's dynamic import
        const sigmaConverterModule = await import('/src/lib/sigma/python/sigma_converter.py?raw');
        const pythonCode = sigmaConverterModule.default;

        // Create a namespace for our Python module only if it doesn't exist
        if (!sigmaNamespace) {
            sigmaNamespace = pyodide?.globals.get("dict")();
        }

        // Run the module code to define the functions in our namespace
        pyodide?.runPython(pythonCode, {globals: sigmaNamespace});
        pythonModuleLoaded = true;

        return true;
    } catch (error) {
        console.error('Error loading Python module:', error);
        updateStatus({
            error: `Error loading Python module: ${error instanceof Error ? error.message : String(error)}`
        });
        return false;
    }
}

/**
 * Install a backend for a specific target
 */
async function installBackend(target: string) {
    if (installedBackends.has(target)) {
        return {success: true};
    }

    const targetInfo = SIGMA_TARGETS.get(target);
    if (!targetInfo?.backend) {
        throw new Error(`No backend URL found for target ${target}`);
    }

    try {
        updateStatus({ready: false});

        const micropip = pyodide?.pyimport("micropip");

        const backendPackage = targetInfo.backend;

        console.log(`Installing backend ${backendPackage} for target ${target}...`);
        await micropip.install(backendPackage);

        installedBackends.add(target);

        // Reload the Python module to pick up the newly installed backend
        // This re-runs plugin autodiscovery which will find the new backend
        await loadPythonModule();

        updateStatus({ready: true});

        return {success: true};
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        updateStatus({
            error: `Error installing backend ${target}: ${errorMsg}`
        });
        return {
            success: false,
            error: errorMsg
        };
    }
}

/**
 * Convert a Sigma rule to a target query format
 */
async function convertRule(params: ConversionParams) {
    const {
        rule,
        target,
        pipelines = [],
        pipelineYmls = [],
        filterYml = '',
        format = "default",
        correlationMethod = '',
        backendOptions = {},
    } = params;

    if (!installedBackends.has(target)) {
        await installBackend(target);
    }

    if (!pythonModuleLoaded) {
        await loadPythonModule();
    }

    try {
        // Convert JavaScript parameters to Python, ensuring proper types
        // Use empty list for arrays, but null for optional string parameters
        const pythonParams = {
            rule,
            target,
            pipeline_names: pipelines || [],
            pipeline_ymls: pipelineYmls || [],
            filter_yml: filterYml || null,
            format,
            correlation_method: correlationMethod || null,
            backend_options: backendOptions || {},
        };

        // Set parameters in namespace using toPy
        const convertParams = pyodide?.toPy(pythonParams);

        // Extend our namespace with these parameters
        sigmaNamespace?.update(convertParams);

        // Run the Python code that uses the parameters from the namespace
        const pythonCode = `
        convert_rule(
          rule,
          target,
          pipeline_names=pipeline_names,
          pipeline_ymls=pipeline_ymls,
          filter_yml=filter_yml,
          correlation_method=correlation_method,
          backend_options=backend_options
        )
      `;

        const result = pyodide?.runPython(pythonCode, {globals: sigmaNamespace});
        return {result: result};
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        return {
            error: errorMsg,
            success: false
        };
    }
}

// Register promise worker handler
registerPromiseWorker(async (message) => {
    try {
        // Wait for Pyodide to be ready before processing any message
        await pyodideReadyPromise;
        console.log(`Worker: Processing message of type '${message.type}'`);

        const {type} = message;

        switch (type) {
            case 'convert':
                return await convertRule(message.conversionParams);

            case 'install':
                return await installBackend(message.target);

            case 'status':
                // Return the current initialization state
                return {
                    ...initializationState,
                    installedBackends: Array.from(installedBackends)
                };

            case 'get_pipelines':
                // Get available pipelines from Python
                if (!pythonModuleLoaded) {
                    await loadPythonModule();
                }
                try {
                    const pipelines = pyodide?.runPython('get_available_pipelines()', {globals: sigmaNamespace});
                    return {
                        success: true,
                        pipelines: pipelines?.toJs() || []
                    };
                } catch (error) {
                    return {
                        success: false,
                        error: error instanceof Error ? error.message : String(error),
                        pipelines: []
                    };
                }

            default:
                throw new Error(`Unknown message type: ${type}`);
        }
    } catch (error) {
        console.error(`Worker: Unhandled error processing message:`, error);
        // Return a structured error response
        return {
            error: error instanceof Error ? error.message : String(error),
            name: error instanceof Error ? error.name : 'UnknownError',
            success: false,
            // Include type information to assist with debugging
            messageType: message?.type
        };
    }
});
