import axios from "./customizeAxios"

const fetchAllProduct = () =>{
    return axios.get("/Product/GetAllProduct");
}
const addProduct = (productData) => {
    return axios.post("/Product/AddProduct", productData);
  };

  const getProductByID = (id) => {
    return axios.get(`/Product/GetProductByID?id=${id}`);
  };
  
  const fetchAllCategories = async () => {
    return axios.get("/Product/GetAllCategory");
  };

  const checkOut = (orderData)=>{
    return axios.post("/Order/AddOrderRequest",orderData);
  }
export {fetchAllProduct, addProduct,fetchAllCategories,getProductByID,checkOut}