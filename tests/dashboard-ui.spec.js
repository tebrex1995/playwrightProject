import { test, expect, chromium } from '@playwright/test';
import { URLS, EXISTING_USER } from '../fixtures';
import { LoginPage, Dashboard } from '../POM/modules/ui';

test.describe('Dashboard tests', () => {
  //Declare class Variables
  let dashboard, loginPage, allProducts;

  test.beforeEach('Instantiate class and login user', async ({ page }) => {
    //Instantiate class and Visit page
    dashboard = new Dashboard(page);
    loginPage = new LoginPage(page);
    await page.goto(URLS['LOGIN']);
    await expect(page).toHaveURL(URLS['LOGIN']);
    //Login user with valid credentials
    await loginPage.loginValidUser(
      EXISTING_USER['login']['email'],
      EXISTING_USER['login']['password']
    );
    await expect(page).toHaveURL(URLS['DASHBOARD']);
    allProducts = await dashboard.loopProductsOnAllPages(page);
  });

  /**
   * TODO:
   *1. test out of stock
   2. test if button is clickable if not out of stick
   
    3. Add product to cart? MAYBE?
    5. verify modals
   */

  test('All products should exist on page', async ({ page }) => {
    await expect(allProducts.length).toBeGreaterThan(69);
  });

  test('All elements on products on dashboard should be visible', async ({
    page,
  }) => {
    //Get all products with their data in one array
    const allPages = await dashboard.getAllPages(page);
    //Define iterator for allProducts products array
    let productIndex = 0;
    // Loop through each page
    for (const pageNum of allPages) {
      // Navigate to the current page
      await dashboard.navigateToPage(page, await pageNum);
      // Get the number of products on the current page
      const productsOnCurrentPage = await page
        .locator(dashboard['productCard']['attributeLocator'])
        .count();
      // Loop through products on currentPage
      for (let i = 0; i < productsOnCurrentPage; i++) {
        // Compare the current product title with the title from the allProducts array
        //Assert Each product
        const product = allProducts[i];
        await expect(product['productElements']['title']).toBeVisible();
        await expect(product['productElements']['image']).toBeVisible();
        await expect(product['productElements']['image']).toHaveRole('img');
        await expect(product['productElements']['image']).toHaveAttribute(
          'src'
        );
        await expect(product['productElements']['description']).toBeVisible();
        await expect(product['productElements']['price']).toBeVisible();
        await expect(product['productElements']['button']).toBeVisible();
        productIndex++;
      }
    }
  });

  test.afterEach('Logout', async ({ page }) => {
    //Logout user
    await loginPage.logoutUser(page);
  });
});
