# @northsh/pysigma-node

Run the Python [pySigma](https://github.com/SigmaHQ/pySigma) library in **Node.js** and the **browser** via [Pyodide](https://pyodide.org/) (WebAssembly), and convert [Sigma](https://sigmahq.io/) detection rules into SIEM queries — with **zero native dependencies**.

- Works in Node.js, Bun, Deno, and browsers.
- Runs the real upstream pySigma + backends (Splunk, Elasticsearch, Loki, Kusto, Panther, …) installed on demand via `micropip`.
- Optional Web Worker support to keep the browser UI thread responsive.
- The Python glue code is inlined — no asset files to copy at runtime.

## Installation

```bash
npm install @northsh/pysigma-node pyodide
```

`pyodide` is a **peer dependency** so you control its version and how it is served.

## Quick start (Node.js)

```ts
import { SigmaConverter } from "@northsh/pysigma-node";

const converter = new SigmaConverter(); // runs Pyodide in-process

const rule = `
title: Whoami Execution
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    Image|endswith: '\\\\whoami.exe'
  condition: selection
`;

const { query, error } = await converter.convert(rule, "splunk");
console.log(error ?? query);
```

The first conversion downloads Pyodide and installs pySigma + the requested
backend, so it takes a few seconds. Subsequent calls are fast.

## Browser with a Web Worker (recommended)

Spawn the bundled worker entry and pass it to the converter:

```ts
import { SigmaConverter } from "@northsh/pysigma-node";

const worker = new Worker(
  new URL("@northsh/pysigma-node/worker", import.meta.url),
  { type: "module" },
);

const converter = new SigmaConverter({ worker });
const { query } = await converter.convert(rule, "esql");
```

In the browser (and without an `indexURL` override) Pyodide is loaded from the
jsDelivr CDN. In Node.js the locally installed `pyodide` package is used.

## API

### `new SigmaConverter(options?)`

| Option             | Type                      | Description                                                                 |
| ------------------ | ------------------------- | --------------------------------------------------------------------------- |
| `worker`           | `Worker`                  | Offload work to a Web Worker. Omit to run in-process (Node).                |
| `transport`        | `SigmaTransport`          | Provide a custom transport (overrides `worker`). Useful for testing.        |
| `targets`          | `Map<string, SigmaTarget>`| Custom target → backend registry. Defaults to `DEFAULT_SIGMA_TARGETS`.       |
| `pysigmaVersion`   | `string`                  | pySigma version to install (defaults to `1.5.0`).                           |
| `pipelinePackages` | `string[]`                | Pipeline packages to install at bootstrap.                                  |
| `indexURL`         | `string`                  | Override the Pyodide `indexURL`.                                            |
| `onStatus`         | `(status) => void`        | Status callback.                                                            |

Methods:

- `convert(rule, target, pipelines?, pipelineYmls?, filterYml?, format?, correlationMethod?, backendOptions?)` → `Promise<{ query, error? }>`
- `installBackend(target)` → preinstall a backend.
- `getAvailablePipelines(target)` → list compatible pipeline names.
- `addStatusListener(fn)` / `addReadinessListener(fn)` → subscribe to lifecycle.
- `isReady()` / `getStatus()` / `dispose()`.

### Low-level core

For full control, use the engine directly (no transport layer):

```ts
import { PyodideSigmaEngine } from "@northsh/pysigma-node/core";

const engine = new PyodideSigmaEngine();
await engine.init();
const { result } = await engine.convert({ rule, target: "loki" });
```

## Supported targets

A framework-agnostic registry of common targets ships as `DEFAULT_SIGMA_TARGETS`
(Splunk, Elasticsearch ES|QL/Lucene/EQL, Loki, Kusto, Panther, Google SecOps,
SentinelOne, SQLite, SurrealQL, QuickWit, CrowdStrike Logscale, DataDog,
NetWitness, Carbon Black, uberAgent). Provide your own via the `targets` option.

## License

MIT
