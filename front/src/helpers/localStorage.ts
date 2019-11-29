const TOKEN = "TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";

export const setTokensInLocalStorage = (
  token: string,
  refreshToken: string
) => {
  localStorage.setItem(TOKEN, token);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const getTokenFromLocalStorage = () => localStorage.getItem(TOKEN) || "";
export const getRefreshTokenFromLocalStorage = () =>
  localStorage.getItem(REFRESH_TOKEN) || "";
