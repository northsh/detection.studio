import type { SigmaConverter } from './SigmaConverter';
import type { SigmaConverterConfig, SigmaConversionResult } from './types';

/**
 * Implementation of SigmaConverter that uses a remote API
 */
export class RemoteSigmaConverter implements SigmaConverter {
  private baseUrl: string;

  /**
   * Create a new RemoteSigmaConverter
   * 
   * @param config - Configuration options
   */
  constructor(config: SigmaConverterConfig = {}) {
    this.baseUrl = config.baseUrl || import.meta.env.VITE_STUDIO_BASE_URL || '';
  }

  /**
   * Convert a Sigma rule to a SIEM query using the remote API
   */
  async convert(
    rule: string,
    target: string,
    pipeline: string[] = [],
    pipelineYml: string = '',
    filterYml: string = '',
    format: string = 'default',
    correlationMethod: string = '',
    backendOptions: Record<string, any> = {}
  ): Promise<SigmaConversionResult> {
    // Apply filter if provided
    if (filterYml) {
      rule = filterYml + '\n---\n' + rule;
    }

    try {
      const response = await fetch(new URL('api/v1/convert', this.baseUrl).href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rule: btoa(rule),
          format: format || "default",
          target,
          pipeline,
          pipelineYml: btoa(pipelineYml),
          correlationMethod,
          backendOptions
        }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        return {
          query: '',
          error: responseText
        };
      }

      return {
        query: responseText,
        error: undefined
      };
    } catch (e) {
      console.error('Error during remote Sigma conversion:', e);
      return {
        query: '',
        error: e instanceof Error ? e.message : String(e)
      };
    }
  }

  /**
   * Check if the remote service is available
   */
  async isReady(): Promise<boolean> {
    try {
      // Simple check to see if the service is available
      const response = await fetch(new URL('api/v1/pipelines', this.baseUrl).href, {
        method: "HEAD",
      });
      
      return response.ok;
    } catch (e) {
      console.error('Remote Sigma conversion service not available:', e);
      return false;
    }
  }
}