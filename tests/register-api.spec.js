import { test, expect } from '@playwright/test';
import { RegisterApi } from '../POM/modules/api/registerApi';
import {
  RESPONSE_MESSAGES,
  generateUserCredentials,
  existingUser,
  ERRORS,
} from '../fixtures';

test.describe('Register via Api', () => {
  test('NE - Shouldn"t be able to register without provided data', async ({
    page,
  }) => {
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user with empty input fields
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
  test('NE - Shouldn"t be able to register with already used email and password', async ({
    page,
  }) => {
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user successfully
    const responseJson = await registerApi.registerViaApi(
      existingUser['username'],
      existingUser['email'],
      existingUser['password']
    );
    expect(responseJson['errors']['username']).toContain(
      ERRORS['REGISTER']['TAKEN_USERNAME']
    );
    expect(responseJson['errors']['email']).toContain(
      ERRORS['REGISTER']['TAKEN_EMAIL']
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
  test('Register successfully', async ({ page }) => {
    //Generate valid test data
    const { username, email, password } = generateUserCredentials(6);
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
});
