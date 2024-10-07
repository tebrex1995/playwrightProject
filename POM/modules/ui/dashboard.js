import { Common } from './Common';
import { HEADINGS, utils } from '../../../fixtures';

export class Dashboard {
  constructor(page) {
    this.page = page;
    //Instantiate class
    this.common = new Common(page);
    //Attribute Values
    this.activeBtnBgColor = 'rgb(158, 160, 246)';
    //Page locators
    this.heading = page.getByText(HEADINGS['DASHBOARD']);
    //Product locators
    this.productsContainer = {
      fullLocator: page.locator('.basis-3'),
      locatorsClass: '.basis-3',
      productsContainerToCount: page.locator('.basis-3 > div'),
    };
    this.productCard = {
      testId: 'product-card',
      fullLocator: page.getByTestId('product-card'),
      attributeLocator: '[test-id="product-card"]',
    };
    this.productTitle = {
      partialLocator: 'h5',
      fullLocator: page.locator('h5'),
    };
    this.productDescription = page.locator('p.px-1.py-1');
    this.productLink = page.locator('href');
    this.productImage = {
      partialLocator: 'img',
      fullLocator: page.getByAltText('product image'),
    };
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
      child: '.p-button-label',
      parent: '.paginated',
      specificPage: pageNumber =>
        `${this.paginationElements['parent']} button:nth-child(${pageNumber}) `,
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

  //***********METHODS***********//

  //********PAGINATION****** *//

  ///Navigate to specific page number
  async navigateToPage(page, productsPage) {
    await page.locator(`button[aria-label="${productsPage}"]`).click();
    //Wait after click to load page
    await page.waitForLoadState('networkidle');
  }
  //Get number of pages
  async getAllPages(page) {
    await page.waitForLoadState('networkidle');

    const pageNumber = await utils.countDivElements(
      page,
      this.paginationElements['parent'],
      this.paginationElements['child']
    );
    const allPages = [];
    for (let i = 1; i <= pageNumber; i++) {
      allPages.push(i);
    }
    return allPages;
  }

  //Click on every page
  async clickOnEveryPage(page, numberOfPages) {
    await this.getAllPages(page);

    for (const page of numberOfPages) {
      this.paginationElements.specificPage(page);
    }
  }
  //*****PRODUCTS******** *//
  //Wait for network idle and get all product cards from single page
  async getAllproductCards(page) {
    //Wait for load state
    await page.waitForLoadState('networkidle');
    //Get all products
    const productCards = await page.locator(
      this.productCard['attributeLocator']
    );
    return productCards;
  }

  async getOneProduct(page, productIndex) {
    const ProductCards = await this.getAllproductCards(page);
    //Get specific product
    const productCard = await ProductCards.nth(productIndex - 1);
    return productCard;
  }

  //Get product data
  async getProductData(page, productIndex) {
    //Get all product cards from single page
    // const productCards = await this.getAllproductCards(page);
    const productCard = await this.getOneProduct(page, productIndex);

    //Get product Title
    const productTitle = await productCard.locator(
      this.productTitle['partialLocator']
    );
    const productTitleText = productTitle.textContent();

    //Get product image
    const productImage = await productCard.locator(
      this.productImage['partialLocator']
    );
    const ProductImageText = productImage.textContent();

    //Get product Description
    const productDescription = await productCard.locator(
      this.productDescription
    );
    const productDescriptionText = productDescription.textContent();

    //Get product Price
    const productPrice = await productCard.locator(this.productPrice);
    const productPriceText = productDescription.textContent();

    //Get product cart button
    const productCartButton = await productCard.locator(this.productButton);

    //Return object with product data
    return {
      productElements: {
        title: productTitle,
        image: productImage,
        description: productDescription,
        price: productPrice,
        button: productCartButton,
      },

      textContent: {
        title: productTitleText,
        description: productDescriptionText,
        price: productPriceText,
      },
    };
  }

  //Loop throught all products in page
  async loopProductsOnAllPages(page) {
    const pages = await this.getAllPages(page);
    const products = await this.getAllproductCards(page);
    const numberOfProductsOnPage = await products.count();
    const productIndex = await utils.getProductIndex(numberOfProductsOnPage);
    console.log(productIndex);
    //GET PRODUCTS FROM A PAGE IN SINGLE ARRAY
    //Loop through pages and get all products
    // for(const product in products)
    // const allProducts = [];
    // for (const singlePage of pages) {
    // }
  }
}
