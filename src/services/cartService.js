import axios from "./customizeAxios"

const addToCart = (data) =>{
    return axios.post("/Cart/AddToCart", data);
}

const removeFromCart = (data) =>{
    return axios.post("/Cart/RemoveFromCart", data);
}

const updateCartItem = (data)=>{
    return axios.put("/Cart/UpdateCartItem",data)
}
const getCartByUserId = (userId)=>{
    return axios.get(`/Cart/GetItemsByAccountId/${userId}`)
}

export {updateCartItem,removeFromCart,addToCart, getCartByUserId}