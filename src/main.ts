import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'

import { createPinia } from "pinia";
import { PiniaColada } from "@pinia/colada";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { PiniaUndo } from "pinia-undo";

// Import stores
import { useSigmaRulesStore } from './stores/SigmaRulesStore';

import "@fontsource-variable/dm-sans/index.css";

import * as Sentry from "@sentry/vue";

const app = createApp(App)

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
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


const pinia = createPinia()
  .use(PiniaUndo)
  .use(piniaPluginPersistedstate);

app.use(pinia)
  .use(PiniaColada, {})
  .mount('#app')

// Initialize stores
useSigmaRulesStore(pinia);
