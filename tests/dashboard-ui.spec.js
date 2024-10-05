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
  /**
   * TODO:
   *
    1. VERIFY NUMBER OF PRODUCTS PER PAGE
    2.Verify that the total product count across pages matches the total number of products.
    3. Add product to cart? MAYBE?
    4. Verify product image 
    5. verify modals
   */

  test('First page should have max number of products', async () => {
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

  test.only('Get product from page', async ({ page }) => {
    //Waits
    await page.waitForLoadState('networkidle');
    //Extract product information
    const productCards = await page.locator(
      dashboard['productCard']['attributeLocator']
    );
    const productCard = await productCards.nth(1);
    console.log('Products Title', productCard);
    console.log('Products Title');
    console.log('Products Title');

    console.log('product', await productCards.nth(1).getByTitle());
  });
  test.afterEach('Logout', async ({ page }) => {
    //Logout user
    await loginPage.logoutUser(page);
  });
});
