import { test } from '@playwright/test';
import { Header } from './header';
import { HEADINGS, ERRORS, utils, URLS } from '../../../fixtures';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.successRegisterMessage = page.getByText(
      HEADINGS['SUCCESSFULL_REGISTER_MESSAGE']
    );
    this.loginRedirectLink = page.locator('span', {
      hasText: HEADINGS['HAVE_ACCOUNT'],
    });
    this.missingUsername = page.locator(
      `.mb-3 .text-center p:has-text("${ERRORS['MISSING_USERNAME']}")`
    );
    this.missingEmail = page.locator(
      `.mb-3 .text-center p:has-text("${ERRORS['MISSING_EMAIL']}")`
    );
    this.missingPassword = page.locator(
      `.mb-3 .text-center p:has-text("${ERRORS['MISSING_PASSWORD']}")`
    );
    this.usernameLabel = page.locator('label', {
      hasText: 'Username',
    });
    this.invalidEmailFormat = page.locator(
      `.mb-3 .text-center p:has-text("${ERRORS['INVALID_EMAIL_FORMAT']}")`
    );
    this.usernameInput = this.page.locator('#username');
    this.emailInput = this.page.locator('#email');
    this.passwordInput = this.page.locator('#password');
    this.submitButton = this.page.getByRole('button', { name: 'Register' });
    this.registerInputs = ['#username', '#email', '#password'];
    this.emptyInputFields = ['', '', ''];
    this.invalidEmailInInputField = [
      utils.generateRandomString(5),
      'invalid@email',
      utils.generateRandomString(8),
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
