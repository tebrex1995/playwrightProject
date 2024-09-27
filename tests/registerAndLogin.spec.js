const { test, expect } = require('@playwright/test');

test.describe('Register and Login successfully', () => {
  test.beforeEach('Visit Home Page', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/');
  });

  test('Register Successfully', async ({ page }) => {
    await page.getByText('Sign up').click();
    await page.locator('#username').fill('testusername1');
    await page.locator('#email').fill('testemail1@test.com');
    await page.locator('#password').fill('testpass');
    await page.locator('button').getByText('Register').click();
  });
});
