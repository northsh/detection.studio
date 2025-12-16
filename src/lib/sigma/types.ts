// Import SigmaTarget from the merged file
import type { SigmaTarget } from "@/types/SIEMs";

export type { SigmaTarget };

/**
 * Result of a Sigma conversion operation
 */
export interface SigmaConversionResult {
  query: string;
  error?: string;
}
