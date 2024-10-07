export class Header {
  constructor(page) {
    this.page = page;
    this.burgerMenu = this.page.locator('svg.h-16');
    this.logInButton = this.page.locator('#loginBtn');
    this.registerButton = this.page.getByText('Register');
    this.logoutButton = this.page.getByText('Log Out');
  }
}
