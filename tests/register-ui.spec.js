import { test, expect } from '@playwright/test';
<<<<<<< HEAD
import { LoginPage, RegisterPage, Dashboard } from '../POM/modules/ui';
import { generateUserCredentials, URLS, invalidUsers } from '../fixtures';

test.describe('Register user successfully', () => {
  let registerPage, loginPage, dashboard;

=======
import { RegisterPage, LoginPage, Common, Dashboard } from '../POM/modules/ui';
import { generateUserCredentials, URLS } from '../fixtures';

test.describe('Register user successfully', () => {
  let registerPage, loginPage, common, dashboard;
>>>>>>> a8dbd3b5a0a01db1172e4c1f1817b1cb98b115c5
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
<<<<<<< HEAD
    await registerPage.invalidRegister(
      page,
      invalidUsers['ui']['register']['emptyInputFields']
    );
=======
    await registerPage.invalidRegister(page, registerPage['emptyInputFields']);
>>>>>>> a8dbd3b5a0a01db1172e4c1f1817b1cb98b115c5
    //Assert
    await expect(registerPage['missingUsername']).toBeVisible();
    await expect(registerPage['missingEmail']).toBeVisible();
    await expect(registerPage['missingPassword']).toBeVisible();
    await expect(registerPage['successRegisterMessage']).toBeHidden();
  });

  test('Should"t be able to register with invalid email format provided', async ({
    page,
  }) => {
    //Register user with an empty email input field
    await registerPage.invalidRegister(
      page,
<<<<<<< HEAD
      invalidUsers['ui']['register']['invalidEmailInInputField']
=======
      registerPage['invalidEmailInInputField']
>>>>>>> a8dbd3b5a0a01db1172e4c1f1817b1cb98b115c5
    );
    //Assert
    await expect(registerPage['invalidEmailFormat']).toBeVisible();
    await expect(registerPage['successRegisterMessage']).toBeHidden();
  });

  test('Should"t be able to register with password less than 3 characters', async ({
    page,
  }) => {
    //Register user with an empty email input field
    await registerPage.invalidRegister(
      page,
<<<<<<< HEAD
      invalidUsers['ui']['register']['shortPasswordInput']
=======
      registerPage['shortPasswordInput']
>>>>>>> a8dbd3b5a0a01db1172e4c1f1817b1cb98b115c5
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
