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

export const profile = async () => {
  return http.get("user/profile").then((res) => {
    return res.data;
  });
};

export const getHistory = async ({ queryKey }: any) => {
  const [, { rowsPerPage, currPage }] = queryKey;
  console.log("QueryKey", rowsPerPage, currPage);
  return http
    .get(`trade/history?page=${1}&limit=${rowsPerPage}`)
    .then((res) => {
      return res.data;
    });
};

export const getTotalPayout = async () => {
  return http.get(`trade/totalpayout`).then((res) => {
    return res.data;
  });
};

export const getProfileDetails = async () => {
  return http.get(`user/profile`).then((res) => {
    return res.data;
  });
};

export const getNotifications = async () => {
  return http.get(`user/notifications`).then((res) => {
    return res.data;
  });
};

export const resetPassword = async ({ data }: any) => {
  return http.put("user/changepassword", data).then((res) => res.data);
};

export const toggle2fa = async () => {
  return http.put("user/toggle2fa").then((res) => res.data);
};

export const login2fa = async (data: any) => {
  console.log("Login 2fa data", data);
  return http.post("user/login/2fa", data).then((r) => r.data);
};

export const changeName = async ({ data }: any) => {
  return http.put("user/changename", data).then((r) => r.data);
};

export const updateProfile = async ({ data }: any) => {
  return http.put("user/profile", data).then((r) => r.data);
};

export const getBanks = async () => {
  return http.get(`user/banks`).then((res) => {
    return res.data;
  });
};

export const getBankList = async () => {
  return http.get(`user/banks/list`).then((res) => {
    return res.data;
  });
};

export const deleteBank = async ({ queryKey }: any) => {
  console.log("query keyyyyyyyss", queryKey);
  return http.delete(`user/bank/${1234}`).then((res) => res.data);
};
