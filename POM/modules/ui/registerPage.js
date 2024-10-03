import { test } from '@playwright/test';
import { Header } from './header';
import { HEADINGS, utils, URLS, ERRORS } from '../../../fixtures';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    //Success message
    this.successRegisterMessage = page.getByText(
      HEADINGS['SUCCESSFULL_REGISTER_MESSAGE']
    );

    //Page locators
    this.locatorPrefix = {
      mb3Class: '.mb-3 .text-center p:has-text',
      mb6Class: '.mb-6 .text-center p:has-text',
    };
    this.formInputLocators = {
      missingUsername: `${this.locatorPrefix.mb3Class}("${ERRORS['MISSING_USERNAME']}")`,
      missingEmail: `${this.locatorPrefix.mb3Class}("${ERRORS['MISSING_EMAIL']}")`,
      missingPassword: `${this.locatorPrefix.mb6Class}("${ERRORS['MISSING_PASSWORD']}")`,
      shortPassword: `${this.locatorPrefix.mb6Class}("${ERRORS['SHORT_PASSWORD']}")`,
      invalidEmailFormat: `${this.locatorPrefix.mb3Class}("${ERRORS['INVALID_EMAIL_FORMAT']}")`,
      takenEmail: `${this.locatorPrefix.mb3Class}("${ERRORS['TAKEN_EMAIL']}")`,
      takenUsername: `${this.locatorPrefix.mb3Class}("${ERRORS['TAKEN_USERNAME']}")`,
    };
    this.heading = page.locator('h1');
    this.loginRedirectLink = page.locator('span', {
      hasText: HEADINGS['HAVE_ACCOUNT'],
    });
    this.usernameInput = this.page.locator('#username');
    this.emailInput = this.page.locator('#email');
    this.passwordInput = this.page.locator('#password');
    this.submitButton = this.page.getByRole('button', { name: 'Register' });
    this.registerInputs = ['#username', '#email', '#password'];

    //Input field error messages
    this.missingUsername = page.locator(this.formInputLocators.missingUsername);
    this.missingEmail = page.locator(this.formInputLocators.missingEmail);
    this.missingPassword = page.locator(this.formInputLocators.missingPassword);
    this.shortPassword = page.locator(this.formInputLocators.shortPassword);
    this.takenEmail = page.locator(this.formInputLocators.takenEmail);
    this.takenUsername = page.locator(this.formInputLocators.takenUsername);
    this.invalidEmailFormat = page.locator(
      this.formInputLocators.invalidEmailFormat
    );
    this.usernameLabel = page.locator('label', {
      hasText: 'Username',
    });
    //Test Data
    this.emptyInputFields = [
      utils.generateRandomString(0),
      utils.generateRandomString(0),
      utils.generateRandomString(0),
    ];
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
