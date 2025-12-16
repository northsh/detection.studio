<script lang="ts" setup>
import {ref} from 'vue';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {supportedSiems} from '@/types/SIEMs';
import {useSettingsStore} from '@/stores/SettingsStore';

// Access the Settings store
const settingsStore = useSettingsStore();

// Refs for form inputs
const defaultAuthor = ref(settingsStore.defaultAuthor);
const defaultSIEM = ref(settingsStore.defaultSIEM);
const defaultTemplate = ref(settingsStore.defaultTemplate);

// Templates options
const templateOptions = [
    {value: 'default', label: 'Default Sigma Rule'},
    {value: 'process_creation', label: 'Process Creation'},
    {value: 'network_connection', label: 'Network Connection'},
    {value: 'registry_event', label: 'Registry Event'},
    {value: 'file_event', label: 'File Event'}
];

// Save changes
function saveSettings() {
    settingsStore.setDefaultAuthor(defaultAuthor.value);
    settingsStore.setDefaultSIEM(defaultSIEM.value);
    settingsStore.setDefaultTemplate(defaultTemplate.value);
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
              <p class="text-sm text-muted-foreground">The default SIEM for rule conversion</p>
            </div>

            <div class="grid gap-2">
              <Label for="default-template">Default Template</Label>
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
                    {{ template.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <p class="text-sm text-muted-foreground">The default template for new Sigma rules</p>
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
              <Select disabled>
                <SelectTrigger id="theme" class="w-full">
                  <SelectValue placeholder="System default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System default</SelectItem>
                </SelectContent>
              </Select>
              <p class="text-sm text-muted-foreground">Coming soon: Application theme preference</p>
            </div>

            <div class="grid gap-2">
              <Label for="code-font-size">Code Font Size</Label>
              <Select disabled>
                <SelectTrigger id="code-font-size" class="w-full">
                  <SelectValue placeholder="Medium (14px)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (12px)</SelectItem>
                  <SelectItem value="medium">Medium (14px)</SelectItem>
                  <SelectItem value="large">Large (16px)</SelectItem>
                </SelectContent>
              </Select>
              <p class="text-sm text-muted-foreground">
                Coming soon: Change the font size in code editors
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
