import axios from "./customizeAxios";

const getURLMomo = (OrderID) => {
  return axios.post(`Payment/GetPaymentURLMomo?OrderID=${OrderID}`);
};

const getURLVNPAY = (OrderID) => {
  return axios.post(`Payment/GetPaymentURLVNPay?OrderID=${OrderID}`);
};

const getURLPayPal = (OrderID) => {
  return axios.post(`Payment/GetPaymentURLPayPal?OrderID=${OrderID}`);
};
const getOrderByAccountID = (AccountID, StatusID) => {
  return axios.get(
    `/Order/GetAllOrderByAccountID?AccountID=${AccountID}&OrderStatusID=${StatusID}`
  );
};
const getListItemByOrderID = (OrderId) => {
  return axios.get(`/Order/GetListItemByOrderID?orderID=${OrderId}
`)
}

const getAllOrder = () => {
  return axios.get("/Order/GetAllOrder");
}

const getAllOrderStatus = () => {
  return axios.get("/Order/GetAllOrderStatus");
}

const updateStatusForOrder = (OrderID, status) => {
  return axios.put(`/Order/UpdateStatusForOrder?OrderID=${OrderID}&status=${status}`);
}

const getOrderStatistic = (accountID) => {
  return axios.get(`/Order/GetOrderStatistic?AccountID=${accountID}`);
}

const verifyOrder = (OrderID) => {
  return axios.get(`/Order/VerifyOrder?OrderID=${OrderID}`)
}
export { verifyOrder,getOrderStatistic, updateStatusForOrder, getAllOrderStatus, getAllOrder, getURLMomo, getURLVNPAY, getURLPayPal, getOrderByAccountID, getListItemByOrderID };
