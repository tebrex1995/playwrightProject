import { test, expect } from '@playwright/test';
import { RegisterApi } from '../POM/modules/api/registerApi';
import { LoginApi } from '../POM/modules/api/loginApi';
import {
  RESPONSE_MESSAGES,
  utils,
  generateUserCredentials,
  ERRORS,
} from '../fixtures';

let loginEmail, loginPassword, loginUsername;

//Set serial execution
test.describe.configure({ mode: 'serial' });

test.describe('Register and login via Api', () => {
  test('NE - Register with all input fields emty', async ({ page }) => {
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user successfully
    const responseJson = await registerApi.registerViaApi(
      registerApi.emptyInputFields['username'],
      registerApi.emptyInputFields['email'],
      registerApi.emptyInputFields['password']
    );
    //Assertations
    expect(responseJson.errors.email).toContain(ERRORS['MISSING_EMAIL']);
    expect(responseJson.errors.username).toContain(ERRORS['MISSING_USERNAME']);
    expect(responseJson.errors.password).toContain(ERRORS['MISSING_PASSWORD']);
  });

  test('NE - Register with invalid email format', async ({ page }) => {
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user successfully
    const responseJson = await registerApi.registerViaApi(
      registerApi.invalidEmailFormat['username'],
      registerApi.invalidEmailFormat['email'],
      registerApi.invalidEmailFormat['password']
    );
    //Assertations
    expect(responseJson.message).toBe(ERRORS['INVALID_EMAIL_FORMAT']);
    expect(responseJson.errors.email).toContain(ERRORS['INVALID_EMAIL_FORMAT']);
  });

  test('NE - Register with short password', async ({ page }) => {
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user successfully
    const responseJson = await registerApi.registerViaApi(
      registerApi.shortPassword['username'],
      registerApi.shortPassword['email'],
      registerApi.shortPassword['password']
    );
    //Assertations
    expect(responseJson.message).toBe(ERRORS['SHORT_PASSWORD']);
    expect(responseJson.errors.password).toContain(ERRORS['SHORT_PASSWORD']);
  });

  test('NE - Login with empty input fields', async ({ page }) => {
    //Instantiate api login class
    const loginApi = new LoginApi(page);
    //Login registered user
    const responseJson = await loginApi.loginViaBE(
      loginApi.emptyInputFields['email'],
      loginApi.emptyInputFields['password']
    );
    //Assertations
    expect(responseJson.errors.email).toContain(ERRORS['MISSING_EMAIL']);
    expect(responseJson.errors.password).toContain(ERRORS['MISSING_PASSWORD']);
  });

  test('NE - Login with non-existing user', async ({ page }) => {
    //Instantiate api login class
    const loginApi = new LoginApi(page);
    //Login registered user
    const responseJson = await loginApi.loginViaBE(
      loginApi.nonExistingUser['email'],
      loginApi.nonExistingUser['password']
    );
    expect(responseJson.error).toBe(RESPONSE_MESSAGES['UNAUTHORIZED']);
  });

  test('Register successfully', async ({ page }) => {
    //Generate valid test data
    const { username, email, password } = generateUserCredentials(6);
    loginEmail = email;
    loginPassword = password;
    loginUsername = username;
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user successfully
    const responseJson = await registerApi.registerViaApi(
      username,
      email,
      password
    );
    //Assertations
    expect(responseJson['status']).toBe(RESPONSE_MESSAGES['STATUS_SUCCESS']);
    expect(responseJson['message']).toBe(
      RESPONSE_MESSAGES['USER_CREATED_MESSAGE']
    );
  });

  test('Register with taken email and useraname', async ({ page }) => {
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user successfully
    const responseJson = await registerApi.registerViaApi(
      loginUsername,
      loginEmail,
      loginPassword
    );
    expect(responseJson.errors.username).toContain(ERRORS['TAKEN_USERNAME']);
    expect(responseJson.errors.email).toContain(ERRORS['TAKEN_EMAIL']);
  });

  test('Login with registered user', async ({ page }) => {
    //Instantiate api login class
    const loginApi = new LoginApi(page);
    //Login registered user
    const responseJson = await loginApi.loginViaBE(loginEmail, loginPassword);
    //Assertations
    expect(responseJson['status']).toBe(RESPONSE_MESSAGES['STATUS_SUCCESS']);
  });
});
