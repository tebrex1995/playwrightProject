const { test, expect } = require('@playwright/test');
const userData = require('../fixtures/userData');
const { RegisterPage } = require('../POM/ui/registerPage');
const { LoginPage } = require('../POM/ui/loginPage');

test.describe('Register and Login successfully', () => {
  const validUsername = `aleksa${Math.floor(Math.random() * 100000) + 1}`;
  const validEmail = `aleksa+${
    Math.floor(Math.random() * 100000) + 1
  }@gmail.com`;
  const validPassword = 'test123';

  test.beforeEach('Visit Home Page', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/');
  });

  test('Register Successfully', async ({ page }) => {
    const onRegisterPage = new RegisterPage(page);
    await onRegisterPage.registerValidUser(
      validUsername,
      validEmail,
      validPassword
    );
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
    const onLoginPage = new LoginPage(page);
    await onLoginPage.loginValidUser(validEmail, validPassword);

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
