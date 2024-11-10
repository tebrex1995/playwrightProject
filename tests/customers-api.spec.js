import { test, expect } from '@playwright/test';
import { CustomersApi } from '../POM/modules/api/customersApi';
import { LoginApi } from '../POM/modules/api/loginApi';
import { ERRORS, EXISTING_USER, STATUS, utils } from '../fixtures';

test.describe('Customers API tests', () => {
  let loginApi, customersApi;
  test.beforeEach('Get JWT token', async ({ page }) => {
    loginApi = new LoginApi(page);
    const loginResponse = await loginApi.login(EXISTING_USER['login']);
    customersApi = new CustomersApi(page, loginResponse.auth.token);
  });
  test('Should be able to get all customers with token', async () => {
    const response = await customersApi.getAllCustomers();
    for (let i = 0; i < response.customers.lenght; i++) {
      let id = response.customers[i]['id'];
      expect(response.customers[i]).toHaveProperty(id);
      expect(id).toBe(i + 1);
    }
  });

  test('Should not be able to get all customers without token', async ({
    page,
  }) => {
    const customersAPIWithoutToken = new CustomersApi(page);
    const response = await customersAPIWithoutToken.getAllCustomers();

    expect(response.message).toBe(ERRORS['CUSTOMERS_API']['UNAUTHENTICATED']);
  });

  test('Should be able to get single customer with token', async () => {
    const allCustomersResponse = await customersApi.getAllCustomers();
    const numberOfCustomers = await allCustomersResponse.customers.length;
    const randomId = utils.generateRandomNumber(numberOfCustomers);

    const response = await customersApi.getCustomer(randomId);
    expect(response.status).toBe(STATUS['STATUS_SUCCESS']);
  });

  test('Should update customer successfully', async () => {
    //Get all customers and calculate their number and get random customers ID
    const allCustomersResponse = await customersApi.getAllCustomers();
    const numberOfCustomers = await allCustomersResponse.customers.length;
    const randomId = utils.generateRandomNumber(numberOfCustomers);
    //Generate new first name and update customer
    const newFirstName = utils.generateRandomString(5);
    const response = await customersApi.updateCustomer(randomId, {
      first_name: newFirstName,
    });
    expect(await response['customer']['first_name']).toBe(newFirstName);
  });

  test('Last customer should be deleted successfully', async ({ page }) => {
    //Get number of customers
    const allCustomersResponse = await customersApi.getAllCustomers();
    const numberOfCustomers = await allCustomersResponse.customers.length;
    const lastCustomer = allCustomersResponse.customers.pop();
    //Get last customers id
    const lastCustomerId = await lastCustomer.id;
    //Delete last customer
    const response = await customersApi.deleteCustomer(lastCustomerId);
    expect(response.status).toBe(STATUS['STATUS_SUCCESS']);
    expect(response.message).toBe(STATUS['DELETED_CUSTOMER']);
    //Get deleted user
    const getDeletedCustomer = await customersApi.getCustomer(lastCustomerId);
    expect(getDeletedCustomer.error).toBe(
      ERRORS.CUSTOMERS_API.NO_CUSTOMER_FOUND(lastCustomerId)
    );
    //Get all customers again and get new number of customers
    const newAllCustomerResponse = await customersApi.getAllCustomers();
    const newNumberOfCustomers = await newAllCustomerResponse.customers.length;
    expect(newNumberOfCustomers).toBeLessThan(numberOfCustomers);
  });
});
