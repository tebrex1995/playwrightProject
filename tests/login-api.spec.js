import { test, expect } from '@playwright/test';
import { LoginApi } from '../POM/modules/api/loginApi';
import { RESPONSE_MESSAGES, existingUser, ERRORS } from '../fixtures';

test.describe('Login via API', () => {
  test('NE - Shouldn"t be able to login without provided data', async ({
    page,
  }) => {
    //Instantiate api login class
    const loginApi = new LoginApi(page);
    //Login registered user
    const responseJson = await loginApi.loginViaBE(
      loginApi.emptyInputFields['email'],
      loginApi.emptyInputFields['password']
    );
    //Assertations
    expect(responseJson['errors']['email']).toContain(
      ERRORS['LOGIN']['MISSING_EMAIL']
    );
    expect(responseJson['errors']['password']).toContain(
      ERRORS['LOGIN']['MISSING_PASSWORD']
    );
  });
  test('NE - Shouldn"t be able to login with not registered user', async ({
    page,
  }) => {
    //Instantiate api login class
    const loginApi = new LoginApi(page);
    //Login registered user
    const responseJson = await loginApi.loginViaBE(
      loginApi.nonExistingUser['email'],
      loginApi.nonExistingUser['password']
    );
    expect(responseJson['error']).toBe(RESPONSE_MESSAGES['UNAUTHORIZED']);
  });
  test('Login with registerd user', async ({ page }) => {
    //Instantiate api login class
    const loginApi = new LoginApi(page);
    //Login registered user
    const responseJson = await loginApi.loginViaBE(
      existingUser.email,
      existingUser.password
    );
    //Assertations
    expect(responseJson['status']).toBe(RESPONSE_MESSAGES['STATUS_SUCCESS']);
  });
});
