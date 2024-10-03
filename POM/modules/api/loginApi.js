import { URLS, utils } from '../../../fixtures';

export class LoginApi {
  constructor(page) {
    this.page = page;
    this.nonExistingUser = {
      email: `${utils.generateRandomString(4)}@email.com`,
      password: utils.generateRandomString(6),
    };
    this.emptyInputFields = {
      email: utils.generateRandomString(0),
      password: utils.generateRandomString(0),
    };
  }

  async loginViaBE(email, password) {
    let response = await this.page.request.post(
      `/${URLS['BASE_API']}${URLS['LOGIN']}`,
      {
        headers: { Accept: 'application/json' },
        data: {
          email: email,
          password: password,
        },
      }
    );
    let responseJson = await response.json();

    return responseJson;
  }
}
