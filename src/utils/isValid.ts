export const isValid = (email: string, password: string) => {
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const validEmail = regexEmail.test(email);

  return !!((validEmail === false && password.length < 6));
};

export const saveLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
