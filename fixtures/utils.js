import { ERRORS } from './pageTextValues';

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

const locatorPrefix = {
  mb3Class: '.mb-3 .text-center p:has-text',
  mb6Class: '.mb-6 .text-center p:has-text',
};

const formInputLocators = {
  missingUsername: `${locatorPrefix.mb3Class}("${ERRORS['MISSING_USERNAME']}")`,
  missingEmail: `${locatorPrefix.mb3Class}("${ERRORS['MISSING_EMAIL']}")`,
  missingPassword: `${locatorPrefix.mb6Class}("${ERRORS['MISSING_PASSWORD']}")`,
  loginMissingPassword: `${locatorPrefix.mb3Class}("${ERRORS['MISSING_PASSWORD']}")`,
  shortPassword: `${locatorPrefix.mb6Class}("${ERRORS['SHORT_PASSWORD']}")`,
  invalidEmailFormat: `${locatorPrefix.mb3Class}("${ERRORS['INVALID_EMAIL_FORMAT']}")`,
  takenEmail: `${locatorPrefix.mb3Class}("${ERRORS['TAKEN_EMAIL']}")`,
  takenUsername: `${locatorPrefix.mb3Class}("${ERRORS['TAKEN_USERNAME']}")`,
};

export { generateRandomString, fillAndSubmitForm, formInputLocators };
