import {test, expect} from '@playwright/test';

test.describe('Conversion', () => {
    test('tests that rules can be imported and converted', async ({page}) => {
        await page.goto('/', {
            waitUntil: 'networkidle',
        });

        await page.getByRole('button', {name: 'Browser'}).click();
        await page.locator('.mx-4 > div:nth-child(2)').first().click({
            timeout: 30000,
        });
        await page.getByRole('button', {name: 'Import to Studio'}).click({
            timeout: 30000,
        });
        await expect(page.locator('#siem-query-editor')).toContainText('eventName="DeleteBucket" errorCode="Success" OR NOT errorCode=*', {
            timeout: 90000,
        });

    });
});