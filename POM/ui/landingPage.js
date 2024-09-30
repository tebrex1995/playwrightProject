const { test } = require('@playwright/test');

exports.LandingPage = class LandingPage {
  constructor(page) {
    this.page = page;
    this.gearheadImg = page.getByAltText('hero-1');
    this.eshopHeading = page.locator('span[class="text-5xl font-bold"]');
    this.eshopSubHeading = page.locator('div[class="text-xl text-primary"]');
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
  }
};
