// Function to clone or update the Sigma repository at build time
import path from "path";
import simpleGit from "simple-git";
import { mkdir } from "fs/promises";

export default function sigmaRepoPlugin() {
  const REPO_URL = "https://github.com/SigmaHQ/sigma.git";
  const LOCAL_REPO_PATH = ".sigma-repo";

  if (import.meta.env?.SSR) {
    return;
  }

  return {
    name: "sigma-repo-plugin",
    buildStart: async function () {
      console.log("Cloning or updating SigmaHQ repository...");

      try {
        const repoPath = path.resolve(LOCAL_REPO_PATH);
        const gitDirPath = path.join(repoPath, ".git");

        // Check if repo already exists
        const repoExists = await Bun.file(gitDirPath).exists();

        if (repoExists) {
          console.log("Repo exists, updating...");

          const git = simpleGit(repoPath);

          // Fetch the latest changes
          await git.fetch(["--depth", "1"]);

          // Get current branch name
          const branch = await git.branch();
          const currentBranch = branch.current || "master";

          // Pull latest changes (fetch + merge)
          await git.pull("origin", currentBranch, ["--depth", "1"]);

          console.log("Repository updated successfully.");
        } else {
          console.log("Repo does not exist, cloning...");

          // Ensure parent directory exists
          await mkdir(repoPath, { recursive: true });

          // Clone the repository
          await simpleGit().clone(REPO_URL, repoPath, [
            "--depth",
            "1",
            "--single-branch",
            "--branch",
            "master",
          ]);

          console.log("Repository cloned successfully.");
        }

        // Generate an index file with metadata of all rules
        const indexData = await indexRules(repoPath);
        const indexPath = path.join("public", "sigma-rules-index.json");
        await mkdir(path.dirname(indexPath), { recursive: true });
        await Bun.write(indexPath, JSON.stringify(indexData, null, 2));
        console.log("Sigma rules index generated successfully.");
      } catch (error) {
        console.error("Error in sigma-repo-plugin:", error);
      }
    },
  };
}

// Function to index all Sigma rules and generate metadata
async function indexRules(repoPath: string) {
  const rulesPath = path.join(repoPath, "rules");
  const rules: any[] = [];

  async function processDirectory(dirPath: string) {
    const entries = await Array.fromAsync(Bun.readDir(dirPath, { withFileTypes: true }));

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith(".yml") || entry.name.endsWith(".yaml"))) {
        // Process YAML files
        try {
          const content = await Bun.file(fullPath).text();
          const yaml = await import("js-yaml");
          const yamlContent = yaml.load(content) as any;

          // Skip if not a valid rule or it's a collection
          if (!yamlContent || Array.isArray(yamlContent)) continue;

          // Extract the relative path from the repository root
          const relativePath = path.relative(repoPath, fullPath);

          // Remove the logsource.definition if it exists
          if (yamlContent?.logsource?.definition) {
            delete yamlContent.logsource.definition;
          }

          // Basic rule parsing
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
