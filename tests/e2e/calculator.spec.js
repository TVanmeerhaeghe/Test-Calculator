import { test, expect } from '@playwright/test';

test.describe("Calculatrice - Tests E2E", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173');
    });

    test("Addition de 2 + 3 donne 5", async ({ page }) => {
        await page.click('text=2');
        await page.click('text=+');
        await page.click('text=3');
        await page.click('text==');

        const result = await page.locator('.display p').innerText();
        expect(result).toBe('5');
    });

    test("Soustraction de 10 - 4 donne 6", async ({ page }) => {
        await page.click('text=1');
        await page.click('text=0');
        await page.click('text=-');
        await page.click('text=4');
        await page.click('text==');

        const result = await page.locator('.display p').innerText();
        expect(result).toBe('6');
    });
});