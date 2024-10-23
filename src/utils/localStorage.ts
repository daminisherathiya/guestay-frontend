const AUTHENTICATION_TOKEN_STRING = "authentication_token";

export const getAuthenticationToken = () => {
  return localStorage.getItem(AUTHENTICATION_TOKEN_STRING);
};
