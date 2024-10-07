export class BaseApi {
  constructor(page) {
    this.page = page;
  }

  async post(endpoint, payload) {
    const response = await this.page.request.post(endpoint, {
      headers: { Accept: 'application/json' },
      data: payload,
    });
    const responseJson = await response.json();

    return responseJson;
  }
}
