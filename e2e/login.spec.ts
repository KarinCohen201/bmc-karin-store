import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
    test('should not allow login with missing credentials', async ({ page }) => {
        // Navigate to the login page
        await page.goto('http://localhost:4200');
        await page.click('#login-submit');
        const errorMessage = page.locator('small', { hasText: 'Please fill in both email and password.' });
        await expect(errorMessage).toBeVisible();
    });

    test('should show error for invalid credentials', async ({ page }) => {
        await page.goto('http://localhost:4200');
        await page.fill('#login-email', 'invalid@example.com');
        await page.fill('#login-password', 'wrongpassword');
        await page.click('#login-submit');
        const errorMessage = page.locator('small', { hasText: 'Invalid email or password!' });
        await expect(errorMessage).toBeVisible();  
    });

       // Fill in valid credentials
    test('should navigate to /products on successful login', async ({ page }) => {
        await page.goto('http://localhost:4200');
        await page.evaluate(() =>{
          localStorage.setItem("users", JSON.stringify([{email: "user@example.com", password: "Password123"}]));  
        } );

        await page.fill('#login-email', 'user@example.com');
        await page.fill('#login-password', 'Password123');
        await page.click('#login-submit');
        await expect(page).toHaveURL('http://localhost:4200/products');
    });

    test('should navigate to register page when clicking "Create an account"', async ({ page }) => {
        await page.goto('http://localhost:4200');
        await page.click('a.forRegister');
        await expect(page).toHaveURL('http://localhost:4200/register');
    });
});