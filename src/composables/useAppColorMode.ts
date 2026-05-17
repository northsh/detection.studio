import { useColorMode, usePreferredDark } from "@vueuse/core";
import { computed } from "vue";

/**
 * Single source of truth for color mode across the app.
 * Uses the `class` attribute on <html> (light / dark) which matches
 * the @custom-variant dark defined in index.css.
 */
export function useAppColorMode() {
    const colorMode = useColorMode({
        attribute: "class",
        modes: { light: "light", dark: "dark" },
    });

    const prefersDark = usePreferredDark();

    const isDark = computed(() =>
        colorMode.value === "dark" ||
        (colorMode.value === "auto" && prefersDark.value)
    );

    return { colorMode, prefersDark, isDark };
}
