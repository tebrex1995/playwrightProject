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
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(URLS['DASHBOARD']);
    allPages = await dashboard.getAllPages(page);
    allProducts = await dashboard.loopProductsOnAllPages(page);
  });

  test.afterAll(async () => {
    //Close context
    await context.close(page);
  });

  //Clear cart before each test
  test.beforeEach('Clear card', async () => {
    await cart.clearCart();
    await expect(header['cartButton']).toHaveText(cart['emptyCart']);
  });

  //Clear cart after each test
  test.afterEach('Clear card', async () => {
    await cart.clearCart();
    await expect(header['cartButton']).toHaveText(cart['emptyCart']);
  });

  test('1 product should be added to cart', async () => {
    await cart.addToCart(page);
    await expect(header['cartButton']).toHaveText(cart['oneItem']);
    await expect(page.locator(cart['productTitle'])).toBeVisible();
    await expect(page.locator(cart['productPrice'])).toBeVisible();
  });

  test('2 products should be added to cart', async () => {
    await cart.addToCart(page);
    await cart.addToCart(page);
    await expect(header['cartButton']).toHaveText(cart['twoItems']);
  });

  test('Add and remove quantity of products', async () => {
    await cart.addToCart(page);
    await header.cartButton.click();
    await expect(header['cartButton']).toHaveText(cart['oneItem']);
    await cart.addQuantity(page);
    await expect(page.locator(cart.productQuantity)).toHaveText(
      `Quantity: ${cart['twoItems']}`
    );
    await cart.subtractQuantity(page);
    await expect(page.locator(cart.productQuantity)).toHaveText(
      `Quantity: ${cart['oneItem']}`
    );
    await header.cartButton.click();
  });

  test('Price in cart should be correct when products are added', async () => {
    const addProduct = await cart.addToCart(page);
    //Get price in cart
    const priceInCart = page.locator(cart.productPrice);
    await expect(await priceInCart).toHaveText(await addProduct);
  });
});
