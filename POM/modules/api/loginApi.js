import { URLS, utils, BASE_API } from '../../../fixtures';

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
    this.loginEndpoint = URLS['LOGIN'];
  }

  async loginViaBE(email, password) {
    let response = await this.page.request.post(
      `/${BASE_API['BASE_API']}${this.loginEndpoint}`,
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
