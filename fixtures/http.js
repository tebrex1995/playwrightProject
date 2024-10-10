export const STATUS = {
  STATUS_SUCCESS: 'Success',
  USER_CREATED_MESSAGE: 'User created successfully',
  UNAUTHORIZED: 'Unauthorized',
  DELETED_CUSTOMER: 'Customer deleted successfully.',
  PRODUCT_CREATED: 'Product created successfully.',
};

export const ERRORS = {
  REGISTER: {
    MISSING_USERNAME: 'The username field is required.',
    TAKEN_USERNAME: 'The username has already been taken.',
    MISSING_EMAIL: 'The email field is required.',
    INVALID_EMAIL_FORMAT: 'The email field format is invalid.',
    TAKEN_EMAIL: 'The email has already been taken.',
    MISSING_PASSWORD: 'The password field is required.',
    SHORT_PASSWORD: 'The password field must be at least 6 characters.',
  },

  LOGIN: {
    WRONG_EMAIL_OR_PASSWORD:
      'The email address or password you entered is invalid',
    MISSING_PASSWORD: 'The password field is required.',
    INVALID_EMAIL_FORMAT: 'The email field format is invalid.',
    MISSING_EMAIL: 'The email field is required.',
  },

  CUSTOMERS_API: {
    UNAUTHENTICATED: 'Unauthenticated.',
    NO_CUSTOMER_FOUND: id => {
      return `No customer found with ID ${id} found`;
    },
  },
};
