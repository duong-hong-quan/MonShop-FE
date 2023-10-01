import axios from "./customizeAxios";
import { decodeToken } from "./jwtHelper";

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
  return axios.get(`Account/GetAccountByID/${accountID}`);
};

const addAccount = (data) => {
  return axios.post("/Account/AddAccount", data);
}
const refreshAccessToken = () => {
  let refreshToken = localStorage.getItem("refreshToken");
  let decode = decodeToken(localStorage.getItem("token"));


  return axios.get(`/Account/GetNewToken?refreshToken=${refreshToken}&accountId=${decode.accountID}`);
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

const assignRole = (userId , role)=>{
  return axios.post(`/Account/AssignRole?userId=${userId}&roleName=${role}`)
}

const changePassword = (data) => {
  return axios.post("/Account/ChangePassword", data);
}


const getAllAddress = (userId) =>{
  return axios.get(`/Address/GetAllAddressByUserId/${userId}`)
}
const addAddress = (data)=>{
  return axios.post("/Address/AddAddress", data)
}

const updateAddress = (data)=>{
  return axios.put("/Address/UpdateAddress", data)
}

const deleteAddress = (data)=>{
  return axios.delete("/Address/RemoveAddress", {
    data: data,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
export { deleteAddress, updateAddress,addAddress,getAllAddress,changePassword, signUp, addAccount, fetchAllAccount, fetchAllRole, login, getAccountByID, logout, refreshAccessToken, deleteAccount, editAccount, assignRole };
