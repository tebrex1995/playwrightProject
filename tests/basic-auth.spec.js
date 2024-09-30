import { test, expect } from '@playwright/test';
import { generateUserCredentials, utils, HEADINGS, URLS } from '../fixtures/';
import { LoginPage } from '../POM/modules/ui/loginPage';
import { RegisterPage } from '../POM/modules/ui/registerPage';

let loginEmail, loginPassword;

test.describe.configure({ mode: 'serial' });
test.describe('Register a user and log in', () => {
  test('Register a user with valid data', async ({ page }) => {
    const { username, email, password } = generateUserCredentials(10);
    loginEmail = email;
    loginPassword = password;
    //Initiate POM class
    const registerPage = new RegisterPage();

    await page.goto(URLS['REGISTER']);
    await expect(page.locator(registerPage.heading)).toBeVisible();
    await expect(page.locator(registerPage.heading)).toHaveText(
      HEADINGS['REGISTER']
    );

    //Fill in form and submit
    registerPage.registerValidUser(username, email, password);
    //wait for and Verify redirect
    await page.waitForURL(URLS['DASHBOARD']);
    await expect(page.getByText(HEADINGS['DASHBOARD'])).toBeVisible();
  });

  test('Login with registered user', async ({ page }) => {
    //Initiate login class
    const loginPage = new LoginPage();
    //Visit app and validate
    await page.goto(URLS['LOGIN']);
    await expect(page.locator(loginPage.heading)).toBeVisible();
    await expect(page.locator(loginPage.heading)).toHaveText(HEADINGS['LOGIN']);

    //Fill in form and submit
    await loginPage.loginValidUser(loginEmail, loginPassword);

    //wait for and Verify redirect
    await page.waitForURL(URLS['DASHBOARD']);

    await expect(page.getByText(HEADINGS['DASHBOARD'])).toBeVisible();
  });
});
