import { ENDPOINTS } from '../../../fixtures';
import { BaseApi } from './baseApi';

export class CustomersApi extends BaseApi {
  constructor(page, token = '') {
    super(page, token);
    this.endpoint = ENDPOINTS['CUSTOMERS_API'];
  }

  async getAllCustomers() {
    return await this.get(this.endpoint);
  }

  async getCustomer(id) {
    return await this.get(this.endpoint, id);
  }

  async updateCustomer(id, payload) {
    return await this.put(this.endpoint, id, payload);
  }

  async deleteCustomer(id) {
    return await this.delete(this.endpoint, id);
  }
}
