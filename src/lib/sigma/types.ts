// Import SigmaTarget from the merged file
import type { SigmaTarget } from '@/types/SIEMs';
export type { SigmaTarget };

/**
 * Configuration for the Sigma converter
 */
export interface SigmaConverterConfig {
  baseUrl?: string;
}

/**
 * Result of a Sigma conversion operation
 */
export interface SigmaConversionResult {
  query: string;
  error?: string;
}

/**
 * Strategy enum for Sigma conversions
 */
export enum SigmaConversionStrategy {
  REMOTE = 'remote',
  LOCAL_PYODIDE = 'local_pyodide'
}