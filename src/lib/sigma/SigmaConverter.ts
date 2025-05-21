import type {SigmaConversionResult} from './types';
import {SIGMA_TARGETS} from '@/types/SIEMs';
import {convertSigmaRuleAsync, installBackendAsync, isPyodideReadyAsync} from './worker/workerApi';

/**
 * Implementation of SigmaConverter that uses Pyodide for local conversion
 */
export class SigmaConverter {
    private pyodideReady = false;
    private backendReady = false;
    private installedBackends = new Set<string>();
    private initPromise: Promise<void>;

    /**
     * Create a new PyodideSigmaConverter
     *
     */
    constructor() {
        // Initialize Pyodide in the background
        this.initPromise = this.initPyodide();
    }

    /**
     * Convert a Sigma rule to a SIEM query using Pyodide
     */
    async convert(
        rule: string,
        target: string,
        pipeline: string[] = [],
        pipelineYmls: string[] = [],
        filterYml: string = '',
        format: string = '',
        correlationMethod: string = '',
        backendOptions: Record<string, any> = {}
    ): Promise<SigmaConversionResult> {
        // Skip conversion in SSR/SSG environment
        if (typeof Worker === 'undefined') {
            return {
                query: '',
                error: 'Conversion not available during server-side rendering'
            };
        }
        
        // Wait for Pyodide to be initialized
        await this.initPromise;

        // Check if target is supported
        if (!SIGMA_TARGETS.has(target)) {
            return {
                query: '',
                error: `Unsupported target: ${target}`
            };
        }

        try {
            // Ensure the backend is installed
            if (!this.installedBackends.has(target)) {
                this.backendReady = false;

                const installResult: {
                    success?: boolean;
                    error?: string;
                } = await installBackendAsync(target);
                if (installResult.success) {
                    this.installedBackends.add(target);
                } else if (installResult.error) {
                    this.backendReady = false;
                    return {
                        query: '',
                        error: `Failed to install backend: ${installResult.error}`
                    };
                }
            }

            this.backendReady = true;

            // Convert the rule using all configured parameters
            const result = await convertSigmaRuleAsync(
                rule,
                target,
                [], // TODO: pipelines,
                pipelineYmls,
                filterYml,
                format,
                correlationMethod,
                backendOptions
            );

            if (result.error) {
                return {
                    query: '',
                    error: result.error
                };
            }

            return {
                query: result.result,
                error: undefined
            };
        } catch (e) {
            console.error('Error during Pyodide Sigma conversion:', e);
            return {
                query: '',
                error: e instanceof Error ? e.message : String(e)
            };
        }
    }

    /**
     * Check if Pyodide is ready for conversions
     */
    async isReady(): Promise<boolean> {
        // Return false in SSR/SSG environment
        if (typeof Worker === 'undefined') {
            return false;
        }

        try {
            const status = await isPyodideReadyAsync();
            this.pyodideReady = status.ready;
            return this.pyodideReady && this.backendReady;
        } catch (e) {
            console.error('Error checking Pyodide status:', e);
            return false;
        }
    }

    /**
     * Initialize Pyodide and required libraries
     */
    private async initPyodide(): Promise<void> {
        // Skip initialization during SSR/SSG
        if (typeof Worker === 'undefined') {
            console.log('Skipping Pyodide initialization in SSR/SSG environment');
            this.pyodideReady = false;
            return;
        }
            
        try {
            const status = await isPyodideReadyAsync();
            this.pyodideReady = status.ready;
        } catch (error) {
            console.error('Error initializing Pyodide:', error);
            this.pyodideReady = false;
        }
    }
}