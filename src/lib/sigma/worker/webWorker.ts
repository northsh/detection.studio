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
        updateStatus({ ready: false, pyodideReady: false });
        
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.28.2/full/",
            convertNullToNone: true,
        });

        await pyodide?.loadPackage("micropip");
        const micropip = pyodide?.pyimport("micropip");

        // Install sigma-cli
        // We use a specific older wheel URL to avoid conflicts with newer PyYAML versions
        await micropip.install('https://files.pythonhosted.org/packages/6c/96/2da0acf4ded16ef746782a95f2c4ec5dd41ab02667df35a4e68adb8b69b1/pysigma-0.11.23-py3-none-any.whl');

        updateStatus({ pyodideReady: true });
        await loadPythonModule();
        updateStatus({ ready: true });
        
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

        // Create a namespace for our Python module
        sigmaNamespace = pyodide?.globals.get("dict")();

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
        updateStatus({ ready: false });
        
        const micropip = pyodide?.pyimport("micropip");
        
        // FIX: Check if backend is a package name and pin it to <2.0.0
        // This ensures compatibility with pysigma 0.11.23 and avoids the "PyYAML" crash.
        let backendPackage = targetInfo.backend;
        if (!backendPackage.includes('/') && !backendPackage.includes('.whl') && !backendPackage.includes('==') && !backendPackage.includes('<')) {
             console.log(`[Worker] Pinning backend ${backendPackage} to <2.0.0 for compatibility`);
             backendPackage = backendPackage + "<2.0.0";
        }

        await micropip.install(backendPackage);
        installedBackends.add(target);

        // Reset the Python module loaded flag to reload the module
        pythonModuleLoaded = false;
        await loadPythonModule();
        
        updateStatus({ ready: true });

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
        // Create a namespace with parameters directly
        const pythonParams = {
            rule,
            target,
            pipeline_names: pipelines || null,
            pipeline_ymls: pipelineYmls || null,
            filter_yml: filterYml || null,
            format,
            correlation_method: correlationMethod || null,
            backend_options: backendOptions || null,
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
