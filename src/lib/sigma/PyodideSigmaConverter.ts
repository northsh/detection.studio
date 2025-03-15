import type {SigmaConverter} from './SigmaConverter';
import type {SigmaConversionResult} from './types';
import {SIGMA_TARGETS} from '@/types/SIEMs';
import {convertSigmaRuleAsync, installBackendAsync, isPyodideReadyAsync} from './worker/workerApi';

/**
 * Implementation of SigmaConverter that uses Pyodide for local conversion
 */
export class PyodideSigmaConverter implements SigmaConverter {
  private pyodideReady = false;
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
   * Initialize Pyodide and required libraries
   */
  private async initPyodide(): Promise<void> {
    try {
      const status = await isPyodideReadyAsync();
      this.pyodideReady = status.ready;
    } catch (error) {
      console.error('Error initializing Pyodide:', error);
      this.pyodideReady = false;
    }
  }

  /**
   * Convert a Sigma rule to a SIEM query using Pyodide
   */
  async convert(
    rule: string,
    target: string,
    pipeline: string[] = [],
    pipelineYml: string = '',
    filterYml: string = '',
    format: string = '',
    correlationMethod: string = '',
    backendOptions: Record<string, any> = {}
  ): Promise<SigmaConversionResult> {
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
        const installResult: {
            success?: boolean;
            error?: string;
        } = await installBackendAsync(target);
        if (installResult.success) {
          this.installedBackends.add(target);
        } else if (installResult.error) {
          return {
            query: '',
            error: `Failed to install backend: ${installResult.error}`
          };
        }
      }

      // Convert the rule using all configured parameters
      const result = await convertSigmaRuleAsync(
        rule, 
        target, 
        pipeline,
        pipelineYml,
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
    if (this.pyodideReady) {
      return true;
    }
    
    try {
      const status = await isPyodideReadyAsync();
      this.pyodideReady = status.ready;
      return this.pyodideReady;
    } catch (e) {
      console.error('Error checking Pyodide status:', e);
      return false;
    }
  }
}