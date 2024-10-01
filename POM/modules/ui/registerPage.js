import { test } from '@playwright/test';
import { Header } from './header';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    // this.heading = page.locator('h1');
    this.successRegisterMessage = page.getByText('Successfully registered!');
    this.loginRedirectLink = page.locator('span', {
      hasText: 'Already have an account?',
    });
    this.usernameLabel = page.locator('label', { hasText: 'Username' });
    this.usernameInput = this.page.locator('#username');
    this.emailInput = this.page.locator('#email');
    this.passwordInput = this.page.locator('#password');
    this.submitButton = this.page.getByRole('button', { name: 'Register' });
  }

  async registerValidUser(page, username, email, password) {
    //initiate header class
    const header = new Header(page);
    await header.registerButton.click();
    await await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
