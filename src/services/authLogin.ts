import http from "utils/http";

export const login = async (payload: any) => {
  return http
    .post("user/login/", payload)
    .then((res) => {
      console.log("Res>>>", res);
      return res.data;
    })
    .catch((err) => console.log("Error>>>>", err));
};
