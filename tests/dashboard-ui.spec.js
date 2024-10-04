import { test, expect } from '@playwright/test';
import { URLS, existingUser } from '../fixtures';
import { LoginPage, Dashboard } from '../POM/modules/ui';

test.describe('Dashboard tests', () => {
  //Declare class Variables
  let loginPage, dashboard;

  test.beforeEach(
    'Instantiate classes and login successfuly',
    async ({ page }) => {
      //Instantiate class and Visit page
      dashboard = new Dashboard(page);
      loginPage = new LoginPage(page);
      //Visit login page
      await page.goto(URLS['LOGIN']);
      await expect(page).toHaveURL(URLS['LOGIN']);
      //Login user with valid credentials
      await loginPage.loginValidUser(
        existingUser['email'],
        existingUser['password']
      );
      await expect(dashboard['heading']).toBeVisible();
      await expect(page).toHaveURL(URLS['DASHBOARD']);
    }
  );

  test('Locators ', async ({ page }) => {
    await expect(dashboard['heading']).toBeVisible();
    await expect(page.getByTestId('products-container')).toBeVisible();
  });

  test('All products have visible elements', async ({ page }) => {
    await dashboard.navigateToPage(page, 6);
  });

  test.afterEach('Logout', async ({ page }) => {
    //Logout user
    await loginPage.logoutUser(page);
  });
});
