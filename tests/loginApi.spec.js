import { test, expect } from '@playwright/test';
import { LoginApi } from '../POM/modules/api/loginApi';
import { STATUS, EXISTING_USER, ERRORS, INVALID_USER } from '../fixtures';

test.describe('Login via API', () => {
  let loginApi;

  test.beforeEach('Instantiate class', async ({ page }) => {
    loginApi = new LoginApi(page);
  });

  test("Shouldn't be able to login without provided data", async () => {
    // //Login registered user
    const responseJson = await loginApi.login(
      INVALID_USER['api']['login']['emptyInputFields']
    );
    // Assertations;
    expect(responseJson['errors']['email']).toContain(
      ERRORS['LOGIN']['MISSING_EMAIL']
    );
    expect(responseJson['errors']['password']).toContain(
      ERRORS['LOGIN']['MISSING_PASSWORD']
    );
  });

  test("Shouldn't be able to login with not registered user", async () => {
    //Login registered user
    const responseJson = await loginApi.login(
      INVALID_USER['api']['login']['nonEXISTING_USER']
    );
    expect(responseJson['error']).toBe(STATUS['UNAUTHORIZED']);
  });

  test('Login with registered user', async () => {
    //Login registered user
    const responseJson = await loginApi.login(EXISTING_USER['login']);
    //Assertations
    expect(responseJson['status']).toBe(STATUS['STATUS_SUCCESS']);
    expect(responseJson['user']['email']).toBe(EXISTING_USER['login']['email']);
  });
});
