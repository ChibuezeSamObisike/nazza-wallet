import http from "utils/http";

export const login = async (payload: any) => {
  return http.post("user/login/", payload.data).then((res) => {
    return res.data;
  });
};

export const register = async (payload: any) => {
  return http.post("user/register/", payload.data).then((res) => {
    return res.data;
  });
};

export const verify = async (data: any) => {
  console.log("verify data", data);
  return http.post("user/verify/", data).then((res) => {
    return res.data;
  });
};

export const newPassword = async ({ data }: any) => {
  return http.post("user/newpassword/", data).then((res) => {
    return res.data;
  });
};

export const reset = async ({ data }: any) => {
  return http.post("user/reset/", data).then((res) => {
    return res.data;
  });
};
