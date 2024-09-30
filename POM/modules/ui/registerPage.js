import { test } from '@playwright/test';
import { Header } from './header';

// export class RegisterPage extends Header {
//   constructor(page) {
//     super(page);
//   }

//   async registerValidUser(username, email, password) {
//     await this.registerButton.click();
//     await this.page.locator('#username').fill(username);
//     await this.page.locator('#email').fill(email);
//     await this.page.locator('#password').fill(password);
//     await this.page.getByRole('button', { name: 'Register' }).click();
//   }
// }

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.usernameInput = this.page.locator('#username');
    this.emailInput = this.page.locator('#email');
    this.passwordInput = this.page.locator('#password');
    this.submitButton = this.page.getByRole('button', { name: 'Register' });
  }

  async registerValidUser(username, email, password) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
