import { generateRandomString } from './utils';

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
