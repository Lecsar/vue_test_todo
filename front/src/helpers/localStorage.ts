const TOKEN = "TOKEN";

export const setTokenInLocalStorage = (token: string) =>
  localStorage.setItem(TOKEN, token);

export const deleteTokenFromLocalStorage = () => localStorage.removeItem(TOKEN);

export const getTokenFromLocalStorage = () => localStorage.getItem(TOKEN) || "";
