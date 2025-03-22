import './assets/index.css'
import App from './App.vue'
import routes from './router'

import {createPinia} from "pinia";
import {PiniaColada} from "@pinia/colada";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {PiniaUndo} from "pinia-undo";

// Import stores
import {useSigmaRulesStore} from './stores/SigmaBrowserStore.ts';
import {useSettingsStore} from './stores/SettingsStore';

import "@fontsource-variable/dm-sans/index.css";

import * as Sentry from "@sentry/vue";
import {ViteSSG} from "vite-ssg";

export const app = ViteSSG(
    // the root component
    App,
    // vue-router options
    {routes},
    // function to have custom setups
    ({app, router, _routes, _isClient, _initialState}) => {


        Sentry.init({
            app,
            dsn: import.meta.env.VITE_SENTRY_DSN,
            integrations: [
                Sentry.browserTracingIntegration({
                    router
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

        const pinia = createPinia()
            .use(PiniaUndo)
            .use(piniaPluginPersistedstate);

        // Initialize stores
        useSigmaRulesStore(pinia);
        useSettingsStore(pinia);


        app.use(pinia)
            .use(PiniaColada, {})

    },
)

