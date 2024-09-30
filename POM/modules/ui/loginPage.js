import { test } from '@playwright/test';
import { Header } from './header';

// export class LoginPage extends Header {
//   constructor(page) {
//     super(page);
//   }

//   async loginValidUser(email, password) {
//     await this.logInButton.click();
//     await this.page.locator('#email').fill(email);
//     await this.page.locator('#password').fill(password);
//     await this.page.getByRole('button', { name: 'Sign In' }).click();
//   }
// }

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
    await this.emailInput.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }
}
