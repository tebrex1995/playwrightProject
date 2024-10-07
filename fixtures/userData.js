import { generateRandomString } from './utils';

export const existingUser = {
  email: 'aleksatester@gmail.com',
  password: 'test123',
  username: 'aleksatester',
};

export const invalidUsers = {
  api: {
    nonExistingUser: {
      email: `${generateRandomString(4)}@email.com`,
      password: generateRandomString(6),
    },
    emptyInputFields: {
      username: generateRandomString(0),
      email: generateRandomString(0),
      password: generateRandomString(0),
    },
    invalidEmailFormat: {
      username: generateRandomString(6),
      email: `${generateRandomString(5)}@email`,
      password: generateRandomString(6),
    },
    shortPassword: {
      username: generateRandomString(6),
      email: `${generateRandomString(5)}@email.com`,
      password: generateRandomString(3),
    },
  },
  ui: {
    register: {
      emptyInputFields: [
        generateRandomString(0),
        generateRandomString(0),
        generateRandomString(0),
      ],
      invalidEmailInInputField: [
        generateRandomString(5),
        'invalid@email',
        generateRandomString(8),
      ],
      shortPasswordInput: [
        generateRandomString(5),
        `${generateRandomString(5)}@email.com`,
        generateRandomString(3),
      ],
    },
    login: {
      emptyInputFields: [generateRandomString(0), generateRandomString(0)],
      wrongEmailAndPassword: [
        `${generateRandomString(4)}@test.com`,
        generateRandomString(7),
      ],
    },
  },
};

export const generateUserCredentials = length => {
  const baseString = generateRandomString(length);
  const username = baseString;
  const email = `aleksa+${baseString}@email.com`;
  const password = `${baseString}123`;

  return { username, email, password };
};
