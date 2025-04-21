import { test, expect } from '@playwright/test';

test.describe('Conversion', () => {
  test('tests that basic conversion works well', async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'networkidle',
    });
    await page.locator('data-test-id=new-sigma-rule').click();
    await page.getByRole('menuitem', { name: 'Sigma Rule' }).click();
    await page.getByRole('tabpanel', { name: 'new_sigma_rule Close' }).getByRole('textbox').click();
    await page.getByRole('tabpanel', { name: 'new_sigma_rule Close' }).getByRole('textbox').press('ControlOrMeta+a');
    await page.getByRole('tabpanel', { name: 'new_sigma_rule Close' }).getByRole('textbox').fill('title: AWS Root Credentials\ndescription: Detects AWS root account usage\nlogsource:\n    product: aws\n    service: cloudtrail\ndetection:\n    selection:\n        userIdentity.type: Root\n    filter:\n        eventType: AwsServiceEvent\n    condition: selection and not filter\nfalsepositives:\n    - AWS Tasks That Require Root User Credentials\nlevel: medium');
    await expect(page.locator('#siem-query-editor')).toContainText('userIdentity.type="Root" NOT eventType="AwsServiceEvent"', {
      timeout: 90000,
    });
  });
});