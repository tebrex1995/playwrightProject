import { ERRORS } from '../../../fixtures';

export class Common {
  constructor(page) {
    this.page = page;
    this.locatorPrefix = {
      FormInputLocatorClass: '.mb-3 .text-center p:has-text',
    };
    this.formInputLocators = {
      missingUsername: `${this.locatorPrefix['FormInputLocatorClass']}("${ERRORS['REGISTER']['MISSING_USERNAME']}")`,
      missingEmail: `${this.locatorPrefix['FormInputLocatorClass']}("${ERRORS['REGISTER']['MISSING_EMAIL']}")`,
      missingPassword: `${this.locatorPrefix['FormInputLocatorClass']}("${ERRORS['REGISTER']['MISSING_PASSWORD']}")`,
      shortPassword: `${this.locatorPrefix['FormInputLocatorClass']}("${ERRORS['REGISTER']['SHORT_PASSWORD']}")`,
      invalidEmailFormat: `${this.locatorPrefix['FormInputLocatorClass']}("${ERRORS['REGISTER']['INVALID_EMAIL_FORMAT']}")`,
      takenEmail: `${this.locatorPrefix['FormInputLocatorClass']}("${ERRORS['REGISTER']['TAKEN_EMAIL']}")`,
      takenUsername: `${this.locatorPrefix['FormInputLocatorClass']}("${ERRORS['REGISTER']['TAKEN_USERNAME']}")`,
    };
  }
}
