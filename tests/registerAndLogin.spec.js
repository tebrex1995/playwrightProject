const { test, expect } = require('@playwright/test');
const userData = require('../fixtures/userData.json');

test.describe('Register and Login successfully', () => {
  test.beforeEach('Visit Home Page', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/');
  });

  test.afterEach('Logout', async ({ page }) => {
    await page.locator('.relative > div > span > .inline-flex').click();
    await page.getByText('Log Out').click();
  });

  test('Register Successfully', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#username').fill('te2s21212t212use21rname1');
    await page.locator('#email').fill('teste21ma221222i121l1@21test.com');
    await page.locator('#password').fill('testpass');
    await page.getByRole('button', { name: 'Register' }).click();
  });

  test('Login Successfull', async ({ page }) => {
    await page.locator('#loginBtn').click();
    await page.locator('#email').fill('test@test.com');
    await page.locator('#password').fill('test123');
    await page.getByRole('button', { name: 'Sign In' }).click();
  });
});
