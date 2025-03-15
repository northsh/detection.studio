// @ts-ignore - Pyodide will be loaded from CDN
import {loadPyodide, PyodideInterface} from 'pyodide';
import {SIGMA_TARGETS} from '@/types/SIEMs';
import registerPromiseWorker from "promise-worker/register";


// Runtime state
let pyodide: PyodideInterface | null = null;
let installedBackends = new Set<string>();
let pythonModuleLoaded = false;
let sigmaNamespace = null;

// Initialize Pyodide in the background
const pyodideReadyPromise = (async () => {
    try {
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.3/full/"
        });

        await pyodide?.loadPackage("micropip");
        const micropip = pyodide?.pyimport("micropip");

        // Install sigma-cli
        await micropip.install('https://files.pythonhosted.org/packages/43/60/1431361a1a4afa2e81ecab4b5fb7af08b015dfd4d8b9edf1dd2923d2a8b6/pysigma-0.11.19-py3-none-any.whl');

        return pyodide;
    } catch (error) {
        console.error('Error initializing Pyodide:', error);
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

    const micropip = pyodide?.pyimport("micropip");
    await micropip.install(targetInfo.backend);
    installedBackends.add(target);

    // Reset the Python module loaded flag to reload the module
    pythonModuleLoaded = false;
    await loadPythonModule();

    return {success: true};
}

/**
 * Convert a Sigma rule to a target query format
 */
interface ConvertOptions {
    rule: string;
    target: string;
    pipelines?: string[];
    pipelineYmls?: string[];
    filterYml?: string;
    format?: string;
    correlationMethod?: string;
    backendOptions?: Record<string, any>;
    skipUnsupported?: boolean;
}

async function convertRule({
    rule,
    target,
    pipelines = [],
    pipelineYmls = [],
    filterYml = '',
    format = "default",
    correlationMethod = '',
    backendOptions = {},
    skipUnsupported = false
}: ConvertOptions) {
    if (!installedBackends.has(target)) {
        await installBackend(target);
    }

    if (!pythonModuleLoaded) {
        await loadPythonModule();
    }

    // Create a namespace with parameters directly
    const params = {
        rule,
        target,
        pipeline_names: pipelines || null,
        pipeline_ymls: pipelineYmls || null,
        filter_yml: filterYml || null,
        format,
        correlation_method: correlationMethod || null,
        backend_options: backendOptions || null,
        skip_unsupported: skipUnsupported
    };

    // Set parameters in namespace using toPy
    const convertParams = pyodide?.toPy(params);

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
      backend_options=backend_options,
      skip_unsupported=skip_unsupported
    )
  `;

    const result = pyodide?.runPython(pythonCode, {globals: sigmaNamespace});
    return {result: result};
}

// Register promise worker handler
registerPromiseWorker(async (message) => {
    await pyodideReadyPromise;

    const { type } = message;

    switch (type) {
        case 'convert':
            return await convertRule({
                rule: message.rule,
                target: message.target,
                pipelines: message.pipelines,
                pipelineYmls: message.pipelineYmls,
                filterYml: message.filterYml,
                format: message.format,
                correlationMethod: message.correlationMethod,
                backendOptions: message.backendOptions,
                skipUnsupported: message.skipUnsupported
            });
        case 'install':
            return await installBackend(message.target);
        case 'status':
            return {ready: true};
        default:
            throw new Error(`Unknown message type: ${type}`);
    }
});