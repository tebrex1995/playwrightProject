import { test, expect, chromium } from '@playwright/test';
import { URLS, EXISTING_USER } from '../fixtures';
import { LoginPage, Dashboard } from '../POM/modules/ui';

test.describe('Dashboard tests', () => {
  //Declare class Variables
  let dashboard, loginPage, allProducts, page, allPages, context;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    context = await browser.newContext(page);
    browser = await chromium.launch();

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
    allPages = await dashboard.getAllPages(page);
    allProducts = await dashboard.loopProductsOnAllPages(page);
  });

  test.afterEach('Logout', async () => {
    //Logout user
    await loginPage.logoutUser(page);
  });

  test.afterAll(async () => {
    //Close context
    await context.close(page);
  });

  test('All products in total should be on dashboard', async () => {
    await expect(allProducts.length).toBeGreaterThan(
      dashboard['averageSumOfProducts']
    );
  });

  test('There should be new products loaded on next page', async () => {
    //Initialize first product variable and get common locator for products
    const productOnPage = await dashboard.getAllProductsLocator(page);
    let firstProduct = await productOnPage
      .first()
      .locator(dashboard['productTitle']['partialLocator']);

    for (let i = 1; i < (await allPages.length) - 1; i++) {
      await dashboard.navigateToPage(page, i + 1);
      const currentProduct = productOnPage
        .first()
        .locator(dashboard['productTitle']['partialLocator']);
      expect(currentProduct).not.toBe(firstProduct);
      firstProduct = currentProduct;
    }
  });

  test('All elements on products on dashboard should be visible', async () => {
    //Define iterator for allProducts products array
    let productIndex = 0;
    // Loop through each page
    for (const pageNum of allPages) {
      // Navigate to the current page
      await dashboard.navigateToPage(page, await pageNum);
      //Count all products on page
      const countProductsOnPage = await dashboard.getAllProductsLocator(page);
      const productsOnCurrentPage = countProductsOnPage.count();

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

  test('All products should have modal opened with title,image and description on click', async () => {
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
        const product = await allProducts[productIndex];
        const productImage = await product['productElements']['image'];
        await expect(productImage).toHaveRole('img');
        await productImage.click();
        await expect(
          page.locator(`${dashboard['productModalTitle']['partialLocator']}`, {
            hasText: product['textContent']['title'],
          })
        ).toBeVisible();
        await expect(
          page.locator(
            `${dashboard['productModalDescription']['partialLocator']}`,
            {
              hasText: product['textContent']['description'],
            }
          )
        ).toBeVisible();
        await expect(
          page.locator(`${dashboard['productModalImage']['partialLocator']}`)
        ).toBeVisible();

        productIndex++;
        await dashboard['closeModal'].click();
      }
    }
  });
});
