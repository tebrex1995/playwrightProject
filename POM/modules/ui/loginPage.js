import { test } from '@playwright/test';
import { Header } from './header';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button');
  }

  async loginValidUser(page, email, password) {
    const header = new Header(page);
    await header.logInButton.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async logoutUser(page) {
    const header = new Header(page);
    await header.burgerMenu.click();
    await header.logoutButton.click();
  }
}
