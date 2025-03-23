import {test, expect} from '@playwright/test';

test.describe('Conversion', () => {
    test('tests that basic conversion works well', async ({page}) => {
        await page.goto('/', {
            waitUntil: 'networkidle',
        });

        await page.getByRole('button', {name: 'Browser'}).click();
        await page.locator('.mx-4 > div:nth-child(2)').first().click();
        await page.getByRole('button', {name: 'Import to Studio'}).click();
        await expect(page.locator('#siem-query-editor')).toContainText('eventSource="lambda.amazonaws.com" eventName="UpdateFunctionConfiguration*"eventSource="lambda.amazonaws.com" eventName="UpdateFunctionConfiguration*"', {
            timeout: 30000,
        });

    });
});