import { utils } from '../../../fixtures';
import { Dashboard } from './dashboard';
import { Header } from './header';
export class Cart {
  constructor(page) {
    this.page = page;
    //Instantiate classes
    this.header = new Header(page);
    this.dashboard = new Dashboard(page);
    //Locators
    this.product = this.dashboard.getOneProduct(
      page,
      utils.generateRandomNumber(this.dashboard['productsOnFullPage'])
    );
    this.button = 'button';
    this.clearButton = 'span.pi-trash';
    this.removeProductButton = 'button .pi-times';
    this.plusQuantity = '.pi-plus';
    this.minusQuantity = '.pi-minus';
  }

  async addToCart(page) {
    const product = await this.product;
    const cartButton = product.locator(this.button);
    if (await cartButton.isEnabled()) {
      cartButton.click();
    }
  }
  // No items in cart. Add some!
  async clearCart() {
    await this.header.cartButton.click();
    const clearButton = await this.page.locator(this.clearButton);
    if (await clearButton.isVisible()) {
      await clearButton.click();
    }
    await this.header.cartButton.click();
  }

  async removeProduct() {
    const removeBtn = await this.page.locator(this.removeProductButton);
    await removeBtn.click();
  }
}
