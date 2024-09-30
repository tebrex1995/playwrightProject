import { test } from '@playwright/test';

export class Header {
  constructor(page) {
    this.page = page;
    this.logInButton = page.locator('#loginBtn');
    this.registerButton = page.getByText('Register');
  }
}
