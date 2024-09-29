const { test } = require('@playwright/test');

exports.Header = class Header {
  constructor(page) {
    this.page = page;
    this.logInButton = page.locator('#loginBtn');
    this.registerButton = page.getByText('Register');
  }
};
