import { test } from '@playwright/test';
import { Header } from './header';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginButton = page.getByText('Login');
    this.heading = page.locator('h1');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button');
  }

  async loginValidUser(email, password) {
    const header = new Header();
    await header.logInButton.click();
    await this.emailInput.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }

  async logoutUser() {
    const header = new Header();
    await header.burgerMenu.click();
    await header.logoutButton.click();
  }
}
