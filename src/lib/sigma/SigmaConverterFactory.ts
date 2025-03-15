import type {SigmaConverter} from './SigmaConverter';
import {PyodideSigmaConverter} from './PyodideSigmaConverter';

/**
 * Factory to create SigmaConverter instances
 */
export class SigmaConverterFactory {
  /**
   * Create a new SigmaConverter instance based on the specified strategy
   */
  static createConverter(): SigmaConverter {
    return new PyodideSigmaConverter();
  }
}