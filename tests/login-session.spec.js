import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/modules/ui';
import { EXISTING_USER, HEADINGS, URLS } from '../fixtures';

let webContext;

test.describe('Test saved state', () => {
  test.beforeAll('Create context and log in', async ({ browser }) => {
    //Initialize context
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await page.route(
      `**/api/v1/auth${URLS['LOGIN']}`,
      async (route, request) => {
        console.log('DATA', request.postData());

        await route.continue();
      }
    );
    await page.route('**/api/v1/auth/*', async (route, request) => {
      console.log('DATA', request.url());

      await route.continue();
    });
    //UI Login
    await page.goto(URLS['LOGIN']);
    await loginPage.loginValidUser(
      page,
      EXISTING_USER['login']['email'],
      EXISTING_USER['login']['password']
    );

    //Save state
    await context.storageState({ path: 'state.json' });

    //Inject state
    webContext = await browser.newContext({ storageState: 'state.json' });
  });

  test.only('', async () => {
    const page = await webContext.newPage();
    await page.goto(URLS['DASHBOARD']);

    await expect(page.getByText(HEADINGS['DASHBOARD'])).toBeVisible();
  });
});
