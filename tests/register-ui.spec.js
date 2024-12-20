import { test, expect } from '@playwright/test';
import { LoginPage, RegisterPage, Dashboard, Common } from '../POM/modules/ui';
import { generateUserCredentials, URLS, INVALID_USER } from '../fixtures';

test.describe('Register user successfully', () => {
  let registerPage, loginPage, dashboard, common;

  test.beforeEach('Visit Home Page and instantiate class', async ({ page }) => {
    await page.goto(`${URLS['REGISTER']}`);
    await expect(page).toHaveURL(/.*register/);
    //Instantiate register class
    common = new Common(page);
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    dashboard = new Dashboard(page);
  });

  test('Shouldn"t be able to register without providing data', async ({
    page,
  }) => {
    //Register user with all empty input fields
    await registerPage.invalidRegister(
      page,
      INVALID_USER['ui']['register']['emptyInputFields']
    );
    //Assert
    await expect(registerPage['missingUsername']).toBeVisible();
    await expect(registerPage['missingEmail']).toBeVisible();
    await expect(registerPage['missingPassword']).toBeVisible();
    await expect(registerPage['successRegisterMessage']).toBeHidden();
  });

  test('Shouldn"t be able to register with invalid email format provided', async ({
    page,
  }) => {
    //Register user with an empty email input field
    await registerPage.invalidRegister(
      page,
      INVALID_USER['ui']['register']['invalidEmailInInputField']
    );
    //Assert
    await expect(registerPage['invalidEmailFormat']).toBeVisible();
    await expect(registerPage['successRegisterMessage']).toBeHidden();
  });

  test('Shouldn"t be able to register with password less than 3 characters', async ({
    page,
  }) => {
    //Register user with an empty email input field
    await registerPage.invalidRegister(
      page,
      INVALID_USER['ui']['register']['shortPasswordInput']
    );
    //Assert
    await expect(registerPage['shortPassword']).toBeVisible();
    await expect(registerPage['successRegisterMessage']).toBeHidden();
  });

  test('Should be Registered Successfully', async ({ page }) => {
    //Generate user data
    const { username, email, password } = generateUserCredentials(10);
    //Register user with valid credentials
    await registerPage.registerValidUser(page, username, email, password);
    //Register Assertations
    await expect(registerPage['usernameLabel']).toBeVisible();
    await expect(registerPage['loginRedirectLink']).toBeVisible();
    await expect(registerPage['successRegisterMessage']).toBeVisible();
    //Wait for url to load
    await page.waitForURL(URLS['DASHBOARD']);
    await expect(dashboard['heading']).toBeVisible();
    await expect(dashboard['iframeHeading']).toBeVisible();
  });

  test.afterEach('Logout', async ({ page }) => {
    //Logout user
    await loginPage.logoutUser(page);
  });
});
