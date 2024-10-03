import { Header } from './header';
import { ERRORS, URLS, utils } from '../../../fixtures';

export class LoginPage {
  constructor(page) {
    this.page = page;
    //Error message locator
    this.missingPassword = page.locator(
      `.mb-3 .text-center p:has-text("${ERRORS['LOGIN']['MISSING_PASSWORD']}")`
    );
    this.wrongEmailOrPasswod = page.getByText(
      `${ERRORS['LOGIN']['WRONG_EMAIL_OR_PASSWORD']}`
    );
    //Page locators

    this.heading = page.locator('h1');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button');
    this.loginInputs = ['#email', '#password'];

    //Test Data
    this.emptyInputFields = [
      utils.generateRandomString(0),
      utils.generateRandomString(0),
    ];
    this.wrongEmailAndPassword = [
      `${utils.generateRandomString(4)}@test.com`,
      utils.generateRandomString(7),
    ];
  }

  async loginValidUser(page, email, password) {
    //Instantiate class
    const header = new Header(page);
    //Page locators
    await header.logInButton.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async logoutUser(page) {
    const header = new Header(page);
    if (await header.burgerMenu.isVisible()) {
      await header.burgerMenu.click();
      await header.logoutButton.click();
    }
  }

  async invalidLogin(page, inputData) {
    await page.goto(URLS['LOGIN']);
    await utils.fillAndSubmitForm(page, this.loginInputs, inputData);
  }
}
