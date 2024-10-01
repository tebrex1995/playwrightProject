import { test, expect } from '@playwright/test';
import { generateUserCredentials, HEADINGS, URLS } from '../fixtures';
import { RegisterPage } from '../POM/modules/ui/registerPage';
import { LoginPage } from '../POM/modules/ui/loginPage';

//Declare reusable variables
let loginEmail, loginPassword;

//Set serial execution
test.describe.configure({ mode: 'serial' });

test.describe('Register and Login successfully', () => {
  test.beforeEach('Visit Home Page', async ({ page }) => {
    await page.goto('/');
  });

  test('Register Successfully', async ({ page }) => {
    //Generate user data
    const { username, email, password } = generateUserCredentials(10);
    loginEmail = email;
    loginPassword = password;
    //Initiate register class
    const registerPage = new RegisterPage(page);
    //Register user with valid credentials
    await registerPage.registerValidUser(page, username, email, password);
    //Register Assertations
    await expect(registerPage.usernameLabel).toBeVisible();
    await expect(registerPage.loginRedirectLink).toBeVisible();
    await expect(registerPage.successRegisterMessage).toBeVisible();
    //Wait for url to load
    await page.waitForURL(URLS['DASHBOARD']);
    await expect(
      page.locator('span', { hasText: HEADINGS['DASHBOARD'] })
    ).toBeVisible();
    const frame = page.frameLocator('iframe');
    expect(frame.locator('h4', { hasText: HEADINGS['IFRAME'] })).toBeVisible();
  });

  test('Login Successfull', async ({ page }) => {
    //initiate login class
    const loginPage = new LoginPage(page);
    //Login user
    await loginPage.loginValidUser(page, loginEmail, loginPassword);
    //Login user assertations
    //Wait for url to load
    await page.waitForURL(URLS['DASHBOARD']);
    await expect(
      page.locator('span', { hasText: HEADINGS['DASHBOARD'] })
    ).toBeVisible();
    const frame = page.frameLocator('iframe');
    expect(frame.locator('h4', { hasText: HEADINGS['IFRAME'] })).toBeVisible();
  });

  test.afterEach('Logout', async ({ page }) => {
    //initiate login class
    const loginPage = new LoginPage(page);
    //Logout user
    await loginPage.logoutUser(page);
  });
});
