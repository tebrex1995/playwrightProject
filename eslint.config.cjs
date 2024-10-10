const { configs } = require('eslint-plugin-playwright');
const babelParser = require('@babel/eslint-parser');

module.exports = [
  {
    ...configs['flat/recommended'],
    files: ['tests/**'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env'],
        },
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
  },
  {
    files: ['tests/**'],
    rules: {
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-commented-out-tests': 'error',
      'playwright/expect-expect': 'error',
      'playwright/missing-playwright-await': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'error',
    },
  },
];
