import axios from "./customizeAxios"

const fetchAllProduct = () => {
  return axios.get("/Product/GetAllProduct");
}
const fetchAllProductByManager = () => {
  return axios.get("/Product/GetAllProductByManager");
}
const addProduct = (productData) => {
  return axios.post("/Product/AddProduct", productData);
};
const editProduct = (productData) => {
  return axios.put("/Product/UpdateProduct", productData);
}
const getProductByID = (id) => {
  return axios.get(`/Product/GetProductByID/${id}`);
};

const fetchAllCategories = async () => {
  return axios.get("/Product/GetAllCategory");
};
const fetchAllStatus = async () => {
  return axios.get("/Product/GetAllProductStatus");
};

const checkOut = (orderData) => {
  return axios.post("/Order/AddOrderRequest", orderData);
}

const deleteProduct = (productData) => {
  return axios.delete("/Product/DeleteProduct", {
    data: productData,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
const getTopX = (x) => {
  return axios.get(`/Product/GetTopXProduct/${x}`);
}

const getAllSize = () => {
  return axios.get("/Product/GetAllSize");
}
const getProductInventory = (productId, sizeId) => {
  return axios.get(`/Product/GetProductInventory/${productId}/${sizeId}`);
}
export { getProductInventory, getAllSize, getTopX, fetchAllProductByManager, fetchAllProduct, addProduct, fetchAllCategories, getProductByID, checkOut, fetchAllStatus, editProduct, deleteProduct }