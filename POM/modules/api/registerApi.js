import { URLS, utils } from '../../../fixtures';

export class RegisterApi {
  constructor(page) {
    this.page = page;
  }

  async registerViaApi(username, email, password) {
    let response = await this.page.request.post(
      `${URLS['BASE_API']}${URLS['REGISTER']}`,
      {
        headers: { Accept: 'application/json' },
        data: {
          username: username,
          email: email,
          password: password,
        },
      }
    );
    let responseJson = response.json();
    return responseJson;
  }
}
