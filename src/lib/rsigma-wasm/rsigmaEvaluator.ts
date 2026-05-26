/**
 * rsigma WASM evaluator — manages a Web Worker that runs rsigma-eval
 * compiled to WebAssembly, providing Sigma rule evaluation against JSON events.
 */

export interface RsigmaFieldAnalysis {
  /** Fields referenced in the Sigma rule detection section (post-pipeline). */
  ruleFields: string[];
  /** Fields present in the dataset (union of all event keys). */
  dataFields: string[];
  /** Rule fields that do NOT exist in any event in the dataset. */
  missingFields: string[];
}

export interface RsigmaEvalResult {
  matches: RsigmaMatchedEvent[];
  stats: {
    totalMatches: number;
    totalRecords: number;
  };
  fieldAnalysis: RsigmaFieldAnalysis;
  error?: string;
}

export interface RsigmaMatchedEvent {
  /** The original event object. */
  event: Record<string, unknown>;
  /** Index of this event in the input array. */
  index: number;
  /** Which rule(s) matched this event. */
  matched_rules: RsigmaRuleMatch[];
}

export interface RsigmaRuleMatch {
  rule_title: string;
  rule_id: string | null;
  level: string | null;
  tags: string[];
  matched_selections: string[];
  matched_fields: { field: string; value: unknown }[];
}

type ReadinessListener = (ready: boolean) => void;

let nextRequestId = 0;

export class RsigmaEvaluator {
  private worker: Worker | null = null;
  private pending = new Map<
    number,
    { resolve: (v: RsigmaEvalResult) => void; reject: (e: Error) => void }
  >();
  private ready = false;
  private readinessListeners: ReadinessListener[] = [];

  constructor() {
    // Use import.meta.env.SSR (a build-time constant) so Vite/Rollup can
    // dead-code-eliminate the Worker + new URL() expression from the SSR
    // bundle.  The previous `typeof Worker === "undefined"` guard only
    // worked at runtime — the SSR build still tried to resolve the worker
    // entry point inside `.vite-ssg-temp/` and failed with ModuleNotFound.
    if (import.meta.env.SSR || typeof Worker === "undefined") return;
    this.worker = new Worker(
      new URL("../../workers/rsigmaWorker.ts", import.meta.url),
      { type: "module" },
    );
    this.worker.onmessage = this.onMessage.bind(this);
    this.worker.onerror = (e) => {
      console.error("[rsigma] Worker error:", e);
    };
  }

  private onMessage(event: MessageEvent) {
    const msg = event.data;

    if (msg.type === "ready") {
      this.ready = true;
      for (const listener of this.readinessListeners) listener(true);
      return;
    }

    if (msg.type === "result" || msg.type === "error") {
      const pending = this.pending.get(msg.id);
      if (!pending) return;
      this.pending.delete(msg.id);

      const emptyFieldAnalysis: RsigmaFieldAnalysis = {
        ruleFields: [],
        dataFields: [],
        missingFields: [],
      };

      if (msg.type === "error") {
        pending.resolve({
          matches: [],
          stats: { totalMatches: 0, totalRecords: 0 },
          fieldAnalysis: emptyFieldAnalysis,
          error: msg.error,
        });
      } else {
        // Normalise the snake_case from Rust to camelCase for our interface.
        const raw = msg.data;
        const fa = raw.field_analysis;
        pending.resolve({
          matches: raw.matches ?? [],
          stats: {
            totalMatches: raw.stats?.total_matches ?? 0,
            totalRecords: raw.stats?.total_records ?? 0,
          },
          fieldAnalysis: {
            ruleFields: fa?.rule_fields ?? [],
            dataFields: fa?.data_fields ?? [],
            missingFields: fa?.missing_fields ?? [],
          },
          error: raw.error ?? undefined,
        });
      }
    }
  }

  /** Whether the WASM module has finished initializing. */
  get isReady(): boolean {
    return this.ready;
  }

  /** Register a listener that fires when readiness changes. Returns an unsubscribe function. */
  addReadinessListener(listener: ReadinessListener): () => void {
    this.readinessListeners.push(listener);
    // If already ready, fire immediately.
    if (this.ready) listener(true);
    return () => {
      this.readinessListeners = this.readinessListeners.filter((l) => l !== listener);
    };
  }

  /**
   * Evaluate a Sigma rule (YAML) against a set of events.
   *
   * @param ruleYaml       One or more Sigma rules as YAML (multi-doc supported).
   * @param eventsJson     Events text. The WASM side auto-detects the format:
   *                       a single JSON object, a JSON array, NDJSON / JSONL,
   *                       or CSV (header row required).
   * @param pipelineYamls  Optional array of pipeline YAML strings for field mapping.
   * @param filterYamls    Optional array of Sigma filter rule YAML strings.
   */
  async evaluate(
    ruleYaml: string,
    eventsJson: string,
    pipelineYamls: string[] = [],
    filterYamls: string[] = [],
  ): Promise<RsigmaEvalResult> {
    if (!this.worker) {
      return {
        matches: [],
        stats: { totalMatches: 0, totalRecords: 0 },
        fieldAnalysis: { ruleFields: [], dataFields: [], missingFields: [] },
        error: "Worker not available (SSR environment)",
      };
    }

    const id = nextRequestId++;
    // Serialize the arrays as JSON so the worker can pass them straight to WASM.
    const pipelineYamlsJson = JSON.stringify(pipelineYamls);
    const filterYamlsJson = JSON.stringify(filterYamls);
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker!.postMessage({
        type: "evaluate",
        id,
        ruleYaml,
        eventsJson,
        pipelineYamls: pipelineYamlsJson,
        filterYamls: filterYamlsJson,
      });
    });
  }

  /** Terminate the worker and release resources. */
  dispose() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.ready = false;
    for (const listener of this.readinessListeners) listener(false);
    // Reject any pending requests.
    for (const [, { reject }] of this.pending) {
      reject(new Error("Evaluator disposed"));
    }
    this.pending.clear();
  }
}
