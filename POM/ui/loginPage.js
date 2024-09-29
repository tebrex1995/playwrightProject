const { test } = require('@playwright/test');
const { Header } = require('./header');

exports.LoginPage = class LoginPage extends Header {
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
