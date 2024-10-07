import { test, expect } from '@playwright/test';
import { LoginApi } from '../POM/modules/api/loginApi';
import {
  RESPONSE_MESSAGES,
  existingUser,
  ERRORS,
  invalidUsers,
} from '../fixtures';

test.describe('Login via API', () => {
  let loginApi;

  test.beforeEach('Instantiate class', async ({ page }) => {
    loginApi = new LoginApi(page);
  });

  test("Shouldn't be able to login without provided data", async () => {
    //Login registered user
    const responseJson = await loginApi.loginViaBE(
      invalidUsers['api']['emptyInputFields']['email'],
      invalidUsers['api']['emptyInputFields']['password']
    );
    //Assertations
    expect(responseJson['errors']['email']).toContain(
      ERRORS['LOGIN']['MISSING_EMAIL']
    );
    expect(responseJson['errors']['password']).toContain(
      ERRORS['LOGIN']['MISSING_PASSWORD']
    );
  });

  test("Shouldn't be able to login with not registered user", async () => {
    //Login registered user
    const responseJson = await loginApi.loginViaBE(
      invalidUsers['api']['nonExistingUser']['email'],
      invalidUsers['api']['nonExistingUser']['password']
    );
    expect(responseJson['error']).toBe(RESPONSE_MESSAGES['UNAUTHORIZED']);
  });

  test('Login with registered user', async () => {
    //Login registered user
    const responseJson = await loginApi.loginViaBE(
      existingUser['email'],
      existingUser['password']
    );
    //Assertations
    expect(responseJson['status']).toBe(RESPONSE_MESSAGES['STATUS_SUCCESS']);
  });
});
