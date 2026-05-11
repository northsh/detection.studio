/**
 * Web Worker for rsigma WASM-based Sigma rule evaluation.
 *
 * Messages:
 *   -> { type: "evaluate", id, ruleYaml, eventsJson, pipelineYamls }
 *   <- { type: "result",   id, data: EvalResult }
 *   <- { type: "error",    id, error: string }
 *   <- { type: "ready" }
 */

import init, { evaluate } from "@/lib/rsigma-wasm/pkg/rsigma_wasm";

let wasmReady = false;

async function initWasm() {
  try {
    await init();
    wasmReady = true;
    self.postMessage({ type: "ready" });
  } catch (e) {
    self.postMessage({
      type: "error",
      id: -1,
      error: `Failed to initialize rsigma WASM: ${e}`,
    });
  }
}

self.onmessage = async (event: MessageEvent) => {
  const { type, id, ruleYaml, eventsJson, pipelineYamls, filterYamls } = event.data;

  if (type === "evaluate") {
    if (!wasmReady) {
      self.postMessage({
        type: "error",
        id,
        error: "rsigma WASM module is not yet initialized",
      });
      return;
    }

    try {
      // pipelineYamls and filterYamls are JSON-encoded string[] from the evaluator
      const resultJson = evaluate(ruleYaml, eventsJson, pipelineYamls || "[]", filterYamls || "[]");
      const data = JSON.parse(resultJson);
      self.postMessage({ type: "result", id, data });
    } catch (e) {
      self.postMessage({
        type: "error",
        id,
        error: `Evaluation failed: ${e}`,
      });
    }
  }
};

// Start initialising the WASM module immediately.
initWasm();
