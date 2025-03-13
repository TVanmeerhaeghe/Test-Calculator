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
        await page.click('text=−');
        await page.click('text=4');
        await page.click('text==');

        const result = await page.locator('.display p').innerText();
        expect(result).toBe('6');
    });

    test("Multiplication de 5 * 6 donne 30", async ({ page }) => {
        await page.click('text=5');
        await page.click('text=×');
        await page.click('text=6');
        await page.click('text==');

        const result = await page.locator('.display p').innerText();
        expect(result).toBe('30');
    });

    test("Division de 15 / 3 donne 5", async ({ page }) => {
        await page.click('text=1');
        await page.click('text=5');
        await page.click('text=÷');
        await page.click('text=3');
        await page.click('text==');

        const result = await page.locator('.display p').innerText();
        expect(result).toBe('5');
    });

    test("Division par 0 affiche 'Erreur'", async ({ page }) => {
        await page.click('text=5');
        await page.click('text=÷');
        await page.click('text=0');
        await page.click('text==');

        const result = await page.locator('.display p').innerText();
        expect(result).toBe('Erreur');
    });

    test("Le bouton 'C' réinitialise l'affichage", async ({ page }) => {
        await page.click('text=9');
        await page.click('text=C');

        const result = await page.locator('.display p').innerText();
        expect(result).toBe('0');
    });

    test("L'historique sauvegarde un calcul", async ({ page }) => {
        await page.click('text=7');
        await page.click('text=+');
        await page.click('text=8');
        await page.click('text==');

        const historyEntry = await page.locator('.history ul li').first().innerText();
        expect(historyEntry).toBe("7 + 8 = 15");
    });

    test("Cliquer sur un calcul de l'historique le remet dans l'affichage", async ({ page }) => {
        await page.click('text=3');
        await page.click('text=+');
        await page.click('text=5');
        await page.click('text==');

        await page.locator('.history ul li').first().click();

        const result = await page.locator('.display p').innerText();
        expect(result).toBe("3 + 5");
    });
});