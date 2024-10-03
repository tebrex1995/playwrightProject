import { test, expect } from '@playwright/test';
import { URLS, HEADINGS, existingUser } from '../fixtures';
import { RegisterPage } from '../POM/modules/ui/registerPage.js';
import { LoginPage } from '../POM/modules/ui/loginPage.js';

test.describe('Login UI tests', () => {
  test.beforeEach('Visit Home Page', async ({ page }) => {
    await page.goto('/');
  });

  test('NE -Shouldn"t be able to login without providing data', async ({
    page,
  }) => {
    //Instantiate  classes
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    //Try login with empty input fields
    await loginPage.invalidLogin(page, loginPage.emptyInputFields);
    //Assert
    await expect(registerPage.missingEmail).toBeVisible();
    await expect(loginPage.missingPassword).toBeVisible();
  });

  test('NE - Shouldn"t be able to login with email that is not registered', async ({
    page,
  }) => {
    //Instantiate  classes
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    //Try login with empty input fields
    await loginPage.invalidLogin(page, loginPage.wrongEmailAndPassword);
    //Assert
    await expect(loginPage.wrongEmailOrPasswod).toBeVisible();
    await expect(loginPage.heading).toHaveText(HEADINGS['LOGIN']);
  });
  test('Login Successfull', async ({ page }) => {
    //Instantiate login class
    const loginPage = new LoginPage(page);
    //Login user
    await loginPage.loginValidUser(
      page,
      existingUser.email,
      existingUser.password
    );
    //Wait for url to load
    await page.waitForURL(URLS['DASHBOARD']);
    //Login assertions
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
