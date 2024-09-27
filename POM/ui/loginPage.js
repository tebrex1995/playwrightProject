const { test } = require('@playwright/test');
const { BaseHomePage } = require('./baseHomePage');

exports.LoginPage = class LoginPage extends BaseHomePage {
  constructor(page) {
    super(page);
  }

  async loginValidUser(email, password) {
    await this.logInButton.click();
    await this.page.locator('#email').fill(email);
    await this.page.locator('#password').fill(password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }
};
