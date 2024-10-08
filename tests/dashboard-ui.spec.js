import { test, expect, chromium } from '@playwright/test';
import { URLS, EXISTING_USER } from '../fixtures';
import { LoginPage, Dashboard } from '../POM/modules/ui';

test.describe('Dashboard tests', () => {
  //Declare class Variables
  let browser, context, page, dashboard, allProducts, loginPage;

  test.beforeAll(
    'Instantiate classes, open browser context, login user and get all products from pages',
    async () => {
      browser = await chromium.launch();
      context = await browser.newContext();
      page = await context.newPage();
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
      //Get all products with their data in one array
    }
  );

  /**
   * TODO:
   *1. test out of stock
   2. test if button is clickable if not out of stick
   
    2.Verify that the total product count across pages matches the total number of products.
    3. Add product to cart? MAYBE?
    4. Verify product image 
    5. verify modals
   */

  test('First product should be visible', async ({ page }) => {
    const product = await allProducts[0];
    await expect(product['productElements']['image']).toBeVisible();
    await expect(product['productElements']['image']).toHaveRole('img');
    await expect(product['productElements']['image']).toHaveAttribute('src');
    await expect(product['productElements']['title']).toBeVisible();
    await expect(product['productElements']['description']).toBeVisible();
    await expect(product['productElements']['price']).toBeVisible();
    await expect(product['productElements']['button']).toBeVisible();
  });

  test('All products on dashboard should be visible', async ({ page }) => {
    const allProducts = await dashboard.loopProductsOnAllPages(page);

    const allPages = await dashboard.getAllPages(page);
    //Define iterator for allProducts products array
    let productIndex = 0;
    // Loop through each page
    for (const pageNum of allPages) {
      // Navigate to the current page
      console.log('YOU ARE ON PAGE: ', pageNum);
      await dashboard.navigateToPage(page, pageNum);

      // Get the number of products on the current page
      const productsOnCurrentPage = await page
        .locator('[test-id="product-card"]')
        .count();
      // Loop through products on currentPage
      for (let i = 0; i < productsOnCurrentPage; i++) {
        // Compare the current product title with the title from the allProducts array
        const test = page
          .locator('[test-id="product-card"]')
          .nth(i)
          .locator('h5');
        console.log('PRODUCT TITLE::', await test.textContent());
        //Assert Each product
        await expect(
          page
            .locator(dashboard['productCard']['attributeLocator'])
            .nth(i)
            .locator(dashboard['productTitle']['partialLocator'])
        ).toHaveText(allProducts[productIndex]['textContent']['title']);

        productIndex++;
      }
    }

    await expect(allProducts.length).toBeGreaterThan(69);
  });

  test.afterEach('Logout', async ({ page }) => {
    //Logout user
    await loginPage.logoutUser(page);
  });

  test.afterAll(async () => {
    await browser.close();
  });
});
