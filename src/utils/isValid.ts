export const isValid = (email: string, password: string) => {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validEmail = regexEmail.test(email);

  const validation1 = validEmail;
  const validation2 = password.length > 6;
  const validationAll = (validation1 && validation2) && validation1 && validation2;
  return validationAll;
};

// export const isValid = (email: string, password: string) => {
//   const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
//   const validEmail = regexEmail.test(email);

//   return !((validEmail || password.length >= 6));
// };

export const saveLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};
