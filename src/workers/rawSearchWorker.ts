/**
 * Web Worker for regex-searching raw log/event data line-by-line.
 *
 * Accepts a search request with the raw text (or a signal that text was
 * already sent), a regex pattern, and a display limit.  Returns matching
 * lines with HTML-highlighted snippets and the total match count.
 */

interface SearchRequest {
  type: "search";
  /** Unique id so the main thread can discard stale responses. */
  id: number;
  /** The full raw text.  Sent once and cached; later requests can omit it. */
  rawText?: string;
  /** Regex source string (user input). Empty string = no search. */
  pattern: string;
  /** Maximum number of result lines to return. */
  limit: number;
}

interface SearchResponse {
  type: "result";
  id: number;
  /** Matching (or first-N) lines ready for display. */
  lines: { lineNo: number; text: string; html: string }[];
  /** Total number of matching lines (full scan). `null` when not searching. */
  matchCount: number | null;
  /** Total line count of the cached data. */
  totalLines: number;
}

interface ErrorResponse {
  type: "error";
  id: number;
  error: string;
}

// ── Cached state ────────────────────────────────────────────────────
let cachedLines: string[] = [];

// ── Helpers ─────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightMatches(line: string, re: RegExp): string {
  const escaped = escapeHtml(line);
  const gRe = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
  return escaped.replace(
    gRe,
    (match) =>
      `<mark class="bg-yellow-400/40 text-yellow-200 rounded-sm px-0.5">${match}</mark>`,
  );
}

// ── Message handler ─────────────────────────────────────────────────

self.onmessage = (event: MessageEvent<SearchRequest>) => {
  const { type, id, rawText, pattern, limit } = event.data;

  if (type !== "search") return;

  // Update cached lines when new raw text arrives.
  if (rawText != null) {
    cachedLines = rawText.split("\n");
  }

  const lines = cachedLines;
  const totalLines = lines.length;

  // No pattern → return first N lines (preview mode).
  if (!pattern) {
    const end = Math.min(lines.length, limit);
    const result: SearchResponse["lines"] = [];
    for (let i = 0; i < end; i++) {
      result.push({ lineNo: i + 1, text: lines[i], html: escapeHtml(lines[i]) });
    }
    postMessage({
      type: "result",
      id,
      lines: result,
      matchCount: null,
      totalLines,
    } satisfies SearchResponse);
    return;
  }

  // Try to compile the regex.
  let re: RegExp;
  try {
    re = new RegExp(pattern, "i");
  } catch (e) {
    postMessage({
      type: "error",
      id,
      error: e instanceof SyntaxError ? e.message : String(e),
    } satisfies ErrorResponse);
    return;
  }

  // Full scan: collect display lines (up to limit) and total match count.
  const result: SearchResponse["lines"] = [];
  let matchCount = 0;

  for (let i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) {
      matchCount++;
      if (result.length < limit) {
        result.push({
          lineNo: i + 1,
          text: lines[i],
          html: highlightMatches(lines[i], re),
        });
      }
    }
  }

  postMessage({
    type: "result",
    id,
    lines: result,
    matchCount,
    totalLines,
  } satisfies SearchResponse);
};
