import axios from "./customizeAxios"

const  getAllInventory= ()=>{
    return axios.get(`Product/GetAllProductInventory`);
}
const  importInventory= (data)=>{
    return axios.post(`Product/ImportProductInventory`,data);
}
const  editInventory= (data)=>{
    return axios.put(`Product/UpdateProductInventory`,data);
}
export {getAllInventory,importInventory,editInventory}