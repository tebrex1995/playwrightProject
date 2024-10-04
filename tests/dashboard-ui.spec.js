// import { test, expect } from '@playwright/test';
// import { URLS, existingUser } from '../fixtures';
// import { LoginPage } from '../POM/modules/ui/loginPage';
// import { Common } from '../POM/modules/ui/Common';

// test.describe('Dashboard tests', () => {
//   let loginPage, common;
//   test.beforeAll('Login user & Instantiate classes', async ({ page }) => {
//     common = new Common(page);
//     loginPage = new LoginPage(page);
//     await page.goto(URLS['LOGIN']);
//     await expect(page).toHaveURL(URLS['Login']);

//     await page.loginPage.loginValidUser(
//       existingUser['email'],
//       existingUser['password']
//     );
//     await expect(common);
//     await expect(page).toHaveURL(URLS['DASHBOARD']);
//   });
// });
