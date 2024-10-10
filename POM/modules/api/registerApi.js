import { ENDPOINTS } from '../../../fixtures';
import { BaseApi } from './baseApi';

export class RegisterApi extends BaseApi {
  constructor(page) {
    super(page);
    this.endpoint = ENDPOINTS['REGISTER_ENDPOINT'];
  }
  async register(payload) {
    return await this.post(this.endpoint, payload);
  }
}
