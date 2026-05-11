import FlexSearch from "flexsearch";
import type { SigmaRule } from "../stores/SigmaBrowserStore";
import * as Flexsearch from "flexsearch";

interface SearchMessage {
  type: "search" | "init" | "fetch-and-init";
  query?: string;
  rules?: SigmaRule[];
  url?: string;
}

interface SearchResponse {
  type: "result" | "ready" | "error" | "rules-loaded";
  results?: SigmaRule[];
  rules?: SigmaRule[];
  error?: string;
}

let index: Flexsearch.Document<any> | null = null;
let rulesMap: Map<string, SigmaRule> = new Map();

/**
 * Build the FlexSearch index from an array of rules.
 * Shared by both "init" (rules provided directly) and "fetch-and-init" (rules fetched in-worker).
 */
async function buildIndex(rules: SigmaRule[]): Promise<void> {
  index = new FlexSearch.Document({
    document: {
      id: "id",
      index: [
        "title",
        "description",
        "id",
        "author",
        "tags",
        "logsource:product",
        "logsource:category",
        "logsource:service",
      ],
    },
    tokenize: "forward",
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  });

  console.log(`SearchWorker: Indexing ${rules.length} rules...`);
  const startTime = performance.now();

  for (const rule of rules) {
    const doc = {
      id: rule.id || rule.path,
      title: rule.title || "",
      description: rule.description || "",
      author: rule.author || "",
      tags: Array.isArray(rule.tags) ? rule.tags.join(" ") : "",
      "logsource:product": rule.logsource?.product || "",
      "logsource:category": rule.logsource?.category || "",
      "logsource:service": rule.logsource?.service || "",
    };

    await index.add(doc);
    rulesMap.set(rule.id || rule.path, rule);
  }

  const endTime = performance.now();
  console.log(
    `SearchWorker: Index built successfully in ${(endTime - startTime).toFixed(2)}ms`,
  );
}

// Listen for messages from the main thread
self.onmessage = async (event: MessageEvent<SearchMessage>) => {
  const { type, query, rules, url } = event.data;

  try {
    if (type === "fetch-and-init") {
      // Fetch, parse, index — all off the main thread
      console.log("SearchWorker: Fetching and building index from URL...");

      try {
        if (!url) {
          throw new Error("No URL provided for fetch-and-init");
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to load rules index: ${response.status} ${response.statusText}`);
        }

        const data: SigmaRule[] = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Invalid or empty rules index");
        }

        await buildIndex(data);

        // Send parsed rules back to the main thread so the store can use them
        postResponse({ type: "rules-loaded", rules: data });
        postResponse({ type: "ready" });
      } catch (error) {
        console.error("SearchWorker: Error during fetch-and-init:", error);
        postResponse({
          type: "error",
          error: error instanceof Error ? error.message : "Failed to fetch and build index",
        });
      }
    } else if (type === "init") {
      // Build the search index from rules data provided directly
      console.log("SearchWorker: Building search index from provided rules...");

      try {
        if (!rules || !Array.isArray(rules) || rules.length === 0) {
          throw new Error("No rules provided for indexing");
        }

        await buildIndex(rules);
        postResponse({ type: "ready" });
      } catch (error) {
        console.error("SearchWorker: Error building search index:", error);
        postResponse({
          type: "error",
          error: error instanceof Error ? error.message : "Failed to build search index",
        });
      }
    } else if (type === "search") {
      if (!index) {
        postResponse({ type: "error", error: "Search index not initialized" });
        return;
      }

      if (!query || query.trim() === "") {
        // Return empty results for empty query (component will show all rules)
        postResponse({ type: "result", results: [] });
        return;
      }

      // Perform the search across all indexed fields
      const searchResults = await index.search(query, {
        limit: 1000,
        enrich: true,
      });

      // Extract rule IDs from search results
      const ruleIds = new Set<string>();

      // FlexSearch returns an array of results per field
      if (Array.isArray(searchResults)) {
        searchResults.forEach((fieldResult: any) => {
          if (fieldResult.result && Array.isArray(fieldResult.result)) {
            fieldResult.result.forEach((id: string) => {
              ruleIds.add(id);
            });
          }
        });
      }

      // Map IDs back to full rule objects
      const results: SigmaRule[] = [];
      ruleIds.forEach((id) => {
        const rule = rulesMap.get(id);
        if (rule) {
          results.push(rule);
        }
      });

      postResponse({ type: "result", results });
    }
  } catch (error) {
    postResponse({
      type: "error",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

function postResponse(response: SearchResponse) {
  self.postMessage(response);
}
