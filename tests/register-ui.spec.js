import { test, expect } from '@playwright/test';
import { RegisterPage } from '../POM/modules/ui/registerPage';
import { LoginPage } from '../POM/modules/ui/loginPage';
import { generateUserCredentials, URLS, HEADINGS } from '../fixtures';

test.describe('Register user successfully', () => {
  test.beforeEach('Visit Home Page', async ({ page }) => {
    await page.goto('/');
  });

  test('NE - Shouldn"t be able to register without providing data', async ({
    page,
  }) => {
    //Instantiate register class
    const registerPage = new RegisterPage(page);
    //Register user with all empty input fields
    await registerPage.invalidRegister(page, registerPage.emptyInputFields);
    //Assert
    await expect(registerPage.missingUsername).toBeVisible();
    await expect(registerPage.missingEmail).toBeVisible();
    await expect(registerPage.missingPassword).toBeVisible();
    await expect(registerPage.successRegisterMessage).toBeHidden();
  });

  test('NE - Should"t be able to register with invalid email format provided', async ({
    page,
  }) => {
    //Instantiate register class
    const registerPage = new RegisterPage(page);
    //Register user with an empty email input field
    await registerPage.invalidRegister(
      page,
      registerPage.invalidEmailInInputField
    );
    //Assert
    await expect(registerPage.invalidEmailFormat).toBeVisible();
    await expect(registerPage.successRegisterMessage).toBeHidden();
  });

  test('NE - Should"t be able to register with password less than 3 characters', async ({
    page,
  }) => {
    //Instantiate register class
    const registerPage = new RegisterPage(page);
    //Register user with an empty email input field
    await registerPage.invalidRegister(page, registerPage.shortPasswordInput);
    //Assert
    await expect(registerPage.shortPassword).toBeVisible();
    await expect(registerPage.successRegisterMessage).toBeHidden();
  });

  test('Register Successfully', async ({ page }) => {
    //Generate user data
    const { username, email, password } = generateUserCredentials(10);
    //Instantiate register class
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
    await expect(
      frame.locator('h4', { hasText: HEADINGS['IFRAME'] })
    ).toBeVisible();
  });
  test.afterEach('Logout', async ({ page }) => {
    //Instantiate login class
    const loginPage = new LoginPage(page);
    //Logout user
    await loginPage.logoutUser(page);
  });
});
