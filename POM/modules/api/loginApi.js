import { ENDPOINTS } from '../../../fixtures';

export class LoginApi {
  constructor(page) {
    this.page = page;
  }

  async loginViaBE(email, password) {
    let response = await this.page.request.post(ENDPOINTS['LOGIN_ENDPOINT'], {
      headers: { Accept: 'application/json' },
      data: {
        email: email,
        password: password,
      },
    });
    let responseJson = await response.json();

    return responseJson;
  }
}
