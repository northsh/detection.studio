/**
 * Importing a `.py` file yields its contents as a string. The text loader is
 * configured for the bundler (tsup/esbuild) and the test runner (vitest/vite).
 */
declare module "*.py" {
    const source: string;
    export default source;
}
