import { test, expect } from '@playwright/test';

test.describe('main page', ()=> {
    // test.beforeEach( async ({ page }), {})

    test('has Title', async ({ page }) => {
        await page.goto('http://localhost:5173/');

        await expect(page).toHaveTitle(/Quiz/i);
    })

    test('when all field value provided and click on Submit button', async ({ page }) => {
        await page.goto('http://localhost:5173');

        const nameInput = page.locator('#name-input');
        const ageInput = page.locator('#age-input');
        const submitBtn = page.locator('#submit-button');
        

        await nameInput.fill("Yashuka");
        await ageInput.fill(String(25));

        await submitBtn.click()

        const subjectScreen = page.locator('#subject-select-screen');

        expect(subjectScreen).toBeVisible();
    });

    
    test('when name field is provided and age field is not', async ({ page }) => {
        await page.goto('http://localhost:5173');

        const nameInput = page.locator('#name-input');
        const ageInput = page.locator('#age-input');
        const submitBtn = page.locator('#submit-button');
        

        await nameInput.fill("Yashuka");
        await ageInput.fill("");

        await submitBtn.click()

        const subjectScreen = page.locator('#subject-select-screen');
        const ageValue = page.locator('#age-container');
        const nameValue = page.locator('#name-conatiner');

        expect(subjectScreen).toBeVisible();
        expect(ageValue).not.toBeVisible();
        expect(nameValue).not.toBeVisible();
    });
    
    test('when age field is provided and nmae is not', async ({ page }) => {
        await page.goto('http://localhost:5173');

        const nameInput = page.locator('#name-input');
        const ageInput = page.locator('#age-input');
        const submitBtn = page.locator('#submit-button');
        

        await nameInput.fill("");
        await ageInput.fill(String(25));

        await submitBtn.click()

        const subjectScreen = page.locator('#subject-select-screen');

        expect(subjectScreen).not.toBeVisible();
    });

    
    test('when no field value provided and click on Submit button', async ({ page }) => {
        await page.goto('http://localhost:5173');

        const nameInput = page.locator('#name-input');
        const ageInput = page.locator('#age-input');
        const submitBtn = page.locator('#submit-button');
        

        await nameInput.fill("");
        await ageInput.fill("");

        await submitBtn.click()

        const subjectScreen = page.locator('#subject-select-screen');

        expect(subjectScreen).not.toBeVisible();
    })
})