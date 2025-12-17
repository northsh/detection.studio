import { ref, computed } from "vue";
import { useStorage } from "@vueuse/core";

export interface Release {
    version: string;
    date: string;
    file: string;
}

export interface ChangelogManifest {
    releases: Release[];
}

const CHANGELOG_BASE_URL = "/changelogs";
const DISMISSED_RELEASES_KEY = "dismissedReleases";

export function useChangelog() {
    const manifest = ref<ChangelogManifest | null>(null);
    const changelogs = ref<Map<string, string>>(new Map());
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Store dismissed releases in localStorage
    const dismissedReleases = useStorage<string[]>(DISMISSED_RELEASES_KEY, []);

    // Load the manifest file
    async function loadManifest() {
        try {
            loading.value = true;
            error.value = null;

            const response = await fetch(`${CHANGELOG_BASE_URL}/manifest.json`);
            if (!response.ok) {
                throw new Error("Failed to load changelog manifest");
            }

            manifest.value = await response.json();
        } catch (e) {
            error.value = e instanceof Error ? e.message : "Unknown error";
            console.error("Error loading changelog manifest:", e);
        } finally {
            loading.value = false;
        }
    }

    // Load a specific changelog file
    async function loadChangelog(version: string) {
        if (changelogs.value.has(version)) {
            return changelogs.value.get(version);
        }

        try {
            const release = manifest.value?.releases.find((r) => r.version === version);
            if (!release) {
                throw new Error(`Release ${version} not found`);
            }

            const response = await fetch(`${CHANGELOG_BASE_URL}/${release.file}`);
            if (!response.ok) {
                throw new Error(`Failed to load changelog for version ${version}`);
            }

            const content = await response.text();
            changelogs.value.set(version, content);
            return content;
        } catch (e) {
            error.value = e instanceof Error ? e.message : "Unknown error";
            console.error(`Error loading changelog for ${version}:`, e);
            return null;
        }
    }

    // Load all changelogs and concatenate them
    async function loadAllChangelogs() {
        if (!manifest.value) {
            await loadManifest();
        }

        if (!manifest.value?.releases) {
            return "";
        }

        const contents = await Promise.all(
            manifest.value.releases.map((release) => loadChangelog(release.version)),
        );

        return contents.filter(Boolean).join("\n\n---\n\n");
    }

    // Get the latest release
    const latestRelease = computed(() => {
        return manifest.value?.releases[0] || null;
    });

    // Check if there's a new release that hasn't been dismissed
    const hasNewRelease = computed(() => {
        if (!latestRelease.value) return false;
        return !dismissedReleases.value.includes(latestRelease.value.version);
    });

    // Dismiss a release notification
    function dismissRelease(version: string) {
        if (!dismissedReleases.value.includes(version)) {
            dismissedReleases.value = [...dismissedReleases.value, version];
        }
    }

    // Simple markdown to HTML converter with icon support
    function markdownToHtml(markdown: string): string {
        let html = markdown
            // Other headers
            .replace(/^### (.*$)/gim, "<h3>$1</h3>")
            .replace(/^## (.*$)/gim, "<h2>$1</h2>")
            .replace(/^# (.*$)/gim, "<h1>$1</h1>")
            // Bold
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            // Italic
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            // Lists
            .replace(/^- (.*$)/gim, "<li>$1</li>")
            // Links
            .replace(
                /\[([^\]]+)\]\(([^)]+)\)/g,
                '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
            )
            // Horizontal rules
            .replace(/^---$/gim, "<hr />")
            // Line breaks
            .replace(/\n\n/g, "</p><p>")
            .replace(/\n/g, "<br />");

        // Wrap in paragraph tags
        html = `<p>${html}</p>`;

        // Wrap consecutive list items in ul tags
        html = html.replace(/(<li.*?<\/li>(?:\s*<li.*?<\/li>)*)/g, '<ul class="list-disc">$1</ul>');

        return html;
    }

    return {
        manifest,
        changelogs,
        loading,
        error,
        latestRelease,
        hasNewRelease,
        loadManifest,
        loadChangelog,
        loadAllChangelogs,
        dismissRelease,
        markdownToHtml,
    };
}
