const { test, expect } = require('@playwright/test');

test.describe('Sample App end-to-end', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Sample Full-Stack Application' })).toBeVisible();
  });

  test('loads users from the backend on the default tab', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Users (5)' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'John Doe' })).toBeVisible();
    await expect(page.locator('.card')).toHaveCount(5);
    await expect(page.locator('.error')).toHaveCount(0);
  });

  test('switches to the Posts tab and shows posts', async ({ page }) => {
    // Precondition: on Users tab.
    await expect(page.getByRole('heading', { name: 'Users (5)' })).toBeVisible();

    await page.getByRole('button', { name: 'Posts' }).click();

    await expect(page.getByRole('heading', { name: 'Posts (5)' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Getting Started with Express' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Users (5)' })).toHaveCount(0);
  });

  test('re-fetches data when Refresh Data is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Posts' }).click();
    await expect(page.getByRole('heading', { name: 'Posts (5)' })).toBeVisible();

    await page.getByRole('button', { name: 'Refresh Data' }).click();

    // Data stays populated and no error banner appears after refresh.
    await expect(page.getByRole('heading', { name: 'Posts (5)' })).toBeVisible();
    await expect(page.locator('.card')).toHaveCount(5);
    await expect(page.locator('.error')).toHaveCount(0);
  });
});
