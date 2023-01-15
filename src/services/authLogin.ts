import http from "utils/http";

export const login = async (payload: any) => {
  console.log("Payload", payload.data);
  return http
    .post("user/login/", payload.data)
    .then((res) => {
      console.log("Res>>>", res);
      return res;
    })
    .then((res) => {
      console.log("Res>>>", res);
      return res;
    })
    .catch((err) => console.log("Error>>>>", err));
};
