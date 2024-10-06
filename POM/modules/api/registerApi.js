import { END_POINTS } from '../../../fixtures';

export class RegisterApi {
  constructor(page) {
    this.page = page;
  }

  async registerViaApi(username, email, password) {
    let response = await this.page.request.post(
      END_POINTS['REGISTER_ENDPOINT'],
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
