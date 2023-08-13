import instance from "./customizeAxios";
import axios from "./customizeAxios";

const fetchAccount = () => {
  return axios.get("/Account/GetAllAccount");
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

export { fetchAccount, login, getAccountByID, logout };
