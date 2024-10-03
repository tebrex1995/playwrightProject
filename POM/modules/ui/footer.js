export class Footer {
  constructor(page) {
    this.page = page;
    this.linkedInLink = page.locator('.pi-linkedin');
    this.instagramLink = page.locator('.pi-instagram');
    this.faceBookLink = page.locator('.pi-facebook');
    this.mailLink = page.locator('.pi-google');
  }
}
