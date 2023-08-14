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
const getListItemByOrderID = (OrderId)=>{
return axios.get(`/Order/GetListItemByOrderID?orderID=${OrderId}
`)
}
export { getURLMomo, getURLVNPAY, getURLPayPal, getOrderByAccountID, getListItemByOrderID };
