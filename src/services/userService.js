import instance from "./customizeAxios";
import axios from "./customizeAxios";

const fetchAllAccount = () => {
  return axios.get("/Account/GetAllAccount");
};
const fetchAllRole = () => {
  return axios.get("/Account/GetAllRole");
};
const login = (object) => {
  return axios.post("/Account/Login", object);
};
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};
const getAccountByID = (accountID) => {
  return axios.get(`Account/GetAccountByID?AccountID=${accountID}`);
};

const addAccount = (data) => {
  return axios.post("/Account/AddAccount", data);
}
const refreshAccessToken = () => {
  let refreshToken = localStorage.getItem("refreshToken");

  return axios.get(`/Account/GetNewToken?refreshToken=${refreshToken}`);
}
const deleteAccount = (data) => {
  return axios.delete("/Account/DeleteAccount", {
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

const editAccount = (data) => {
  return axios.put("/Account/UpdateAccount", data);
}

const signUp = (data) => {
  return axios.post("/Account/SignUp", data);
}

const changePassword = (data) => {
  return axios.post("/Account/ChangePassword", data);
}
export { changePassword, signUp, addAccount, fetchAllAccount, fetchAllRole, login, getAccountByID, logout, refreshAccessToken, deleteAccount, editAccount };
