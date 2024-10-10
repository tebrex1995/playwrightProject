import { test, expect } from '@playwright/test';
import {
  URLS,
  HEADINGS,
  EXISTING_USER,
  utils,
  INVALID_USER,
} from '../fixtures';
import { LoginPage, Dashboard, Common } from '../POM/modules/ui';

test.describe('Login UI tests', () => {
  let loginPage, common, dashboard;

  test.beforeEach('Visit Home Page and instantiate class', async ({ page }) => {
    await page.goto(`${URLS['LOGIN']}`);
    await expect(page).toHaveURL(`${URLS['LOGIN']}`);
    loginPage = new LoginPage(page);
    common = new Common(page);
    dashboard = new Dashboard(page);
  });

  test('Form text inputs should be editable', async () => {
    await expect(loginPage['emailInput']).toBeEditable();
    await expect(loginPage['passwordInput']).toBeEditable();
  });

  test('Form should have 2 text inputs', async ({ page }) => {
    await expect(page.locator('form input')).toHaveCount(2);
  });

  test('Form text inputs should both have id attributes', async () => {
    await expect(loginPage.emailInput).toHaveId(
      loginPage['loginInputs'][0].split('#')[1]
    );
    await expect(loginPage.passwordInput).toHaveId(
      loginPage['loginInputs'][1].split('#')[1]
    );
  });

  test('Form text inputs both should have "Placeholder" attributes', async () => {
    const emailPlaceholder = 'Email address';
    const passwordPlaceholder = 'Password';
    await expect(loginPage['emailInput']).toHaveAttribute('placeholder');
    await expect(loginPage['passwordInput']).toHaveAttribute('placeholder');
    await expect(loginPage['emailInput']).toHaveAttribute(
      'placeholder',
      emailPlaceholder
    );
    await expect(loginPage['passwordInput']).toHaveAttribute(
      'placeholder',
      passwordPlaceholder
    );
  });

  test('Form input fields should have value', async () => {
    const emailValue = `${utils.generateRandomString(5)}@test.com`;
    const passwordValue = `${utils.generateRandomString(6)}`;
    await loginPage['emailInput'].fill(emailValue);
    await expect(loginPage['emailInput']).toHaveValue(emailValue);
    await loginPage['passwordInput'].fill(passwordValue);
    await expect(loginPage['passwordInput']).toHaveValue(passwordValue);
  });

  test('Form text inputs should have same classes', async () => {
    let classesToAssert = 'w-full rounded p-inputtext p-component';
    await expect(loginPage['emailInput']).toHaveClass(classesToAssert);
    await expect(loginPage['passwordInput']).toHaveClass(classesToAssert);
  });

  test('Form text inputs should be enabled', async () => {
    await expect(loginPage.emailInput).toBeEnabled();
    await expect(loginPage['passwordInput']).toBeEnabled();
  });

  test('Form submit button should be enabled', async () => {
    await expect(loginPage['submitButton']).toBeEnabled();
  });

  test('Form inputs should be focused on click', async () => {
    await loginPage['emailInput'].click();
    await expect(loginPage['emailInput']).toBeFocused();
    await loginPage['passwordInput'].click();
    await expect(loginPage['passwordInput']).toBeFocused();
  });

  test('Form text input fields should be empty', async () => {
    await expect(loginPage['emailInput']).toBeEmpty();
    await expect(loginPage['passwordInput']).toBeEmpty();
  });

  test('Form with all elements should be in viewport', async ({ page }) => {
    await expect(page.locator('form')).toBeInViewport();
    await expect(page.locator('form input').nth(0)).toBeInViewport();
    await expect(page.locator('form input').nth(1)).toBeInViewport();
    await expect(page.locator('form button')).toBeInViewport();
  });

  test('Shouldn"t be able to login without providing data', async ({
    page,
  }) => {
    //Try login with empty input fields
    await loginPage.invalidLogin(
      page,
      INVALID_USER['ui']['login']['emptyInputFields']
    );
    //Assert
    await expect(
      page.locator(common['formInputLocators']['missingEmail'])
    ).toBeVisible();
  });

  test('Shouldn"t be able to login with email that is not registered', async ({
    page,
  }) => {
    //Try login with empty input fields
    await loginPage.invalidLogin(
      page,
      INVALID_USER['ui']['login']['wrongEmailAndPassword']
    );
    //Assert
    await expect(loginPage['wrongEmailOrPasswod']).toBeVisible();
    await expect(loginPage['heading']).toHaveText(HEADINGS['LOGIN']);
  });

  test('User should be successfully logged in', async ({ page }) => {
    //Login user
    await loginPage.loginValidUser(
      EXISTING_USER['login']['email'],
      EXISTING_USER['login']['password']
    );
    //Wait for url to load
    await page.waitForURL(URLS['DASHBOARD']);
    await page.waitForLoadState('networkidle');
    //Login assertions
    await expect(dashboard['heading']).toBeVisible();
    await expect(dashboard['iframeHeading']).toBeVisible();
  });

  test.afterEach('Logout', async ({ page }) => {
    //Logout user
    await loginPage.logoutUser(page);
  });
});
