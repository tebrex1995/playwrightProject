import { test, expect } from '@playwright/test';
import { URLS, existingUser } from '../fixtures';
import { LoginPage } from '../POM/modules/ui/loginPage';
import { Common } from '../POM/modules/ui/Common';

test.describe('Dashboard tests', () => {
  //Declare class Variables
  let loginPage, common;

  test.beforeEach(
    'Instantiate classes and login successfuly',
    async ({ page }) => {
      //Instantiate class and Visit page
      common = new Common(page);
      loginPage = new LoginPage(page);
      //Visit login page
      await page.goto(URLS['LOGIN']);
      await expect(page).toHaveURL(URLS['LOGIN']);
      //Login user with valid credentials
      await loginPage.loginValidUser(
        existingUser['email'],
        existingUser['password']
      );
      await expect(common['dashboardLocators']['headingSpan']).toBeVisible();
      await expect(page).toHaveURL(URLS['DASHBOARD']);
    }
  );

  test('Locators ', async ({ page }) => {
    //Get 1 card

    await expect(common['dashboardLocators']['headingSpan']).toBeVisible();
    await expect(page.getByTestId('products-container')).toBeVisible();
  });

  test.afterEach('Logout', async ({ page }) => {
    //Logout user
    await loginPage.logoutUser(page);
  });
});
