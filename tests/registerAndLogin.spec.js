const { test, expect } = require('@playwright/test');

test.describe('Register and Login successfully', () => {
  test.beforeEach('Visit Home Page', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/');
  });

  test('Register Successfully', async ({ page }) => {
    await page.getByText('Sign up').click();
    await page.locator('#username').fill('te2s2112t212use21rname1');
    await page.locator('#email').fill('teste21ma21222i121l1@21test.com');
    await page.locator('#password').fill('testpass');
    await page.locator('button').getByText('Register').click();
  });

  test.afterEach('Logout', async ({ page }) => {
    await page.locator('.relative > div > span > .inline-flex').click();
    await page.getByText('Log Out').click();
  });
});
