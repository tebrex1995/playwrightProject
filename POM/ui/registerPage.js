const { test } = require('@playwright/test');
const { BaseHomePage } = require('./baseHomePage');

exports.RegisterPage = class RegisterPage extends BaseHomePage {
  constructor(page) {
    super(page);
  }

  async registerValidUser(username, email, password) {
    await this.signUpButton.click();
    await this.page.locator('#username').fill(username);
    await this.page.locator('#email').fill(email);
    await this.page.locator('#password').fill(password);
    await this.page.getByRole('button', { name: 'Register' }).click();
  }
};
