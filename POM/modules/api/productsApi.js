import { BaseApi } from './baseApi';
import { ENDPOINTS } from '../../../fixtures';

export class ProductsApi extends BaseApi {
  constructor(page, token = '') {
    super(page, token);
    this.endpoint = ENDPOINTS['PRODUCTS_API'];
  }

  async addProduct(payload) {
    return await this.post(this.endpoint, payload);
  }
}
