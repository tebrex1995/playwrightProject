import { Common } from './Common';
import { HEADINGS } from '../../../fixtures';

export class Dashboard {
  constructor(page) {
    this.page = page;
    //Instantiate class
    this.common = new Common(page);
    //Page locators
    this.heading = page.locator('span', { hasText: HEADINGS['DASHBOARD'] });
    //Product locators
    this.productsContainer = page.getByTestId('products-container');
    this.productCard = page.getByTestId('product-card');
    this.productTitle = page.locator('h5');
    this.productLink = page.locator('href');
    this.productImage = page.getByAltText('product image');
    this.productStar = page.getByRole('rating');
    this.productRating = page.locator('span.ml-4');
    this.ProductRatingComponent = page.locator('.w-10');
    this.productPrice = page.locator('.py-1 span.font-semibold');
    this.productButton = page.locator('button.p-button svg');
    //Products Modal locators
    page.this.productModalTitle = page.locator('.p-dialog-title');
    this.productModalDescription = page.locator('p.m-0');
    this.productModalImage = page.locator('img');
    //Pagination Locators
    this.productPageButtons = page.locator('.paginated .p-button-label');
    this.specificPageButton = page.locator('button[aria-label]', {
      hasText: `${productsPage}`,
    });
    //iFrame Locators
    this.iframe = page.frameLocator('iframe');
    this.iframeHeading = this.iframe.locator('h4', {
      hasText: HEADINGS['IFRAME'],
    });
  }
}
