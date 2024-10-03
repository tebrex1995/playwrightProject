import { Header } from './header';
import { HEADINGS, utils, URLS, ERRORS } from '../../../fixtures';
import { Common } from './Common';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.successRegisterMessage = page.getByText(
      HEADINGS['SUCCESSFULL_REGISTER_MESSAGE']
    );

    //Page locators
    this.common = new Common(page);
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
    this.missingUsername = page.locator(
      this.common.formInputLocators.missingUsername
    );
    this.missingEmail = page.locator(
      this.common.formInputLocators.missingEmail
    );
    this.missingPassword = page.locator(
      this.common.formInputLocators.missingPassword
    );
    this.shortPassword = page.locator(
      this.common.formInputLocators.shortPassword
    );
    this.takenEmail = page.locator(this.common.formInputLocators.takenEmail);
    this.takenUsername = page.locator(
      this.common.formInputLocators.takenUsername
    );
    this.invalidEmailFormat = page.locator(
      this.common.formInputLocators.invalidEmailFormat
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
    //Instantiate header class
    const header = new Header(page);
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
