import { test, expect } from '@playwright/test';
import { generateUserCredentials, HEADINGS } from '../fixtures';
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
    //Initiate register class
    const registerPage = new RegisterPage(page);
    //Register user with valid credentials
    await registerPage.registerValidUser(username, email, password);
    //Register Assertations
    await expect(registerPage.usernameLabel).toBeVisible();
    await expect(registerPage.loginRedirectLink).toBeVisible();
    await expect(registerPage.successRegisterMessage).toBeVisible();
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
    await loginPage.loginValidUser(email, password);
    //Login user assertations
    await expect(
      page.locator('span', { hasText: HEADINGS['DASHBOARD'] })
    ).toBeVisible();
    expect(
      page.frameLocator('iframe', { hasText: HEADINGS['IFRAME'] })
    ).toBeVisible();
  });

  test.afterEach('Logout', async ({ page }) => {
    //initiate login class
    const loginPage = new LoginPage(page);
    //Logout user
    await loginPage.logoutUser();
  });
});
