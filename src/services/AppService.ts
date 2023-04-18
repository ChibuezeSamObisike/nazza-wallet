import http from "utils/http";

export const login = async (payload: any) => {
  return http.post("user/login/", payload.data).then((res) => {
    return res.data;
  });
};

export const register = async (data: any) => {
  console.log("Register data", data);
  return http.post("user/register/", data).then((res) => {
    return res.data;
  });
};

export const sellCoin = async (data: any) => {
  console.log("Sell coin API", data);
  return http.post("trade/sell/", data).then((res) => {
    return res.data;
  });
};

export const verify = async (data: any) => {
  return http.post("user/verify/", data).then((res) => {
    return res.data;
  });
};

export const getCoinRates = async () => {
  return http.get("trade/coins").then((res) => {
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

export const getBankAcctName = async ({ data }: any) => {
  return http.post("user/bank/acc_name/", data).then((res) => {
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

  return http
    .get(`trade/history?page=${currPage}&limit=${rowsPerPage}`)
    .then((res) => {
      console.log("trade data", res.data);
      return res.data;
    });
};

export const addBankFunc = async (data: any) => {
  return http.post("user/bank/add", data).then((res) => res.data);
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

export const updateProfile = async (data: any) => {
  console.log("From API", data);
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

export const deleteBank = async (id: any) => {
  console.log("query keyyyyyyyss", id);
  return http.delete(`user/bank/${id}`);
};

export const getAdminStats = async () => {
  return http.get(`admin/stats`).then((res) => {
    return res.data;
  });
};

export const getTrades = async ({ queryKey }: any) => {
  const [, { rowsPerPage, currPage }] = queryKey;

  return http
    .get(`admin/trades?page=${currPage}&limit=${rowsPerPage}`)
    .then((res) => {
      console.log("trades data", res.data);
      return res.data;
    });
};

export const getTrade = async ({ queryKey }: any) => {
  const [, { id }] = queryKey;

  return http.get(`admin/trade/${id}`).then((res) => {
    console.log("trades data", res.data);
    return res.data;
  });
};

export const getAllUsers = async ({ queryKey }: any) => {
  const [, { rowsPerPage, currPage }] = queryKey;

  return http
    .get(`admin/users?page=${currPage}&limit=${rowsPerPage}`)
    .then((res) => {
      console.log("trades data", res.data);
      return res.data;
    });
};
