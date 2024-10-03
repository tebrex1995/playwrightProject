import { ERRORS } from '../../../fixtures';

export class Common {
  constructor(page) {
    this.page = page;
    this.locatorPrefix = {
      mb3Class: '.mb-3 .text-center p:has-text',
      mb6Class: '.mb-6 .text-center p:has-text',
    };
    this.formInputLocators = {
      missingUsername: `${this.locatorPrefix.mb3Class}("${ERRORS['REGISTER']['MISSING_USERNAME']}")`,
      missingEmail: `${this.locatorPrefix.mb3Class}("${ERRORS['REGISTER']['MISSING_EMAIL']}")`,
      missingPassword: `${this.locatorPrefix.mb6Class}("${ERRORS['REGISTER']['MISSING_PASSWORD']}")`,
      shortPassword: `${this.locatorPrefix.mb6Class}("${ERRORS['REGISTER']['SHORT_PASSWORD']}")`,
      invalidEmailFormat: `${this.locatorPrefix.mb3Class}("${ERRORS['REGISTER']['INVALID_EMAIL_FORMAT']}")`,
      takenEmail: `${this.locatorPrefix.mb3Class}("${ERRORS['REGISTER']['TAKEN_EMAIL']}")`,
      takenUsername: `${this.locatorPrefix.mb3Class}("${ERRORS['REGISTER']['TAKEN_USERNAME']}")`,
    };
  }
}
