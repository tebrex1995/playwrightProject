import { test } from '@playwright/test';
import { Header } from './header';
import { HEADINGS, utils, URLS } from '../../../fixtures';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    //Success message
    this.successRegisterMessage = page.getByText(
      HEADINGS['SUCCESSFULL_REGISTER_MESSAGE']
    );

    //Input field error messages
    this.missingUsername = page.locator(
      utils.formInputLocators.missingUsername
    );
    this.missingEmail = page.locator(utils.formInputLocators.missingEmail);
    this.missingPassword = page.locator(
      utils.formInputLocators.missingPassword
    );
    this.shortPassword = page.locator(utils.formInputLocators.shortPassword);
    this.takenEmail = page.locator(utils.formInputLocators.takenEmail);
    this.takenUsername = page.locator(utils.formInputLocators.takenUsername);
    this.invalidEmailFormat = page.locator(
      utils.formInputLocators.invalidEmailFormat
    );
    this.usernameLabel = page.locator('label', {
      hasText: 'Username',
    });

    //Page locators
    this.loginRedirectLink = page.locator('span', {
      hasText: HEADINGS['HAVE_ACCOUNT'],
    });
    this.usernameInput = this.page.locator('#username');
    this.emailInput = this.page.locator('#email');
    this.passwordInput = this.page.locator('#password');
    this.submitButton = this.page.getByRole('button', { name: 'Register' });
    this.registerInputs = ['#username', '#email', '#password'];

    //Test Data
    this.emptyInputFields = ['', '', ''];
    this.invalidEmailInInputField = [
      utils.generateRandomString(5),
      'invalid@email',
      utils.generateRandomString(8),
    ];
    this.shortPasswordInput = [
      utils.generateRandomString(5),
      `${utils.generateRandomString(5)}@email.com`,
      utils.generateRandomString(3),
    ];
  }

  async registerValidUser(page, username, email, password) {
    //initiate header class
    const header = new Header(page);
    await header.registerButton.click();
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
  async invalidRegister(page, inputData) {
    await page.goto(URLS['REGISTER']);
    await utils.fillAndSubmitForm(page, this.registerInputs, inputData);
  }
}
