import type { PyodideInterface } from "pyodide";
import pythonSource from "./python/sigma_converter.py";
import { DEFAULT_SIGMA_TARGETS, backendNameFromPackage } from "./targets";

/** The raw Python source executed inside Pyodide (inlined at build time). */
export const SIGMA_CONVERTER_PY: string = pythonSource;
import type {
    ConversionParams,
    EngineStatus,
    PyodideSigmaOptions,
    SigmaTarget,
} from "./types";

/** Default pySigma version installed via micropip. */
export const DEFAULT_PYSIGMA_VERSION = "1.3.2";

/** Default pipeline packages installed during bootstrap. */
export const DEFAULT_PIPELINE_PACKAGES = [
    "pysigma-pipeline-windows",
    "pysigma-pipeline-sysmon",
];

/** True when running in a browser-like environment. */
const IS_BROWSER =
    typeof window !== "undefined" || typeof importScripts !== "undefined";

/**
 * Framework-agnostic engine that runs the Python pySigma library inside Pyodide.
 *
 * This class drives Pyodide directly and works in any JavaScript runtime that
 * can load the `pyodide` package — Node.js, Deno/Bun, a browser main thread, or
 * a Web Worker. For browsers, prefer running it inside a Worker (see the
 * `@northsh/pysigma-node/worker` entry) to keep the UI thread responsive.
 */
export class PyodideSigmaEngine {
    private pyodide: PyodideInterface | null = null;
    private readonly installedBackends = new Set<string>();
    private pythonModuleLoaded = false;
    private sigmaNamespace: any = null;
    private bootstrapPromise: Promise<void> | null = null;

    private readonly targets: Map<string, SigmaTarget>;
    private readonly pysigmaVersion: string;
    private readonly pipelinePackages: string[];
    private readonly indexURL?: string;
    private readonly onStatus?: (status: EngineStatus) => void;

    private status: EngineStatus = {
        ready: false,
        pyodideReady: false,
        installedBackends: [],
    };

    constructor(options: PyodideSigmaOptions = {}) {
        this.targets = options.targets ?? DEFAULT_SIGMA_TARGETS;
        this.pysigmaVersion = options.pysigmaVersion ?? DEFAULT_PYSIGMA_VERSION;
        this.pipelinePackages = options.pipelinePackages ?? DEFAULT_PIPELINE_PACKAGES;
        this.indexURL = options.indexURL;
        this.onStatus = options.onStatus;
    }

    /** Current engine status snapshot. */
    getStatus(): EngineStatus {
        return { ...this.status, installedBackends: Array.from(this.installedBackends) };
    }

    /** True once Pyodide, pySigma and the Python module are loaded. */
    isReady(): boolean {
        return this.status.ready;
    }

    private updateStatus(patch: Partial<EngineStatus>): void {
        this.status = {
            ...this.status,
            ...patch,
            installedBackends: Array.from(this.installedBackends),
        };
        this.onStatus?.(this.status);
    }

    /**
     * Load Pyodide, install pySigma + pipelines and the Python module.
     * Safe to call multiple times — initialisation runs once.
     */
    async init(): Promise<void> {
        if (!this.bootstrapPromise) {
            this.bootstrapPromise = this.bootstrap();
        }
        return this.bootstrapPromise;
    }

    private async bootstrap(): Promise<void> {
        try {
            this.updateStatus({ ready: false, pyodideReady: false });

            const { loadPyodide, version } = await import("pyodide");
            const indexURL =
                this.indexURL ??
                (IS_BROWSER
                    ? `https://cdn.jsdelivr.net/pyodide/v${version}/full/`
                    : undefined);

            this.pyodide = await loadPyodide({
                ...(indexURL ? { indexURL } : {}),
                convertNullToNone: true,
            });

            // PyYAML is bundled with recent Pyodide releases; load it from the
            // built-in package set so we get the correct platform wheel.
            await this.pyodide.loadPackage(["micropip", "pyyaml"]);
            const micropip = this.pyodide.pyimport("micropip");

            await micropip.install(`pysigma==${this.pysigmaVersion}`);

            if (this.pipelinePackages.length > 0) {
                await micropip.install(this.pipelinePackages);
            }

            this.updateStatus({ pyodideReady: true });
            await this.loadPythonModule();
            this.updateStatus({ ready: true });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            this.updateStatus({ ready: false, pyodideReady: false, error: message });
            throw error;
        }
    }

    private async loadPythonModule(): Promise<void> {
        if (!this.pyodide) throw new Error("Pyodide is not initialised");

        if (!this.sigmaNamespace) {
            this.sigmaNamespace = this.pyodide.globals.get("dict")();
        }
        this.pyodide.runPython(SIGMA_CONVERTER_PY, { globals: this.sigmaNamespace });
        this.pythonModuleLoaded = true;
    }

    /**
     * Install the pySigma backend package required for the given target.
     */
    async installBackend(target: string): Promise<{ success: boolean; error?: string }> {
        await this.init();
        if (this.installedBackends.has(target)) {
            return { success: true };
        }

        const targetInfo = this.targets.get(target);
        if (!targetInfo?.backend) {
            return { success: false, error: `No backend found for target '${target}'` };
        }

        try {
            this.updateStatus({ ready: false });
            const micropip = this.pyodide!.pyimport("micropip");
            await micropip.install(targetInfo.backend);
            this.installedBackends.add(target);

            // Re-run the module so plugin autodiscovery picks up the new backend.
            await this.loadPythonModule();
            this.updateStatus({ ready: true });
            return { success: true };
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            this.updateStatus({ error: `Error installing backend '${target}': ${message}` });
            return { success: false, error: message };
        }
    }

    /**
     * Convert a single Sigma rule. Installs the backend on demand.
     */
    async convert(
        params: ConversionParams,
    ): Promise<{ result?: string; error?: string; success?: boolean }> {
        await this.init();

        const {
            rule,
            target,
            pipelines = [],
            pipelineYmls = [],
            filterYml = "",
            format = "default",
            correlationMethod = "",
            backendOptions = {},
        } = params;

        if (!this.installedBackends.has(target)) {
            const install = await this.installBackend(target);
            if (!install.success) {
                return { error: install.error, success: false };
            }
        }

        if (!this.pythonModuleLoaded) {
            await this.loadPythonModule();
        }

        try {
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

            const convertParams = this.pyodide!.toPy(pythonParams);
            this.sigmaNamespace.update(convertParams);

            const result = this.pyodide!.runPython(
                `convert_rule(
                    rule,
                    target,
                    pipeline_names=pipeline_names,
                    pipeline_ymls=pipeline_ymls,
                    filter_yml=filter_yml,
                    correlation_method=correlation_method,
                    backend_options=backend_options
                )`,
                { globals: this.sigmaNamespace },
            );
            return { result, success: true };
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : String(error),
                success: false,
            };
        }
    }

    /**
     * List pipelines available for the given target, filtered by backend
     * compatibility.
     */
    async getAvailablePipelines(
        target: string,
    ): Promise<{ success: boolean; pipelines: string[]; error?: string }> {
        await this.init();
        if (!this.pythonModuleLoaded) {
            await this.loadPythonModule();
        }

        try {
            const targetInfo = this.targets.get(target);
            const backendName = targetInfo?.backend
                ? backendNameFromPackage(targetInfo.backend, target)
                : target;

            const pipelines = this.pyodide!.runPython(
                `get_available_pipelines(${JSON.stringify(backendName)})`,
                { globals: this.sigmaNamespace },
            );
            return { success: true, pipelines: pipelines?.toJs() ?? [] };
        } catch (error) {
            return {
                success: false,
                pipelines: [],
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }
}
