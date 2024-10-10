import { utils } from '.';

export const randomProduct = {
  name: `${utils.generateRandomString(3)} ${utils.generateRandomString(4)}`,
  description: `${utils.generateRandomString(20)}`,
  price: Number(
    `${utils.generateRandomNumber(100)}.${utils.generateRandomNumber(99)}`
  ),
  in_stock: true,
  quantity: utils.generateRandomNumber(100),
  rating: Number(
    `${utils.generateRandomNumber(5)}.${utils.generateRandomNumber(9)}`
  ),
};
