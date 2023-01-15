/* eslint-disable camelcase */

import jwtDecode from "jwt-decode";

export const setToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const getDecodedJwt = (tokn: string = "") => {
  try {
    const token = getToken();
    const t = token || tokn;
    const decoded = jwtDecode(t);
    return decoded;
  } catch (e) {
    return {};
  }
};

export const setRefreshToken = (refreshToken: string) => {
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

export const isAuthenticated = () => {
  try {
    const decodedToken = getDecodedJwt();
    if (decodedToken) {
      // const currentTime = Date.now() / 1000;
      // return decodedToken?.exp > currentTime;
      return false;
    }
    return false;
  } catch (e) {
    return false;
  }
};
