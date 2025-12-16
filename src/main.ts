import "./assets/index.css";
import App from "./App.vue";

import { createPinia } from "pinia";
import { PiniaColada } from "@pinia/colada";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { PiniaUndo } from "pinia-undo";

// Import stores
import { useSigmaRulesStore } from "./stores/SigmaBrowserStore.ts";
import { useSettingsStore } from "./stores/SettingsStore.ts";

import "@fontsource-variable/dm-sans/index.css";

import { ViteSSG } from "vite-ssg";
import * as Sentry from "@sentry/vue";

const routes = [
  {
    path: "/",
    name: "studio",
    component: () => import("@/views/Studio.vue"),
  },
  {
    path: "/browser",
    name: "browser",
    component: () => import("@/views/RulesBrowser.vue"),
    // Add query parameters to allow sharing specific rules
    props: (route: any) => ({
      ruleId: route.query.ruleId || null,
    }),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/Settings.vue"),
  },
];

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // function to have custom setups
  ({ app, router }) => {
    // Initialize Sentry for error tracking and performance monitoring
    Sentry.init({
      app,
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        Sentry.browserTracingIntegration({
          router,
        }),
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
        Sentry.feedbackIntegration({
          // Additional SDK configuration goes in here, for example:
          colorScheme: "dark",
        }),
      ],
      // Tracing
      tracesSampleRate: 1.0, //  Capture 100% of the transactions
      // Session Replay
      replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });

    let pinia = createPinia();

    pinia = pinia.use(PiniaUndo).use(piniaPluginPersistedState);
    // Initialize stores
    app.use(pinia).use(PiniaColada, {});
    useSigmaRulesStore(pinia);
    useSettingsStore(pinia);
  },
);
