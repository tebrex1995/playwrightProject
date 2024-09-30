import { test, expect } from '@playwright/test';
import { generateUserCredentials } from '../fixtures/userData';
import { RegisterPage } from '../POM/modules/ui/registerPage';
import { LoginPage } from '../POM/modules/ui/loginPage';

test.describe.configure({ mode: 'serial' });
test.describe('Register and Login successfully', () => {
  //Get user data
  const { username, email, password } = generateUserCredentials(5);
  test.beforeEach('Visit Home Page', async ({ page }) => {
    await page.goto('/');
  });

  test('Register Successfully', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.registerValidUser(username, email, password);
    await expect(page.locator('label', { hasText: 'Username' })).toBeVisible();
    await expect(
      page.locator('span', { hasText: 'Already have an account?' })
    ).toBeVisible();
    await expect(page.getByText('Successfully registered!')).toBeVisible();
    await expect(
      page.locator('span', { hasText: 'Buy some stuff bruh' })
    ).toBeVisible();
    const frame = page.frameLocator('iframe');
    expect(frame.locator('h4', { hasText: 'Today deals:' })).toBeVisible();
  });

  test('Login Successfull', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginValidUser(email, password);

    await expect(
      page.locator('span', { hasText: 'Buy some stuff bruh' })
    ).toBeVisible();
    const frame = page.frameLocator('iframe');
    expect(frame.locator('h4', { hasText: 'Today deals:' })).toBeVisible();
  });

  test.afterEach('Logout', async ({ page }) => {
    await page.locator('.relative > div > span > .inline-flex').click();
    await page.getByText('Log Out').click();
  });
});
