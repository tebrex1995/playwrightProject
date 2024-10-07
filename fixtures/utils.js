const generateRandomString = length => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const fillAndSubmitForm = async (page, fields, values) => {
  for (let i = 0; i < fields.length; i++) {
    await page.locator(fields[i]).fill(values[i]);
  }
  await page.locator('button').click();
};

const countDivElements = async (page, divLocator, children) => {
  // return await divLocator.length;
  const count = await page.locator(`${divLocator} ${children}`).count();
  return count;
};

const getProductIndex = async numberOfProducts => {
  const productsNumber = numberOfProducts;
  const productIndex = [];
  for (let i = 1; i <= productsNumber; i++) {
    productIndex.push(i);
  }
  return productIndex;
};

export {
  generateRandomString,
  fillAndSubmitForm,
  countDivElements,
  getProductIndex,
};
