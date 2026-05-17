<script lang="ts" setup>
import {ref, watch} from 'vue';
import {toast} from 'vue-sonner';
import {useAppColorMode} from '@/composables/useAppColorMode';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {supportedSiems} from '@/types/SIEMs';
import {useSettingsStore, type Theme} from '@/stores/SettingsStore';

// Access the Settings store
const settingsStore = useSettingsStore();

const { colorMode } = useAppColorMode();

// Refs for form inputs
const defaultAuthor = ref(settingsStore.defaultAuthor);
const defaultSIEM = ref(settingsStore.defaultSIEM);
const defaultTemplate = ref(settingsStore.defaultTemplate);
const theme = ref<Theme>(settingsStore.theme);

// Templates options
const templateOptions = [
    {value: 'process_creation', label: 'Process Creation', description: 'Detect process execution events'},
    {value: 'network_connection', label: 'Network Connection', description: 'Detect outbound network activity'},
    {value: 'registry_event', label: 'Registry Event', description: 'Detect registry key modifications'},
    {value: 'file_event', label: 'File Event', description: 'Detect file creation or changes'},
];

// Theme options
const themeOptions: {value: Theme; label: string}[] = [
    {value: 'system', label: 'System default'},
    {value: 'light', label: 'Light'},
    {value: 'dark', label: 'Dark'},
];

// Apply theme immediately when it changes
watch(theme, (newTheme) => {
    colorMode.value = newTheme === 'system' ? 'auto' : newTheme;
});

// Save changes
function saveSettings() {
    settingsStore.setDefaultAuthor(defaultAuthor.value);
    settingsStore.setDefaultSIEM(defaultSIEM.value);
    settingsStore.setDefaultTemplate(defaultTemplate.value);
    settingsStore.setTheme(theme.value);
    colorMode.value = theme.value === 'system' ? 'auto' : theme.value;
    toast.success('Settings saved', {
        description: 'Your preferences have been updated.',
    });
}
</script>

<template>
  <div class="container py-10">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-3xl font-bold mb-6">Settings</h1>

      <Card class="mb-6">
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
          <CardDescription>Customize your detection authoring experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="grid gap-2">
              <Label for="default-author">Default Author</Label>
              <Input
                id="default-author"
                v-model="defaultAuthor"
                placeholder="Your name or organization"
              />
              <p class="text-sm text-muted-foreground">
                This will be used as the default author in new Sigma rules
              </p>
            </div>

            <div class="grid gap-2">
              <Label for="default-siem">Default SIEM</Label>
              <Select v-model="defaultSIEM">
                <SelectTrigger id="default-siem" class="w-full">
                  <SelectValue placeholder="Select your primary SIEM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="siem in supportedSiems" :key="siem.id" :value="siem.id">
                    {{ siem.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <p class="text-sm text-muted-foreground">
                The default SIEM for new workspaces
              </p>
            </div>

            <div class="grid gap-2">
              <Label for="default-template">Default Sigma Rule Template</Label>
              <Select v-model="defaultTemplate">
                <SelectTrigger id="default-template" class="w-full">
                  <SelectValue placeholder="Select a default template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="template in templateOptions"
                    :key="template.value"
                    :value="template.value"
                  >
                    <div class="flex flex-col">
                      <span>{{ template.label }}</span>
                      <span class="text-xs text-muted-foreground">{{ template.description }}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p class="text-sm text-muted-foreground">Used when creating new Sigma rules from the file list</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="saveSettings">Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Configure application-wide settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="grid gap-2">
              <Label for="theme">Theme</Label>
              <Select v-model="theme">
                <SelectTrigger id="theme" class="w-full">
                  <SelectValue placeholder="System default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="opt in themeOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <p class="text-sm text-muted-foreground">Application theme preference (applied immediately)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
