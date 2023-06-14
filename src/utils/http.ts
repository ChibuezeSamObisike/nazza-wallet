import axios, { AxiosRequestConfig } from "axios";

import { getToken, isAuthenticated } from "./auth";

export const baseUrl = "https://api.mynazza.com/";

const http = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

http.defaults.headers.common["Content-Type"] = "application/json";
http.defaults.headers.common["x-auth-apiKey"] = 1;

const refresh = async () => {
  const response = await http.post("user/refreshtoken", {
    refreshToken: "",
  });
  return response;
};

refresh()
  .then((x) => console.log("Refresh then", x))
  .catch((x) => console.log("Refresh Error", x));

// Request interceptor for API calls
http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.headers = {
      "x-auth-token": isAuthenticated() ? `${getToken()}` : "",
      "x-auth-apiKey": "1",
    };
    return config;
  },
  async (error) => {
    // console.log("Error>>>>>", error);
    // const prevRequest = error?.config;
    // if (error?.response?.status === 400 && !prevRequest?.sent) {
    //   const refreshT = await refresh();
    //   console.log("Refresh Token", refreshT);
    // }

    Promise.reject(error);
  }
);
http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Error>>>>>", error);
    const prevRequest = error?.config;
    if (error?.response?.status === 400) {
      const refreshT = await refresh();
      console.log("Refresh Token", refreshT);
      prevRequest.headers[
        "x-auth-token"
      ] = `Bearer ${refreshT.data?.accessToken}`;

      return http(prevRequest);
    }

    Promise.reject(error);
  }
);

// Response interceptor for API calls
// http.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//
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
