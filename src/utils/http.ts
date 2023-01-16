import axios, { AxiosRequestConfig } from "axios";

import { getToken, isAuthenticated } from "./auth";

export const baseUrl = "https://api.mynazza.com/";

const http = axios.create({
  baseURL: baseUrl,
});

http.defaults.headers.common["Content-Type"] = "application/json";
http.defaults.headers.common["x-auth-apiKey"] = 1;

// Request interceptor for API calls
http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.headers = {
      Authorization: isAuthenticated() ? `Bearer ${getToken()}` : "",
      "x-auth-apiKey": "1",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
// http.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     console.log({ error });
//     // const originalRequest = error?.config;
//     // if (error?.response?.status === 401 && !originalRequest?._retry) {
//     //   originalRequest._retry = true;
//     //   const rToken = getRefreshToken();
//     //   if (rToken) {
//     //     const access_token = await refreshToken(rToken);
//     //     axios.defaults.headers.common["Authorization"] =
//     //       "Bearer " + access_token;
//     //   }
//     //   return Api(originalRequest);
//     // }
//     return Promise.reject(error);
//   }
// );

export default http;
