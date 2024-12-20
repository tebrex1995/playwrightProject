import { Header } from './header';
import { ERRORS, URLS, utils } from '../../../fixtures';
import { Common } from '../ui/Common';

export class LoginPage {
  constructor(page) {
    this.common = new Common(page);
    this.page = page;
    //Error message locator
    this.wrongEmailOrPasswod = page.getByText(
      `${ERRORS['LOGIN']['WRONG_EMAIL_OR_PASSWORD']}`
    );
    //Page locators
    this.heading = page.locator('h1');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button');
    this.loginInputs = ['#email', '#password'];
  }

  async loginValidUser(page, email, password) {
    //Page locators
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await page.waitForLoadState('networkidle');
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
