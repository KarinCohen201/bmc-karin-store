import { test, expect } from '@playwright/test';

test.describe('Cart Functionality', () => {
  const validEmail = 'user@example.com';
  const validPassword = 'SecurePass123!';
  const baseURL = 'http://localhost:4200';

  test.beforeEach(async ({ page }) => {
    // Set the loggedInUser in localStorage
    await page.goto(baseURL); // Navigate to the base URL to access localStorage
    await page.evaluate(({ email, password }) => {
      localStorage.setItem('loggedInUser', JSON.stringify({ email, password }));
    }, { email: validEmail, password: validPassword });
  });

  test('should add a product to cart and verify it appears', async ({ page }) => {
    // Navigate to the product list page
    await page.goto(`${baseURL}/products`);

    // Add a product to the cart
    const addToCartButton = await page.locator('#add-to-cart-button').first();
    await addToCartButton.click();

    // Navigate to the shopping cart page
    await page.goto(`${baseURL}/cart`);

    // Verify the product appears in the cart
    const cartItems = await page.locator('tbody tr');
    await expect(cartItems).toHaveCount(1);

    // Verify product details
    const productName = await page.locator('tbody tr td:nth-child(2)').first();
    const productPrice = await page.locator('tbody tr td:nth-child(5)').first();
    await expect(productName).toBeVisible();
    await expect(productPrice).toBeVisible();
  });

  test('should calculate the total price correctly', async ({ page }) => {
    // Add multiple products to the cart
    await page.goto(`${baseURL}/products`);
    const addToCartButtons = await page.locator('#add-to-cart-button');
    await addToCartButtons.nth(0).click();
    await addToCartButtons.nth(1).click();

    // Navigate to the cart page
    await page.goto(`${baseURL}/cart`);

    // Verify total price calculation
    const totalPriceElement = await page.locator('h5:has-text("Total:")');
    await expect(totalPriceElement).toContainText('$');
  });

  test('should clear the cart when "Clear All" is clicked', async ({ page }) => {
    // Add a product to the cart
    await page.goto(`${baseURL}/products`);
    const addToCartButton = await page.locator('#add-to-cart-button').first();
    await addToCartButton.click();

    // Navigate to the cart
    await page.goto(`${baseURL}/cart`);

    // Click the "Clear All" button
    const clearAllButton = await page.locator('button.btn-danger:has-text("Clear All")');
    await clearAllButton.click();

    // Verify the cart is empty
    const emptyCartMessage = await page.locator('h4:has-text("Your cart is empty!")');
    await expect(emptyCartMessage).toBeVisible();
  });

  test('should persist cart items after logout and login', async ({ page }) => {
    // Add a product to the cart
    await page.goto(`${baseURL}/products`);
    const addToCartButton = await page.locator('#add-to-cart-button').first();
    await addToCartButton.click();
  
    // Verify the product appears in the cart
    await page.goto(`${baseURL}/cart`);
    const cartItemsBeforeLogout = await page.locator('tbody tr').count();
    expect(cartItemsBeforeLogout).toBe(1);
  
    // Log out using the updated logout button
    const logoutButton = await page.locator('#logOutBtn'); // Use the updated ID for the logout button
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();
  
    // Log back in
    await page.evaluate(({ email, password }) => {
      localStorage.setItem('loggedInUser', JSON.stringify({ email, password }));
    }, { email: validEmail, password: validPassword });
  
    // Navigate back to the cart
    await page.goto(`${baseURL}/cart`);
    const cartItemsAfterLogin = await page.locator('tbody tr').count();
    expect(cartItemsAfterLogin).toBe(1);
  });
  
});
