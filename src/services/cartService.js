import axios from "./customizeAxios"

const addToCart = (data) =>{
    return axios.post("/Cart/AddToCart", data);
}

export {addToCart}