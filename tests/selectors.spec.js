// const { test, expect } = require('@playwright/test');

// test.describe('test suite', () => {
//   test.beforeEach('Visit app', async ({ page }) => {
//     await page.goto('https://automaticityacademy.ngrok.app/');
//   });
//   //Full expression
//   test('Get by - full expression', async ({ page }) => {
//     await expect(
//       page.locator('span[class="text-5xl font-bold"]')
//     ).toBeVisible();
//     await expect(page.locator('span[class="text-5xl font-bold"]')).toHaveText(
//       'AQA eShop'
//     );
//   });
//   //Specific class
//   test('Get by - specific class', async ({ page }) => {
//     await expect(page.locator('.text-5xl')).toBeVisible();
//     await expect(page.locator('.text-5xl')).toHaveText('AQA eShop');
//   });
//   //Order
//   test('get by - order', async ({ page }) => {
//     //first()
//     await expect(page.locator('span').first()).toBeVisible();
//     await expect(page.locator('span').first()).toHaveText('AQA eShop');
//     //nth
//     await expect(page.locator('span').nth(0)).toBeVisible();
//     await expect(page.locator('span').nth(0)).toBeVisible();
//     await expect(page.locator('span').nth(0)).toHaveText('AQA eShop');
//   });
//   //By relation
//   test('get by - relation', async ({ page }) => {
//     await expect(
//       page.locator(
//         "div[class='col-12 mdtext-xl text-primary:t-4 sm:t-2 md:col-6 p-6'] > section > span"
//       )
//     ).toBeVisible();
//     await expect(
//       page.locator(
//         "div[class='col-12 md:t-4 sm:t-2 md:col-6 p-6'] > section > span"
//       )
//     ).toHaveText('AQA eShop');
//   });

//   test('get subheading', async ({ page }) => {
//     await expect(
//       page.locator('div[class="text-xl text-primary"]')
//     ).toBeVisible();
//     await expect(page.locator('div[class="text-xl text-primary"]')).toHaveText(
//       '...test your automation skills'
//     );

//     await expect(
//       page.locator('section[class="text-left mb-4"] > div')
//     ).toBeVisible();
//     await expect(
//       page.locator('section[class="text-left mb-4"] > div')
//     ).toHaveText('...test your automation skills');
//   });

//   //Playwright build-in locators
//   test('get by - Text', async ({ page }) => {
//     await expect(page.getByText('AQA eShop')).toBeVisible();
//   });

//   test('get by - Role', async ({ page }) => {
//     await page.getByRole('link', { name: 'Log in' }).click();
//     await expect(page.locator('h1')).toHaveText('Welcome Back! 👋🏻');
//   });

//   test('Get by - Label', async ({ page }) => {
//     await page.getByRole('link', { name: 'Log in' }).click();
//     await expect(page.locator('h1')).toHaveText('Welcome Back! 👋🏻');

//     await expect(page.getByLabel('Sign In')).toBeVisible();
//   });
// });
