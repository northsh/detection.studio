import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from "vite-svg-loader";
import path, {dirname, join} from "path";
import {fileURLToPath} from "url";
import {viteStaticCopy} from "vite-plugin-static-copy";
import fs from 'fs-extra';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';


const PYODIDE_EXCLUDE = [
    "!**/*.{md,html}",
    "!**/*.d.ts",
    "!**/*.whl",
    "!**/node_modules",
];

export function viteStaticCopyPyodide() {
    const pyodideDir = dirname(fileURLToPath(import.meta.resolve("pyodide")));
    return viteStaticCopy({
        targets: [
            {
                src: [join(pyodideDir, "*")].concat(PYODIDE_EXCLUDE),
                dest: "assets",
            },
            {
                src: 'src/lib/sigma/python/*.py',
                dest: '',
            },
        ],
    });
}

// Function to clone or update the Sigma repository at build time
function sigmaRepoPlugin() {
    const REPO_URL = 'https://github.com/SigmaHQ/sigma.git';
    const LOCAL_REPO_PATH = '.sigma-repo';

    return {
        name: 'sigma-repo-plugin',
        buildStart: async () => {
            console.log('Cloning or updating SigmaHQ repository...');
            
            try {
                const repoPath = path.resolve(LOCAL_REPO_PATH);
                
                // Check if repo already exists
                if (fs.existsSync(path.join(repoPath, '.git'))) {
                    console.log('Repo exists, updating...');
                    
                    // Fetch the latest changes
                    await git.fetch({
                        fs,
                        http,
                        dir: repoPath,
                        url: REPO_URL,
                        depth: 1,
                        singleBranch: true,
                        tags: false
                    });
                    
                    // Get current branch name
                    const currentBranch = await git.currentBranch({
                        fs,
                        dir: repoPath,
                        fullname: false
                    });
                    
                    // Get latest remote commit
                    const remoteInfo = await git.fetch({
                        fs,
                        http,
                        dir: repoPath,
                        url: REPO_URL,
                        ref: currentBranch || 'master',
                        depth: 1,
                        singleBranch: true,
                        tags: false
                    });
                    
                    // Get the latest commit SHA
                    const latestCommitSha = remoteInfo.fetchHead;
                    
                    // Force checkout to that commit
                    await git.checkout({
                        fs,
                        dir: repoPath,
                        ref: latestCommitSha,
                        force: true
                    });
                    
                    console.log('Repository updated successfully.');
                } else {
                    console.log('Repo does not exist, cloning...');
                    
                    // Ensure parent directory exists
                    fs.ensureDirSync(repoPath);
                    
                    // Clone the repository
                    await git.clone({
                        fs,
                        http,
                        dir: repoPath,
                        url: REPO_URL,
                        depth: 1,
                        singleBranch: true,
                        ref: 'master'
                    });
                    
                    console.log('Repository cloned successfully.');
                }
                
                // Generate an index file with metadata of all rules
                const indexData = await indexRules(repoPath);
                fs.writeJSONSync(path.join('public', 'sigma-rules-index.json'), indexData, { spaces: 2 });
                console.log('Sigma rules index generated successfully.');
            } catch (error) {
                console.error('Error in sigma-repo-plugin:', error);
            }
        }
    };
}

// Function to index all Sigma rules and generate metadata
async function indexRules(repoPath) {
    const rulesPath = path.join(repoPath, 'rules');
    const rules = [];
    
    async function processDirectory(dirPath) {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            
            if (entry.isDirectory()) {
                // Recursively process subdirectories
                await processDirectory(fullPath);
            } else if (entry.isFile() && (entry.name.endsWith('.yml') || entry.name.endsWith('.yaml'))) {
                // Process YAML files
                try {
                    const content = await fs.readFile(fullPath, 'utf-8');
                    const yaml = await import('js-yaml');
                    const yamlContent = yaml.load(content);
                    
                    // Skip if not a valid rule or it's a collection
                    if (!yamlContent || Array.isArray(yamlContent)) continue;
                    
                    // Extract the relative path from the repository root
                    const relativePath = path.relative(repoPath, fullPath);
                    
                    // Basic rule parsing
                    const rule = {
                        id: yamlContent.id || '',
                        title: yamlContent.title || '',
                        description: yamlContent.description || '',
                        status: yamlContent.status || '',
                        author: yamlContent.author || '',
                        date: yamlContent.date || '',
                        modified: yamlContent.modified || '',
                        tags: yamlContent.tags || [],
                        level: yamlContent.level || '',
                        path: relativePath,
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

// https://vite.dev/config/
export default defineConfig({

    plugins: [
        vue(),
        sigmaRepoPlugin(),
        svgLoader(),
        viteStaticCopyPyodide(),
        sentryVitePlugin({
            org: "northsh",
            project: "detection-studio"
        })
    ],
    root: './',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        sourcemap: true,
        target: 'esnext',
    },
    worker: {
        format: 'es',
    }
})
