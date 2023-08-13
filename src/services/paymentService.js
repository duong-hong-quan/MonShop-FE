import axios from "./customizeAxios"

const getURLMomo = (OrderID) =>{
    return axios.post(`Payment/GetPaymentURLMomo?OrderID=${OrderID}`);
}

const getURLVNPAY = (OrderID) =>{
    return axios.post(`Payment/GetPaymentURLVNPay?OrderID=${OrderID}`);
}

const getURLPayPal= (OrderID) =>{
    return axios.post(`Payment/GetPaymentURLPayPal?OrderID=${OrderID}`);
}

export {getURLMomo, getURLVNPAY, getURLPayPal}
