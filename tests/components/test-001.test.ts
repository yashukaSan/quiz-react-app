import { test, expect } from '@playwright/test';

test.describe('main page', ()=> {
    // test.beforeEach( async ({ page }), {})

    test('has Title', async ({ page }) => {
        await page.goto('http://localhost:5173/');

        await expect(page).toHaveTitle(/Quiz/i);
    })
})