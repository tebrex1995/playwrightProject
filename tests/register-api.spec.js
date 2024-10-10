import { test, expect } from '@playwright/test';
import { RegisterApi } from '../POM/modules/api/registerApi';
import {
  STATUS,
  generateUserCredentials,
  EXISTING_USER,
  INVALID_USER,
  ERRORS,
} from '../fixtures';

test.describe('Register via Api', () => {
  let registerApi;

  test.beforeEach('Instantiate class', async ({ page }) => {
    registerApi = new RegisterApi(page);
  });

  test("Shouldn't be able to register without provided data", async () => {
    //Send register request
    const responseJson = await registerApi.register(
      INVALID_USER['api']['emptyInputFields']
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
    const responseJson = await registerApi.register(EXISTING_USER['register']);
    expect(responseJson['errors']['username']).toContain(
      ERRORS['REGISTER']['TAKEN_USERNAME']
    );
    expect(responseJson['errors']['email']).toContain(
      ERRORS['REGISTER']['TAKEN_EMAIL']
    );
  });

  test("Shouldn't be able to register with invalid email format", async () => {
    const responseJson = await registerApi.register(
      INVALID_USER['api']['register']['invalidEmailFormat']
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

    const responseJson = await registerApi.register(
      INVALID_USER['api']['register']['shortPassword']
    );
    //Assertations
    expect(responseJson['message']).toBe(ERRORS['REGISTER']['SHORT_PASSWORD']);
    expect(responseJson['errors']['password']).toContain(
      ERRORS['REGISTER']['SHORT_PASSWORD']
    );
  });

  test('Register successfully', async () => {
    //Generate valid test data
    const user = generateUserCredentials(6);
    //Register user successfully
    const responseJson = await registerApi.register(user);
    //Assertations
    expect(responseJson['status']).toBe(STATUS['STATUS_SUCCESS']);
    expect(responseJson['message']).toBe(STATUS['USER_CREATED_MESSAGE']);
  });
});
