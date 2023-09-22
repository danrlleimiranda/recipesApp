export const isValid = (email: string, password: string) => {
  const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
  const validEmail = regexEmail.test(email);

  return !((validEmail || password.length >= 6));
};

export const saveLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
