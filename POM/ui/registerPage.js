const { test } = require('@playwright/test');
const { Header } = require('./header');

exports.RegisterPage = class RegisterPage extends Header {
  constructor(page) {
    super(page);
  }

  async registerValidUser(username, email, password) {
    await this.registerButton.click();
    await this.page.locator('#username').fill(username);
    await this.page.locator('#email').fill(email);
    await this.page.locator('#password').fill(password);
    await this.page.getByRole('button', { name: 'Register' }).click();
  }
};
