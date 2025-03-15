export interface SigmaLogsource {
  category?: string;
  product?: string;
  service?: string;
}

export interface SigmaRule {
  id: string;
  title: string;
  description: string;
  status: string;
  author: string;
  date: string;
  modified: string;
  tags: string[];
  level: string;
  path: string;
  logsource?: SigmaLogsource;
  rawContent?: string;
  references?: string[];
}

export class SigmaRepoService {
  private static instance: SigmaRepoService;
  private rules: SigmaRule[] = [];
  private isLoaded = false;

  private constructor() {}

  public static getInstance(): SigmaRepoService {
    if (!SigmaRepoService.instance) {
      SigmaRepoService.instance = new SigmaRepoService();
    }
    return SigmaRepoService.instance;
  }

  /**
   * Loads pre-indexed Sigma rules from the build-time generated index file
   */
  private async loadRulesIndex(): Promise<void> {
    if (this.isLoaded) return;

    try {
      console.log('SigmaRepoService: Loading rules index...');
      
      // Fetch the pre-generated index file
      const response = await fetch('/sigma-rules-index.json');
      
      if (!response.ok) {
        console.error(`Failed to load rules index: ${response.status} ${response.statusText}`);
        throw new Error(`Failed to load rules index: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.error('Rules index is not an array:', data);
        throw new Error('Invalid rules index format');
      }
      
      this.rules = data;
      this.isLoaded = true;
      console.log(`SigmaRepoService: Successfully loaded ${this.rules.length} rules`);
    } catch (error) {
      console.error('Error loading rules index:', error);
      // Try to provide a fallback empty array to prevent fatal errors
      this.rules = [];
      throw error;
    }
  }

  /**
   * Gets all indexed Sigma rules
   */
  public async getRules(): Promise<SigmaRule[]> {
    if (!this.isLoaded) {
      await this.loadRulesIndex();
    }
    return this.rules;
  }

  /**
   * Fetches the content of a specific rule from the jsdelivr CDN
   */
  public async getRule(path: string): Promise<string> {
    const cdnPath = `https://cdn.jsdelivr.net/gh/SigmaHQ/sigma@master/${path}`;
    
    try {
      const response = await fetch(cdnPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch rule: ${response.status} ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error(`Error fetching rule from CDN: ${path}`, error);
      throw error;
    }
  }
}