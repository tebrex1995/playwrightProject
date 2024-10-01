import { test } from '@playwright/test';
import { RegisterPage, LoginPage, Header, LandingPage } from '../ui';

export class PageManager {
  constructor(page) {
    this.page = page;
    this.registerPage = new RegisterPage(page);
    this.loginPage = new LoginPage(page);
    this.header = new Header(page);
    this.landingPage = new LandingPage(page);
  }

  loginPage() {
    return this.loginPage;
  }

  registerPage() {
    return this.registerPage;
  }

  header() {
    return this.header;
  }
  landingPage() {
    return this.landingPage;
  }
}
