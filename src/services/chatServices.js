import axios from "../services/customizeAxios"

const getAllMessageByAccountID = (accountID) =>{
    return axios.get(`/Message/GetAllMessageByAccountID?AccountID=${accountID}`)
}
export {getAllMessageByAccountID }