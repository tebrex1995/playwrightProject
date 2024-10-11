import { test, expect, chromium } from '@playwright/test';
import { LoginPage, Dashboard, Cart, Header } from '../POM/modules/ui';
import { URLS, EXISTING_USER } from '../fixtures';

test.describe.configure({ mode: 'serial' });
test.describe('Products in the cart', () => {
  //Declare class Variables
  let dashboard, loginPage, allProducts, page, allPages, context, cart, header;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    context = await browser.newContext(page);
    browser = await chromium.launch();
    //Instantiate class and Visit page
    dashboard = new Dashboard(page);
    loginPage = new LoginPage(page);
    cart = new Cart(page);
    header = new Header(page);
    await page.goto(URLS['LOGIN']);
    await expect(page).toHaveURL(URLS['LOGIN']);
    //Login user with valid credentials
    await loginPage.loginValidUser(
      EXISTING_USER['login']['email'],
      EXISTING_USER['login']['password']
    );
    await expect(page).toHaveURL(URLS['DASHBOARD']);
    allPages = await dashboard.getAllPages(page);
    allProducts = await dashboard.loopProductsOnAllPages(page);
  });

  test.afterAll(async () => {
    //Logout
    await loginPage.logoutUser(page);
    //Close context
    await context.close(page);
  });

  test.beforeEach('Clear card', async () => {
    await cart.clearCart();
    await expect(header.cartButton).toHaveText('0');
  });

  test.afterEach('Clear card', async () => {
    await cart.clearCart();
    await expect(header.cartButton).toHaveText('0');
  });

  test('1 product should be added to cart', async () => {
    await cart.addToCart(page);
    await expect(header.cartButton).toHaveText('1');
  });

  test('Product should be removed from the cart', async () => {
    await cart.addToCart(page);
    await cart.removeProduct(page);
    await expect(header.cartButton).toHaveText('0');
  });

  test('2 products should be added to cart', async () => {
    await cart.addToCart(page);
    await cart.addToCart(page);
    await expect(header.cartButton).toHaveText('2');
  });
});
