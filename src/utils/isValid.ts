export const isValid = (email: string, password: string) => {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validEmail = regexEmail.test(email);

  const validation1 = validEmail;
  const validation2 = password.length > 6;
  const validation3 = (validation1 && validation2) && validation1 && validation2;
  return validation3;
};

export const saveLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};
