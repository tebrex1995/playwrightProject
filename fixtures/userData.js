export function validUser() {
  const validUsername = `aleksa${Math.floor(Math.random() * 1000) + 1}`;
  const validEmail = `aleksa+${Math.floor(Math.random() * 1000) + 1}@gmail.com`;
  const validPassword = 'test123';
  return (validUser = {
    username: validUsername,
    email: validEmail,
    password: validPassword,
  });
}
