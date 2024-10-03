import { generateRandomString } from './utils';

export function validUser() {
  const validUsername = `aleksa${Math.floor(Math.random() * 1000000) + 1}`;
  const validEmail = `aleksa+${
    Math.floor(Math.random() * 1000000) + 1
  }@gmail.com`;
  const validPassword = 'test123';
  return (validUser = {
    username: validUsername,
    email: validEmail,
    password: validPassword,
  });
}
export const existingUser = {
  email: 'aleksatester@gmail.com',
  password: 'test123',
  username: 'aleksatester',
};
export const generateUserCredentials = length => {
  const baseString = generateRandomString(length);
  const username = baseString;
  const email = `aleksa+${baseString}@email.com`;
  const password = `${baseString}123`;

  return { username, email, password };
};
