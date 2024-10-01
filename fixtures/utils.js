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
  usernameEmailPass: '.mb-3 .text-center p:has-text',
  shortPassword: '.mb-6 .text-center p:has-text',
};

const formInputLocators = {
  missingUsername: `${locatorPrefix.usernameEmailPass}("${ERRORS['MISSING_USERNAME']}")`,
  missingEmail: `${locatorPrefix.usernameEmailPass}("${ERRORS['MISSING_EMAIL']}")`,
  missingPassword: `${locatorPrefix.usernameEmailPass}("${ERRORS['MISSING_PASSWORD']}")`,
  shortPassword: `${locatorPrefix.shortPassword}("${ERRORS['SHORT_PASSWORD']}")`,
  invalidEmailFormat: `${locatorPrefix.usernameEmailPass}("${ERRORS['INVALID_EMAIL_FORMAT']}")`,
  takenEmail: `${locatorPrefix.usernameEmailPass}("${ERRORS['TAKEN_EMAIL']}")`,
  takenUsername: `${locatorPrefix.usernameEmailPass}("${ERRORS['TAKEN_USERNAME']}")`,
};

export { generateRandomString, fillAndSubmitForm, formInputLocators };
