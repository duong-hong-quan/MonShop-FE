import axios from "./customizeAxios"

const fetchAccount = () =>{
    return axios.get("/Account/GetAllAccount");
}
export {fetchAccount}