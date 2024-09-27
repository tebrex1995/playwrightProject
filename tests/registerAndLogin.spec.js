const { test, expect } = require('@playwright/test');
const userData = require('../fixtures/userData');
const { RegisterPage } = require('../POM/ui/registerPage');
const { LoginPage } = require('../POM/ui/loginPage');

test.describe('Register and Login successfully', () => {
  //Get valid user data
  const { username, email, password } = userData.validUser();

  test.beforeEach('Visit Home Page', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/');
  });

  test('Register Successfully', async ({ page }) => {
    const onRegisterPage = new RegisterPage(page);
    await onRegisterPage.registerValidUser(username, email, password);
  });

  test('Login Successfull', async ({ page }) => {
    const onLoginPage = new LoginPage(page);
    await onLoginPage.loginValidUser(email, password);
  });

  test.afterEach('Logout', async ({ page }) => {
    await page.locator('.relative > div > span > .inline-flex').click();
    await page.getByText('Log Out').click();
  });
});
