import { test, expect } from '@playwright/test';
import { URLS, existingUser, utils } from '../fixtures';
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

  test('First page should have max number of products', async ({ page }) => {
    // await dashboard.navigateToPage(page, 6);
    await expect(dashboard['productsContainerToCount']).toHaveCount(
      dashboard['productsPerPage']
    );
  });

  test('Products on dashboard should be on provided number of pages', async ({
    page,
  }) => {
    const pages = await dashboard.getNumberOfPages(page);
    await expect(pages.length).toBe(dashboard['NumberOfPages']);
  });

  test('Should be able to navigate to last page', async ({ page }) => {
    //Loop throught all pages and get last page
    const getNumberOfPages = await dashboard.getNumberOfPages(page);
    const lastPage = await getNumberOfPages.length;
    //Navigate to last page
    await dashboard.navigateToPage(page, lastPage);
    await expect(
      page.locator(`${dashboard['paginationElements'].specificPage(lastPage)}`)
    ).toHaveCSS('background-color', dashboard['activeBtnBgColor']);
  });

  test.afterEach('Logout', async ({ page }) => {
    //Logout user
    await loginPage.logoutUser(page);
  });
});
