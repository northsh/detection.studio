/**
 * Generates the sigma-rules-index.json file from the .sigma-repo directory.
 * Used in CI to pre-generate the index before running tests,
 * since the Vite plugin skips the clone/index step in CI.
 */
import path from "path";
import { mkdir, writeFile, readdir, readFile } from "fs/promises";
import yaml from "js-yaml";

const REPO_PATH = path.resolve(".sigma-repo");

async function indexRules(repoPath: string) {
    const rulesPath = path.join(repoPath, "rules");
    const rules: any[] = [];

    async function processDirectory(dirPath: string) {
        const entries = await readdir(dirPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                await processDirectory(fullPath);
            } else if (
                entry.isFile() &&
                (entry.name.endsWith(".yml") || entry.name.endsWith(".yaml"))
            ) {
                try {
                    const content = await readFile(fullPath, "utf-8");
                    const yamlContent = yaml.load(content) as any;

                    if (!yamlContent || Array.isArray(yamlContent)) continue;

                    const relativePath = path.relative(repoPath, fullPath);

                    if (yamlContent?.logsource?.definition) {
                        delete yamlContent.logsource.definition;
                    }

                    const rule = {
                        id: yamlContent.id || "",
                        title: yamlContent.title || "",
                        description: yamlContent.description || "",
                        status: yamlContent.status || "",
                        author: yamlContent.author || "",
                        tags: yamlContent.tags || [],
                        level: yamlContent.level || "",
                        path: relativePath,
                        logsource: yamlContent.logsource || {},
                    };

                    rules.push(rule);
                } catch (error) {
                    console.error(`Error processing rule file ${fullPath}:`, error);
                }
            }
        }
    }

    await processDirectory(rulesPath);
    return rules;
}

console.log("Generating Sigma rules index...");
const indexData = await indexRules(REPO_PATH);
const indexPath = path.join("public", "sigma-rules-index.json");
await mkdir(path.dirname(indexPath), { recursive: true });
await writeFile(indexPath, JSON.stringify(indexData, null, 2), "utf-8");
console.log(`Sigma rules index generated: ${indexData.length} rules`);
