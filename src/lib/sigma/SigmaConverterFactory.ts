import type { SigmaConverter } from './SigmaConverter';
import type { SigmaConverterConfig } from './types';
import { SigmaConversionStrategy } from './types';
import { RemoteSigmaConverter } from './RemoteSigmaConverter';
import { PyodideSigmaConverter } from './PyodideSigmaConverter';

/**
 * Factory to create SigmaConverter instances
 */
export class SigmaConverterFactory {
  /**
   * Create a new SigmaConverter instance based on the specified strategy
   */
  static createConverter(
    strategy: SigmaConversionStrategy = SigmaConversionStrategy.REMOTE, 
    config: SigmaConverterConfig = {}
  ): SigmaConverter {
    switch (strategy) {
      case SigmaConversionStrategy.LOCAL_PYODIDE:
        return new PyodideSigmaConverter(config);
      case SigmaConversionStrategy.REMOTE:
      default:
        return new RemoteSigmaConverter(config);
    }
  }
}