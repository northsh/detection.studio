import type {SigmaConversionResult} from './types';
import {SIGMA_TARGETS} from '@/types/SIEMs';
import {
  convert,
  installBackend, 
  getWorkerStatus, 
  addStatusListener, 
  type WorkerStatus
} from './worker/workerApi';

/**
 * Implementation of SigmaConverter that uses Pyodide for local conversion
 */
export class SigmaConverter {
    private readinessListeners: Array<(ready: boolean) => void> = [];
    private statusListeners: Array<(status: WorkerStatus) => void> = [];
    private currentStatus: WorkerStatus = {
        ready: false,
        pyodideReady: false,
        installedBackends: []
    };
    
    // Clean up function for the worker status listener
    private cleanupListener: (() => void) | null = null;

    /**
     * Create a new SigmaConverter
     */
    constructor() {
        // Set up the status listener
        this.cleanupListener = addStatusListener(this.handleStatusUpdate.bind(this));
        
        // Initial status check
        this.refreshStatus();
    }
    
    /**
     * Handle status updates from the worker
     */
    private handleStatusUpdate(status: WorkerStatus): void {
        this.currentStatus = status;
        
        // Notify all status listeners
        this.statusListeners.forEach(listener => listener(status));
        
        // Notify readiness listeners if readiness state has changed
        this.readinessListeners.forEach(listener => listener(status.ready));
    }
    
    /**
     * Refresh the current status
     */
    private async refreshStatus(): Promise<void> {
        try {
            const status = await getWorkerStatus();
            this.handleStatusUpdate(status);
        } catch (error) {
            console.error('Error refreshing worker status:', error);
        }
    }

    /**
     * Add a listener for status updates
     */
    public addStatusListener(listener: (status: WorkerStatus) => void): () => void {
        this.statusListeners.push(listener);
        
        // Immediately notify with current status
        listener(this.currentStatus);
        
        // Return a cleanup function
        return () => {
            const index = this.statusListeners.indexOf(listener);
            if (index !== -1) {
                this.statusListeners.splice(index, 1);
            }
        };
    }
    
    /**
     * Add a listener for readiness changes
     */
    public addReadinessListener(listener: (ready: boolean) => void): () => void {
        this.readinessListeners.push(listener);
        
        // Immediately notify with current readiness
        listener(this.currentStatus.ready);
        
        // Return a cleanup function
        return () => {
            const index = this.readinessListeners.indexOf(listener);
            if (index !== -1) {
                this.readinessListeners.splice(index, 1);
            }
        };
    }

    /**
     * Convert a Sigma rule to a SIEM query
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

        // Check if target is supported
        if (!SIGMA_TARGETS.has(target)) {
            return {
                query: '',
                error: `Unsupported target: ${target}`
            };
        }

        try {
            // Ensure the backend is installed if not already
            if (!this.currentStatus.installedBackends.includes(target)) {
                const installResult = await installBackend(target);
                if (!installResult.success && installResult.error) {
                    return {
                        query: '',
                        error: `Failed to install backend: ${installResult.error}`
                    };
                }
            }

            // Convert the rule using all configured parameters
            const result = await convert({
                rule,
                target,
                pipelines: pipeline,
                pipelineYmls,
                filterYml,
                format,
                correlationMethod,
                backendOptions
            });

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
     * Check if the converter is ready for use
     */
    isReady(): boolean {
        return this.currentStatus.ready;
    }
    
    /**
     * Get current status
     */
    getStatus(): WorkerStatus {
        return {...this.currentStatus};
    }
    
    /**
     * Clean up resources
     */
    dispose(): void {
        if (this.cleanupListener) {
            this.cleanupListener();
            this.cleanupListener = null;
        }
        
        this.readinessListeners = [];
        this.statusListeners = [];
    }
}