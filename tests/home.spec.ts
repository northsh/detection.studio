import { test, expect } from "@playwright/test";

test.describe("Conversion", () => {
  test("tests that basic conversion works well", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    await page.getByRole("button", { name: "Close" }).first().click({ timeout: 15000 });
    await page.locator('[data-test-id="new-sigma-rule"]').click({ timeout: 15000 });
    await page.getByRole('menuitem', { name: 'Sigma Rule' }).hover({ timeout: 10000 });
    await page.getByRole('menuitem', { name: 'Registry Event Detect' }).click({ timeout: 10000 });
    await expect(page.locator('#siem-query-editor')).toContainText('TargetObject', { timeout: 60000 });
  });
});
