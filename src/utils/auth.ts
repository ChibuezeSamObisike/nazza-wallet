/* eslint-disable camelcase */

import jwtDecode from "jwt-decode";

type TokenType = "userToken" | "adminToken";

export const setToken = (tokenType: TokenType, token: string): void => {
  localStorage.setItem(tokenType, token);
};

export const getToken = (tokenType: TokenType): string | null => {
  return localStorage.getItem(tokenType);
};

export const setName = (name: string): void => {
  localStorage.setItem("name", name);
};

export const getName = (): string | null => {
  return localStorage.getItem("name");
};

export const getDecodedJwt = (tokenType: TokenType, tokn: string = ""): any => {
  try {
    const token = getToken(tokenType);

    const t = token || tokn;
    const decoded = jwtDecode(t);
    return decoded;
  } catch (e) {
    return {};
  }
};

export const setRefreshToken = (refreshToken: string): void => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const removeDomainObj = (): void => {
  localStorage.removeItem("domain");
};

export const removeToken = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const logOut = (cb: VoidFunction): void => {
  removeToken();
  cb();
};

export const logOutFromAdmin = (cb: VoidFunction): void => {
  localStorage.removeItem("adminToken");
  cb();
};

export const isAuthenticated = (tokenType: TokenType) => {
  try {
    const decodedToken = getDecodedJwt(tokenType);
    if (decodedToken) {
      const { exp } = decodedToken;
      const currentTime = Date.now() / 1000;
      return exp > currentTime;
    }
    return false;
  } catch (e) {
    return false;
  }
};
