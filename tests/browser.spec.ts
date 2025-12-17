import { test, expect } from "@playwright/test";

test.describe("Conversion", () => {
  test("tests that rules can be imported and converted", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Close" }).first().click();
    await page.getByRole("button", { name: "Browser" }).click();
    await page.getByRole("textbox", { name: "Search across rules..." }).click();
    await page.getByRole("textbox", { name: "Search across rules..." }).fill("AWS Root");
    await page.getByText("AWS Root Credentials").click();
    await page.getByRole("button", { name: "Import to Studio" }).click();
    await expect(page.locator("#siem-query-editor")).toContainText(
      'userIdentity.type="Root" NOT eventType="AwsServiceEvent"',
    );
  });
});
