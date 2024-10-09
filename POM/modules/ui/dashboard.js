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
    this.productDescription = {
      paritalLocator: '.text-sm',
      fullLocator: page.locator('.text-sm'),
    };
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
    this.productsOnFullPage = 12;
  }

  //***********METHODS***********//

  //********PAGINATION****** *//

  ///Navigate to specific page number
  async navigateToPage(page, productsPage) {
    await page.locator(`button[aria-label="${productsPage}"]`).click();
    //Wait for products to load
    await page.waitForTimeout(3000);
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

  async getOneProduct(page, productsIndex) {
    const ProductCards = await this.getAllproductCards(page);
    //Get specific product
    const productCard = await ProductCards.nth(productsIndex - 1);
    return productCard;
  }

  //Get product data
  async getProductData(page, productsIndex) {
    //Get all product cards from single page
    // const productCards = await this.getAllproductCards(page);
    const productCard = await this.getOneProduct(page, productsIndex);

    //Get product Title
    const productTitle = await productCard.locator(
      this.productTitle['partialLocator']
    );
    const productTitleText = await productTitle.textContent();

    //Get product image
    const productImage = await productCard.locator(
      this.productImage['partialLocator']
    );

    //Get product Description
    const productDescription = await productCard.locator(
      this.productDescription['paritalLocator']
    );
    const productDescriptionText = await productDescription.textContent();

    //Get product Price
    const productPrice = await productCard.locator(this.productPrice);
    const productPriceText = await productPrice.textContent();

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
        title: productTitleText.trim(''),
        description: productDescriptionText,
        price: productPriceText,
      },
    };
  }

  //Loop throught all products in page
  async loopProductsOnAllPages(page) {
    //Get Number of pages and initialize allProducts array
    const pages = await this.getAllPages(page);
    const allProducts = [];
    //Loop through each page
    for (const pageNum of pages) {
      //Go to next page
      await this.navigateToPage(page, pageNum);

      //Get all products,their number and products indexes
      const products = await this.getAllproductCards(page);
      const numberOfProductsOnPage = await products.count();
      const productsIndex = await utils.getproductsIndex(
        numberOfProductsOnPage
      );
      //Get product data from each product on the page and push it in array
      for (const index of productsIndex) {
        const productData = await this.getProductData(page, index);
        allProducts.push(productData);
      }
    }
    await this.navigateToPage(page, 1);
    return allProducts;
  }
}
