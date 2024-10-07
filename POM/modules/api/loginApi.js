import { ENDPOINTS } from '../../../fixtures';
import { BaseApi } from './baseApi';

export class LoginApi extends BaseApi {
  constructor(page) {
    super(page);
    this.endpoint = ENDPOINTS['LOGIN_ENDPOINT'];
  }

  async login(payload) {
    return await this.post(this.endpoint, payload);
  }
}
