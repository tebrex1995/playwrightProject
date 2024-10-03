import { test, expect } from '@playwright/test';
import { RegisterApi } from '../POM/modules/api/registerApi';
import { LoginApi } from '../POM/modules/api/loginApi';
import { RESPONSE_MESSAGES, utils, generateUserCredentials } from '../fixtures';

let loginEmail, loginPassword;

test.describe('Regiter and login via Api', () => {
  test('Register successfully', async ({ page }) => {
    //Generate valid test data
    const { username, email, password } = generateUserCredentials(6);
    loginEmail = email;
    loginPassword = password;
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user successfully
    const responseJson = await registerApi.registerViaApi(
      username,
      email,
      password
    );
    // const token = responseJson.token;
    //Assertations
    console.log(responseJson);
    expect(responseJson['status']).toBe(RESPONSE_MESSAGES['STATUS_SUCCESS']);
    expect(responseJson['message']).toBe(
      RESPONSE_MESSAGES['USER_CREATED_MESSAGE']
    );
  });

  test('Login with registered user', async ({ page }) => {
    //Instantiate api login class
    const loginApi = new LoginApi(page);
    //Login registered user
    const responseJson = await loginApi.loginViaBE(loginEmail, loginPassword);
    //Assertations
    console.log(responseJson);
    expect(responseJson['status']).toBe(RESPONSE_MESSAGES['STATUS_SUCCESS']);
  });
});
