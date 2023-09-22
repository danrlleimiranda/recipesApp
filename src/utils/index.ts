export const saveLocalStorage = (key: string, value: any) => {
  const info = JSON.stringify(value);
  localStorage.setItem(key, info);
};
