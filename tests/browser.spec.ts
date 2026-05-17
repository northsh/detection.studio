import { test, expect } from "@playwright/test";

test.describe("Conversion", () => {
    test("tests that rules can be imported and converted", async ({ page }) => {
        // Navigate directly to /browser and wait for the page to fully stabilise.
        // This avoids race-conditions caused by Vite's on-demand dependency
        // optimisation triggering a page reload while the test interacts with the UI.
        await page.goto("/browser", {
            waitUntil: "networkidle",
            timeout: 60000,
        });
        await page.getByRole("button", { name: "Close" }).first().click({ timeout: 15000 });

        await page.getByRole("button", { name: "Browser" }).click({ timeout: 15000 });
        await page.getByRole("textbox", { name: "Search across rules..." }).click({ timeout: 15000 });
        await page
            .getByRole("textbox", { name: "Search across rules..." })
            .fill("rundll32 uncommon execution");
        await page
            .getByText(
                "Rundll32 Execution With Uncommon DLL ExtensionmediumtestDetects the execution",
            )
            .click({ timeout: 30000 });
        await page.getByRole("button", { name: "Import to Studio" }).click({ timeout: 15000 });
        await expect(page.locator("#siem-query-editor")).toContainText("", { timeout: 30000 });

        // Conversion via Pyodide can take a while on CI
        await expect(page.locator("#siem-query-editor")).toContainText(
            'AppData',
            { timeout: 120000 },
        );
    });
});
