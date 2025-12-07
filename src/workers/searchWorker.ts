import Fuse from 'fuse.js';
import type { SigmaRule } from '../stores/SigmaBrowserStore';

interface SearchMessage {
    type: 'search' | 'init';
    query?: string;
    rules?: SigmaRule[];
    options?: Fuse.IFuseOptions<SigmaRule>;
}

interface SearchResponse {
    type: 'result' | 'ready' | 'error';
    results?: SigmaRule[];
    error?: string;
}

let fuse: Fuse<SigmaRule> | null = null;

// Listen for messages from the main thread
self.onmessage = (event: MessageEvent<SearchMessage>) => {
    const { type, query, rules, options } = event.data;

    try {
        if (type === 'init') {
            // Initialize Fuse.js with the rules
            if (!rules || rules.length === 0) {
                postResponse({ type: 'error', error: 'No rules provided for initialization' });
                return;
            }

            const fuseOptions: Fuse.IFuseOptions<SigmaRule> = {
                keys: [
                    { name: 'title', weight: 3 },
                    { name: 'description', weight: 2 },
                    { name: 'id', weight: 2 },
                    { name: 'author', weight: 1 },
                    { name: 'tags', weight: 1.5 },
                    { name: 'logsource.product', weight: 1.5 },
                    { name: 'logsource.category', weight: 1.5 },
                    { name: 'logsource.service', weight: 1.5 },
                ],
                threshold: 0.3,
                minMatchCharLength: 2,
                includeScore: true,
                useExtendedSearch: false,
                ignoreLocation: true,
                ...options,
            };

            fuse = new Fuse(rules, fuseOptions);
            postResponse({ type: 'ready' });
        } else if (type === 'search') {
            if (!fuse) {
                postResponse({ type: 'error', error: 'Search index not initialized' });
                return;
            }

            if (!query || query.trim() === '') {
                // Return empty results for empty query (component will show all rules)
                postResponse({ type: 'result', results: [] });
                return;
            }

            // Perform the search
            const searchResults = fuse.search(query);
            const results = searchResults.map(result => result.item);

            postResponse({ type: 'result', results });
        }
    } catch (error) {
        postResponse({
            type: 'error',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

function postResponse(response: SearchResponse) {
    self.postMessage(response);
}

