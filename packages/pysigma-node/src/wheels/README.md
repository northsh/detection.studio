# Bundled jq WebAssembly wheel

`jq-1.13.0-cp314-cp314-pyemscripten_2026_0_wasm32.whl` contains the real jq Python
extension, statically linked with libjq 1.8.2 and Oniguruma 6.9.10. It is built for
Pyodide 314.0.7 (CPython 3.14, Emscripten 5.0.3, Pyodide ABI 2026.0), not the host
operating system. It is checked in so normal installs and CI need no C toolchain.

The wheel is inlined by tsup's binary loader. Bootstrap writes it to Pyodide's
virtual filesystem, installs it with micropip, and removes the temporary copy.
This works identically in Node, browsers, and workers, without a wheel CDN.

## Rebuilding

From the repository root, with [uv](https://docs.astral.sh/uv/) installed:

```sh
uv run --python 3.14 scripts/build-jq-wheel.py
bun run build:lib
bun run --cwd packages/pysigma-node test
```

The script pins pyodide-build 0.39.1, verifies the source archive SHA-256, and
downloads the matching Pyodide cross-build environment and Emscripten SDK.
`PYODIDE_XBUILDENV_PATH` can select an existing build cache; otherwise the cache
is `.jq-xbuildenv/` (gitignored).

Source: [jq 1.13.0 sdist on PyPI](https://pypi.org/project/jq/1.13.0/#files).
Source SHA-256: `e62bdddeab3b8a0a404581a7bb6f1e8c4cc6082280870031f746074f4cac52c0`.

Checked-in wheel SHA-256:
`551eeb75be91549075115a223144dfbfe67d1b292e25f5bc8815017ce8b00390`.

The only source changes are build-system changes in `setup.py`: cross-configure
for Emscripten, omit the host pthread flag, disable shared libraries, and build
only the static libjq target. No jq or regular-expression behavior is mocked.

Third-party notices are included in the wheel and in `LICENSES.txt`, which is
also copied to `dist/JQ-LICENSES.txt` for npm publication. The integration suite
exercises jq projections and Oniguruma regular expressions in a real Pyodide
runtime, alongside real Splunk and Elasticsearch conversions.
