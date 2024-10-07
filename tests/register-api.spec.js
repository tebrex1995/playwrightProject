import { test, expect } from '@playwright/test';
import { RegisterApi } from '../POM/modules/api/registerApi';
import {
  RESPONSE_MESSAGES,
  generateUserCredentials,
  existingUser,
  invalidUsers,
  ERRORS,
} from '../fixtures';

test.describe('Register via Api', () => {
  let registerApi;

  test.beforeEach('Instantiate class', async ({ page }) => {
    registerApi = new RegisterApi(page);
  });

  test("Shouldn't be able to register without provided data", async () => {
    //Send register request
    const responseJson = await registerApi.registerViaApi(
      invalidUsers['api']['emptyInputFields']['username'],
      invalidUsers['api']['emptyInputFields']['email'],
      invalidUsers['api']['emptyInputFields']['password']
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

  test("Shouldn't be able to register with already used email and password", async () => {
    //Send register request
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

  test("Shouldn't be able to register with invalid email format", async () => {
    const responseJson = await registerApi.registerViaApi(
      invalidUsers['api']['invalidEmailFormat']['username'],
      invalidUsers['api']['invalidEmailFormat']['email'],
      invalidUsers['api']['invalidEmailFormat']['password']
    );
    //Assertations
    expect(responseJson['message']).toBe(
      ERRORS['REGISTER']['INVALID_EMAIL_FORMAT']
    );
    expect(responseJson['errors']['email']).toContain(
      ERRORS['REGISTER']['INVALID_EMAIL_FORMAT']
    );
  });

  test("Shouldn't be able to register with short password", async () => {
    ['api'];
    //Send register request

    const responseJson = await registerApi.registerViaApi(
      invalidUsers['api']['shortPassword']['username'],
      invalidUsers['api']['shortPassword']['email'],
      invalidUsers['api']['shortPassword']['password']
    );
    //Assertations
    expect(responseJson['message']).toBe(ERRORS['REGISTER']['SHORT_PASSWORD']);
    expect(responseJson['errors']['password']).toContain(
      ERRORS['REGISTER']['SHORT_PASSWORD']
    );
  });

  test('Register successfully', async () => {
    //Generate valid test data
    const { username, email, password } = generateUserCredentials(6);
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
