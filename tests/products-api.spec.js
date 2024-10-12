import { test, expect } from '@playwright/test';
import { ProductsApi } from '../POM/modules/api/productsApi';
import { LoginApi } from '../POM/modules/api/loginApi';
import { randomProduct, EXISTING_USER, STATUS } from '../fixtures';

test.describe('Products tests', () => {
  let loginApi, productsApi;
  test.beforeEach('Get JWT token', async ({ page }) => {
    loginApi = new LoginApi(page);
    const loginResponse = await loginApi.login(EXISTING_USER['login']);
    productsApi = new ProductsApi(page, loginResponse.auth.token);
  });

  test('Product should be added successfully on dashboard', async () => {
    const product = randomProduct;
    const response = await productsApi.addProduct(product);
    expect(response['status']).toBe(STATUS['STATUS_SUCCESS']);
    expect(response['message']).toBe(STATUS['PRODUCT_CREATED']);
    expect(response['product']['name']).toBe(product['name']);
    expect(response['product']['description']).toBe(product['description']);
  });
});
