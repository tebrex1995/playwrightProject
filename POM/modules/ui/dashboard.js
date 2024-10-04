import { Common } from './Common';
import { HEADINGS, utils } from '../../../fixtures';

export class Dashboard {
  constructor(page) {
    this.page = page;
    //Instantiate class
    this.common = new Common(page);
    //Page locators
    this.heading = page.locator('span', { hasText: HEADINGS['DASHBOARD'] });
    //Product locators
    // this.divCount = page.locator('.basis-3 > div');
    this.productsContainer = page.locator('.basis-3');
    this.productsContainerToCount = page.locator('.basis-3 > div');
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
    this.productModalTitle = page.locator('.p-dialog-title');
    this.productModalDescription = page.locator('p.m-0');
    this.productModalImage = page.locator('img');
    //Pagination Locators
    this.paginationElements = {
      parent: '.paginated',
      child: '.p-button-label',
    };
    this.paginationDiv = page.locator(this.paginationElements['parent']);
    this.productPageButtons = page.locator(this.paginationElements['child']);

    //iFrame Locators
    this.iframe = page.frameLocator('iframe');
    this.iframeHeading = this.iframe.locator('h4', {
      hasText: HEADINGS['IFRAME'],
    });
    //Values
    this.productsPerPage = 12;
    this.NumberOfPages = 6;
  }
  async navigateToPage(page, productsPage) {
    await page.locator('button[aria-label]', { hasText: productsPage }).click();
  }

  async loopPages(page) {
    const pageNumber = await utils.countDivElements(
      page,
      this.paginationElements['parent'],
      this.paginationElements['child']
    );
    for (let i = 1; i <= pageNumber; i++) {
      console.log(`You are on page ${i}`);
    }
  }
}