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
      // Fetch the pre-generated index file
      const response = await fetch('/sigma-rules-index.json');
      
      if (!response.ok) {
        throw new Error(`Failed to load rules index: ${response.status} ${response.statusText}`);
      }
      
      this.rules = await response.json();
      this.isLoaded = true;
    } catch (error) {
      console.error('Error loading rules index:', error);
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

  /**
   * Searches rules by query matching title, description, tags, or author
   */
  public async searchRules(query: string): Promise<SigmaRule[]> {
    if (!this.isLoaded) {
      await this.loadRulesIndex();
    }
    
    const lowerQuery = query.toLowerCase();
    
    return this.rules.filter(rule => {
      return (
        rule.title.toLowerCase().includes(lowerQuery) ||
        rule.description.toLowerCase().includes(lowerQuery) ||
        rule.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        rule.author.toLowerCase().includes(lowerQuery)
      );
    });
  }
}