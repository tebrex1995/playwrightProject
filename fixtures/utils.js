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

const getproductsIndex = async numberOfProducts => {
  const productsNumber = numberOfProducts;
  const productsIndex = [];
  for (let i = 1; i <= productsNumber; i++) {
    productsIndex.push(i);
  }
  return productsIndex;
};

const generateRandomNumber = max => {
  return Math.floor(Math.random() * (max - 1) + 1);
};

export {
  generateRandomString,
  fillAndSubmitForm,
  countDivElements,
  getproductsIndex,
  generateRandomNumber,
};
