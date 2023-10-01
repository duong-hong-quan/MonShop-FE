import axios from "./customizeAxios";

const getURLMomo = (OrderID) => {
  return axios.post(`Payment/GetPaymentURLMomo/${OrderID}`);
};

const getURLVNPAY = (OrderID) => {
  return axios.post(`Payment/GetPaymentURLVNPay/${OrderID}`);
};

const getURLPayPal = (OrderID) => {
  return axios.post(`Payment/GetPaymentURLPayPal/${OrderID}`);
};
const getOrderByAccountID = (AccountID, StatusID) => {
  return axios.get(
    `/Order/GetAllOrderByAccountID/${AccountID}/${StatusID}`
  );
};

const getOrderByAccount = (AccountID) => {
  return axios.get(
    `/Order/GetAllOrderByAccountID/${AccountID}`
  );
};
const getListItemByOrderID = (OrderId) => {
  return axios.get(`/Order/GetListItemByOrderID/${OrderId}
`);
};

const getAllOrder = () => {
  return axios.get("/Order/GetAllOrder");
};

const getAllOrderStatus = () => {
  return axios.get("/Order/GetAllOrderStatus");
};

const updateStatusForOrder = (OrderID, status) => {
  return axios.put(
    `/Order/UpdateStatusForOrder?OrderID=${OrderID}&status=${status}`
  );
};

const getOrderStatistic = (accountID) => {
  return axios.get(`/Order/GetOrderStatistic?AccountID=${accountID}`);
};

const verifyOrder = (OrderID) => {
  return axios.get(`/Order/VerifyOrder?OrderID=${OrderID}`);
};

const addOrderRequest = (data) => {
  return axios.post("/Order/AddOrderRequest", data);
};
export {
  addOrderRequest,
  verifyOrder,
  getOrderStatistic,
  updateStatusForOrder,
  getAllOrderStatus,
  getAllOrder,
  getURLMomo,
  getURLVNPAY,
  getURLPayPal,
  getOrderByAccountID,
  getListItemByOrderID,
  getOrderByAccount
};
