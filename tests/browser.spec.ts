import { test, expect } from "@playwright/test";

test.describe("Conversion", () => {
  test("tests that rules can be imported and converted", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });
    await page.getByRole('button', { name: 'Close' }).first().click();
    await page.getByRole('button', { name: 'Browser' }).click();

    // Wait for the rules index to load and the search input to be ready
    const searchBox = page.getByRole('textbox', { name: 'Search across rules...' });
    await searchBox.waitFor({ state: 'visible', timeout: 60000 });
    await searchBox.click();
    await searchBox.fill('aws root');

    // Wait for search results to appear (index loading + search can be slow on CI)
    const heading = page.getByRole('heading', { name: 'AWS Root Credentials' });
    await heading.waitFor({ state: 'visible', timeout: 120000 });
    await heading.click();

    await page.getByRole('button', { name: 'Import to Studio' }).click();

    // Conversion via Pyodide can take a while on CI
    await expect(page.locator('#siem-query-editor')).toContainText(
      'userIdentity.type="Root" NOT eventType="AwsServiceEvent"',
      { timeout: 120000 },
    );
  });
});
