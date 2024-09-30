export class Login {
  constructor(page) {
    this.page = page;
  }

  async loginViaBE(email, password) {
    let response = await this.page.request.post('/api/v1/auth/login', {
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
