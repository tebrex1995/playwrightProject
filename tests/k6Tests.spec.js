import { test, expect } from '@playwright/test';
import { LoginApi } from '../POM/modules/api/loginApi';
import { EXISTING_USER } from '../fixtures';
import fs from 'fs';

test.describe.configure({ mode: 'serial' });

test.describe('Login and write token in file', () => {
  let tokens = [];
  const users = [
    EXISTING_USER['login'],
    { email: 'aleksa1@gmail.com', password: 'test123' },
    { email: 'aleksa2@gmail.com', password: 'test123' },
  ];
  test('User should be logged in', async ({ page }) => {
    const loginApi = new LoginApi(page);
    for (let user of users) {
      const response = await loginApi.login(user);
      const token = response.auth.token;
      tokens.push(token);
    }
  });

  test('Write tokens in file', async () => {
    fs.writeFileSync(
      '/home/academy-06/Desktop/playwrightProject/fixtures/tokens.json',
      JSON.stringify(tokens)
    );
  });
});
