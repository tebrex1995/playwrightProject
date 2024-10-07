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
      await expect(page).toHaveURL(URLS['DASHBOARD']);
    }
  );
  /**
   * TODO:
   *1. test out of stock
   2. test if button is clickable if not out of stick
   
    1. VERIFY NUMBER OF PRODUCTS PER PAGE
    2.Verify that the total product count across pages matches the total number of products.
    3. Add product to cart? MAYBE?
    4. Verify product image 
    5. verify modals
   */

  test('Products on dashboard should be on provided number of pages', async ({
    page,
  }) => {
    const pages = await dashboard.getAllPages(page);
    await expect(await pages.length).toBe(dashboard['NumberOfPages']);
  });

  test('Should be able to navigate to last page', async ({ page }) => {
    //Loop throught all pages and get last page
    const getAllPages = await dashboard.getAllPages(page);
    const lastPage = await getAllPages.length;
    //Navigate to last page
    await dashboard.navigateToPage(page, await lastPage);
    await expect(
      page.locator(`${dashboard['paginationElements'].specificPage(lastPage)}`)
    ).toHaveCSS('background-color', dashboard['activeBtnBgColor']);
  });

  test('First page should have max number of products', async ({ page }) => {
    await dashboard.navigateToPage(page, 1);
    await expect(
      dashboard['productsContainer']['productsContainerToCount']
    ).toHaveCount(dashboard['productsPerPage']);
  });

  test('First product should be visible', async ({ page }) => {
    const product = await dashboard.getProductData(page, 1);
    await expect(product['productElements']['image']).toBeVisible();
    await expect(product['productElements']['image']).toHaveRole('img');
    await expect(product['productElements']['image']).toHaveAttribute('src');
    await expect(product['productElements']['title']).toBeVisible();
    await expect(product['productElements']['description']).toBeVisible();
    await expect(product['productElements']['price']).toBeVisible();
    await expect(product['productElements']['button']).toBeVisible();
  });

  test.only('All products on dashboard should be visible', async ({ page }) => {
    await dashboard.loopProductsOnAllPages(page);
    // for (let i = 0; i < products.length; i++) {
    //   console.log(products[i]);
    // }

    expect(true).toBe(true);

    // for (const product of products) {
    //   await expect(product['productElements']['title']).toBeVisible();
    //   await expect(product['productElements']['image']).toBeVisible();
    //   await expect(product['productElements']['image']).toHaveRole('img');
    //   await expect(product['productElements']['image']).toHaveAttribute('src');
    //   await expect(product['productElements']['description']).toBeVisible();
    //   await expect(product['productElements']['price']).toBeVisible();
    //   await expect(product['productElements']['button']).toBeVisible();
    // }
  });

  test.afterEach('Logout', async ({ page }) => {
    //Logout user
    await loginPage.logoutUser(page);
  });
});
