export class Header {
  constructor(page) {
    this.page = page;
    this.burgerMenu = page.locator('.relative > div > span > .inline-flex');
    this.logInButton = page.locator('#loginBtn');
    this.registerButton = page.getByText('Register');
    this.logoutButton = page.getByText('Log Out');
  }
}
