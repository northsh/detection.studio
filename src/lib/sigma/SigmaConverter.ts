import type { SigmaConversionResult } from './types';

/**
 * Interface for Sigma rule conversion implementations
 */
export interface SigmaConverter {
  /**
   * Convert a Sigma rule to a SIEM query
   * 
   * @param rule - The Sigma rule YAML content
   * @param target - The target SIEM system (e.g., 'splunk', 'elastic')
   * @param pipeline - Optional pipeline array
   * @param pipelineYml - Optional pipeline YAML config
   * @param filterYml - Optional filter YAML config
   * @param format - Optional output format
   * @param correlationMethod - Optional correlation method
   * @param backendOptions - Optional backend-specific options
   * @returns Promise with the conversion result
   */
  convert(
    rule: string,
    target: string,
    pipeline?: string[],
    pipelineYml?: string,
    filterYml?: string,
    format?: string,
    correlationMethod?: string,
    backendOptions?: Record<string, any>
  ): Promise<SigmaConversionResult>;

  /**
   * Check if the converter is ready to use
   * 
   * @returns Promise indicating if the converter is ready
   */
  isReady(): Promise<boolean>;
}