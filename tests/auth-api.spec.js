import { test, expect } from '@playwright/test';
import { RegisterApi } from '../POM/modules/api/registerApi';
import { LoginApi } from '../POM/modules/api/loginApi';
import {
  RESPONSE_MESSAGES,
  generateUserCredentials,
  ERRORS,
} from '../fixtures';

//Declare reusable variables
let loginEmail, loginPassword, loginUsername;

//Set serial execution
test.describe.configure({ mode: 'serial' });

test.describe('Register and login via Api', () => {
  test('NE - Shouldn"t be able to register without provided data', async ({
    page,
  }) => {
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user successfully
    const responseJson = await registerApi.registerViaApi(
      registerApi.emptyInputFields['username'],
      registerApi.emptyInputFields['email'],
      registerApi.emptyInputFields['password']
    );
    //Assertations
    expect(responseJson['errors']['email']).toContain(
      ERRORS['REGISTER']['MISSING_EMAIL']
    );
    expect(responseJson['errors']['username']).toContain(
      ERRORS['REGISTER']['MISSING_USERNAME']
    );
    expect(responseJson['errors']['password']).toContain(
      ERRORS['REGISTER']['MISSING_PASSWORD']
    );
  });

  test('NE - Shouldn"t be able to register with invalid email format', async ({
    page,
  }) => {
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user successfully
    const responseJson = await registerApi.registerViaApi(
      registerApi.invalidEmailFormat['username'],
      registerApi.invalidEmailFormat['email'],
      registerApi.invalidEmailFormat['password']
    );
    //Assertations
    expect(responseJson['message']).toBe(
      ERRORS['REGISTER']['INVALID_EMAIL_FORMAT']
    );
    expect(responseJson['errors']['email']).toContain(
      ERRORS['REGISTER']['INVALID_EMAIL_FORMAT']
    );
  });

  test('NE - Shouldn"t be able to register with short password', async ({
    page,
  }) => {
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user successfully
    const responseJson = await registerApi.registerViaApi(
      registerApi.shortPassword['username'],
      registerApi.shortPassword['email'],
      registerApi.shortPassword['password']
    );
    //Assertations
    expect(responseJson['message']).toBe(ERRORS['REGISTER']['SHORT_PASSWORD']);
    expect(responseJson['errors']['password']).toContain(
      ERRORS['REGISTER']['SHORT_PASSWORD']
    );
  });

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

  test('NE - Shouldn"t be able to register with already used email and password', async ({
    page,
  }) => {
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user successfully
    const responseJson = await registerApi.registerViaApi(
      loginUsername,
      loginEmail,
      loginPassword
    );
    expect(responseJson['errors']['username']).toContain(
      ERRORS['REGISTER']['TAKEN_USERNAME']
    );
    expect(responseJson['errors']['email']).toContain(
      ERRORS['REGISTER']['TAKEN_EMAIL']
    );
  });

  test('Shouldn"t be able to login with registered user', async ({ page }) => {
    //Instantiate api login class
    const loginApi = new LoginApi(page);
    //Login registered user
    const responseJson = await loginApi.loginViaBE(loginEmail, loginPassword);
    //Assertations
    expect(responseJson['status']).toBe(RESPONSE_MESSAGES['STATUS_SUCCESS']);
  });
});
