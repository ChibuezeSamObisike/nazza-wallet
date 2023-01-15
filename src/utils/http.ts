import axios, { AxiosRequestConfig } from "axios";

import { getToken, isAuthenticated } from "./auth";

export const baseUrl =
  process.env.REACT_APP_API_BASE_URL || "https://api.py.prowoks.co/api/v1";

const Api = axios.create({
  baseURL: baseUrl,
});

// Request interceptor for API calls
Api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.headers = {
      Authorization: isAuthenticated() ? `Bearer ${getToken()}` : "",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
Api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log({ error });
    // const originalRequest = error?.config;
    // if (error?.response?.status === 401 && !originalRequest?._retry) {
    //   originalRequest._retry = true;
    //   const rToken = getRefreshToken();
    //   if (rToken) {
    //     const access_token = await refreshToken(rToken);
    //     axios.defaults.headers.common["Authorization"] =
    //       "Bearer " + access_token;
    //   }
    //   return Api(originalRequest);
    // }
    return Promise.reject(error);
  }
);

// function refreshToken(token: string) {
//   return Api.post("/auth/token/refresh/", {
//     refresh: token,
//   });
// }

export default Api;
