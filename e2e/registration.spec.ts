import { test, expect } from '@playwright/test';

test.describe('Registration Page', () => {

    test('should disable the Register button for invalid form inputs', async ({ page }) => {
        await page.goto('http://localhost:4200/register');
        await page.fill('#register-email', 'invalid-email');
        await page.fill('#register-password', 'short');
        await page.fill('#register-confirmPassword', 'mismatch');
        const isDisabled = await page.isDisabled('button[type="submit"]');
        expect(isDisabled).toBeTruthy();
    });

    test('should show error for mismatched passwords', async ({ page }) => {
        await page.goto('http://localhost:4200/register');
        await page.fill('#register-email', 'test@example.com');
        await page.fill('#register-password', 'ValidPass1');
        await page.fill('#register-confirmPassword', 'DifferentPass');
        const isDisabled = await page.isDisabled('button[type="submit"]');
        expect(isDisabled).toBeTruthy();
        const errorMessage = page.locator('small', { hasText: 'Passwords do not match.' });
        await expect(errorMessage).toBeVisible();

    });

    test('should allow registration with valid form inputs', async ({ page }) => {    
        await page.goto('http://localhost:4200/register');
        await page.fill('#register-email', 'test@example.com');
        await page.fill('#register-password', 'ValidPass1');
        await page.fill('#register-confirmPassword', 'ValidPass1');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL('http://localhost:4200/');
    });

     // Fill the form with an existing user's details
    test('should display alert when user already exists', async ({ page }) => {
        await page.goto('http://localhost:4200/register');
        await page.evaluate(() =>{
            localStorage.setItem("users", JSON.stringify([{email: "existing@example.com", password: "ValidPass1"}]));  
          } );
       
        await page.fill('#register-email', 'existing@example.com');
        await page.fill('#register-password', 'ValidPass1');
        await page.fill('#register-confirmPassword', 'ValidPass1');
        await page.click('button[type="submit"]');
        const errorMessage = page.locator('#user-exists-error', { hasText: 'User already exists!' });
        await expect(errorMessage).toBeVisible({ timeout: 5000 });

    });
 // Navigate to the registration page
    test('should validate email format and show error for invalid email', async ({ page }) => {
        await page.goto('http://localhost:4200/register');
        await page.fill('#register-email', 'invalid-email');
        await page.click('#register-password'); // Move focus out of email field
        const emailError = page.locator('text=Invalid email format.');
        await expect(emailError).toBeVisible();
    });
});
