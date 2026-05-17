import { defineStore } from "pinia";
import { ref } from "vue";

export type Theme = "light" | "dark" | "system";

export const useSettingsStore = defineStore(
  "settings",
  () => {
    // State
    const defaultAuthor = ref("");
    const defaultSIEM = ref("splunk");
    const defaultTemplate = ref("default");
    const theme = ref<Theme>("system");

    // Actions
    function setDefaultAuthor(author: string) {
      defaultAuthor.value = author;
    }

    function setDefaultSIEM(siem: string) {
      defaultSIEM.value = siem;
    }

    function setDefaultTemplate(template: string) {
      defaultTemplate.value = template;
    }

    function setTheme(newTheme: Theme) {
      theme.value = newTheme;
    }

    return {
      // State
      defaultAuthor,
      defaultSIEM,
      defaultTemplate,
      theme,

      // Actions
      setDefaultAuthor,
      setDefaultSIEM,
      setDefaultTemplate,
      setTheme,
    };
  },
  {
    persist: true,
  },
);
