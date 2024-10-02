import { test, expect } from '@playwright/test';
import { RegisterApi } from '../POM/modules/api/registerApi';
import { RESPONSE_MESSAGES } from '../fixtures';

test.describe('Regiter and login via Api', async () => {
  test('Register successfully', async ({ page }) => {
    //Instantiate api register class
    const registerApi = new RegisterApi(page);
    //Register user successfully
    const responseJson = await registerApi.registerViaApi(
      '2131212111',
      'test2122121114343421421@gmas.com',
      'test123'
    );
    const token = responseJson.token;
    //Assertations
    console.log(responseJson);
    expect(responseJson['status']).toBe(RESPONSE_MESSAGES['STATUS_SUCCESS']);
    expect(responseJson['message']).toBe(
      RESPONSE_MESSAGES['USER_CREATED_MESSAGE']
    );
  });
});
