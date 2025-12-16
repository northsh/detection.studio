<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Sparkles, TrendingUp, Bug, CalendarDays } from 'lucide-vue-next'
import { useChangelog } from '@/composables/useChangelog'

const props = defineProps<{
  open?: boolean
  autoShow?: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const {
  manifest,
  latestRelease,
  hasNewRelease,
  loading,
  error,
  loadManifest,
  loadChangelog,
  dismissRelease,
  markdownToHtml,
} = useChangelog()

const isOpen = ref(false)
const selectedVersion = ref<string | null>(null)
const changelogContent = ref('')
const loadingChangelog = ref(false)

// Check if a release is the latest
function isLatestRelease(version: string) {
  return manifest.value?.releases[0]?.version === version
}

// Sync with parent's open prop
watch(() => props.open, (value) => {
  if (value !== undefined) {
    isOpen.value = value
  }
})

watch(isOpen, (value) => {
  emit('update:open', value)

  // Dismiss the latest release when dialog is closed
  if (!value && latestRelease.value) {
    dismissRelease(latestRelease.value.version)
  }
})

// Load changelogs on mount
onMounted(async () => {
  await loadManifest()

  // Auto-show dialog if there's a new release and autoShow is enabled
  if (props.autoShow && hasNewRelease.value) {
    await selectRelease(latestRelease.value!.version)
    isOpen.value = true
  }
})

// Select a release and load its content
async function selectRelease(version: string) {
  selectedVersion.value = version
  loadingChangelog.value = true
  changelogContent.value = ''

  try {
    const content = await loadChangelog(version)
    changelogContent.value = content || ''
  } finally {
    loadingChangelog.value = false
  }
}

// Open the dialog and load content
async function openDialog() {
  if (!selectedVersion.value && latestRelease.value) {
    await selectRelease(latestRelease.value.version)
  }
  isOpen.value = true
}

// Close the dialog
function closeDialog() {
  isOpen.value = false
}

// Computed HTML content
const htmlContent = computed(() => {
  if (!changelogContent.value) return ''
  return markdownToHtml(changelogContent.value)
})

// Expose openDialog method for parent components
defineExpose({
  openDialog,
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="max-w-5xl max-h-[85vh]">
      <DialogHeader class="pb-4 bg-secondary/30 mb-4 -mt-6 -mx-6 p-6 rounded-b">
        <DialogTitle class="text-2xl font-bold flex items-center gap-2">
          <Sparkles class="h-6 w-6 text-muted-foreground" />
          What's New
        </DialogTitle>
        <DialogDescription class="text-base">
          Check out the latest updates and improvements to Detection Studio
        </DialogDescription>
      </DialogHeader>

      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-muted-foreground">Loading changelogs...</div>
      </div>

      <div v-else-if="error" class="text-destructive py-4">
        Error loading changelogs: {{ error }}
      </div>

      <div v-else class="grid grid-cols-[280px_1fr] h-[50vh] -mt-3">
        <!-- Left side: Release list -->
        <ScrollArea class="pr-6">
          <div class="space-y-2">
            <button
              v-for="release in manifest?.releases"
              :key="release.version"
              @click="selectRelease(release.version)"
              class="w-full text-left px-4 py-3 rounded-lg transition-all hover:bg-accent hover:shadow-sm group relative"
              :class="{
                'bg-primary/10 border border-primary/20 shadow-sm': selectedVersion === release.version,
                'hover:border hover:border-border': selectedVersion !== release.version,
              }"
            >
              <div class="flex items-center justify-between mb-1">
                <div
                  class="text-sm font-bold"
                  :class="{
                  'text-primary': selectedVersion === release.version,
                }"
                >
                  {{ release.version }}
                </div>
                <Badge
                  v-if="isLatestRelease(release.version)"
                  variant="secondary"
                  class="text-xs px-2 py-0"
                >
                  NEW
                </Badge>
              </div>
              <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays class="h-3 w-3" />
                {{ release.date }}
              </div>
            </button>
          </div>
        </ScrollArea>

        <!-- Right side: Release notes -->
        <ScrollArea class="pr-4">
          <div v-if="loadingChangelog" class="flex items-center justify-center py-12">
            <div class="text-muted-foreground">Loading release notes...</div>
          </div>

          <div
            v-else-if="changelogContent"
            class="changelog-content space-y-6 pb-4"
            v-html="htmlContent"
          />

          <div v-else class="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Sparkles class="h-12 w-12 mb-3 opacity-50" />
            <p>Select a release to view its notes</p>
          </div>
        </ScrollArea>
      </div>

      <div class="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" @click="closeDialog"> Close </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
@reference '@/assets/index.css';

.changelog-content :deep(h1) {
  @apply text-2xl font-bold mb-1 pb-2;
}

.changelog-content :deep(h2) {
  @apply text-xl font-semibold mt-2 mb-1 flex items-center gap-2 text-primary-foreground/80;
}

.changelog-content :deep(h2.section-header) {
  @apply text-xl font-bold mt-8 mb-4 pb-2 flex items-center gap-2;
}

.changelog-content :deep(h3) {
  @apply text-lg font-semibold mt-3 mb-1;
}

.changelog-content :deep(ul) {
  @apply space-y-0 mb-0;
}

.changelog-content :deep(li) {
  @apply ml-6 leading-relaxed text-muted-foreground;
}

.changelog-content :deep(p) {
  @apply leading-relaxed text-muted-foreground;
}

.changelog-content :deep(strong) {
  @apply font-semibold text-foreground;
}

.changelog-content :deep(a) {
  @apply text-primary hover:underline;
}

.changelog-content :deep(hr) {
  @apply my-8 border-border;
}

.changelog-content :deep(video) {
    @apply rounded-xl;
}
</style>
