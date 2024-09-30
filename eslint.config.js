import { configs } from 'eslint-plugin-playwright';

export default [
  {
    ...configs['flat/recommended'],
    files: ['tests/**'],
  },
  {
    files: ['tests/**'],
    rules: {
      'playwright/no-wait-for-timeout': 'error', //dissalow waitForTimeout
      'playwright/no-commented-out-tests': 'error', //dissalow commented out tests
      'playwright/expect-expect': 'error', //enforce assertion to be made in a test body
      'playwright/missing-playwright-await': 'error', //enforce Playwright APIs
      'playwright/no-focused-test': 'error', //dissalow usage of .only annotation
      'playwright/no-skipped-test': 'error', //dissalow usage of .skip annotation
    },
  },
];
