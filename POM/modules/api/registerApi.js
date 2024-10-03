import { URLS, utils, BASE_API } from '../../../fixtures';

export class RegisterApi {
  constructor(page) {
    this.page = page;
    this.registerEndpoint = `${BASE_API['BASE_API']}${URLS['REGISTER']}`;
    this.emptyInputFields = {
      username: utils.generateRandomString(0),
      email: utils.generateRandomString(0),
      password: utils.generateRandomString(0),
    };
    this.invalidEmailFormat = {
      username: utils.generateRandomString(6),
      email: `${utils.generateRandomString(5)}@email`,
      password: utils.generateRandomString(6),
    };
    this.shortPassword = {
      username: utils.generateRandomString(6),
      email: `${utils.generateRandomString(5)}@email.com`,
      password: utils.generateRandomString(3),
    };
  }

  async registerViaApi(username, email, password) {
    let response = await this.page.request.post(this.registerEndpoint, {
      headers: { Accept: 'application/json' },
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    let responseJson = response.json();
    return responseJson;
  }
}
