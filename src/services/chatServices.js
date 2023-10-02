import axios from "../services/customizeAxios"

const getAllMessageByAccountID = (accountID) =>{
    return axios.get(`/Message/GetAllMessageByAccountID/${accountID}`)
}

const getAllRoom = () =>{
    return axios.get("/Message/GetAllRoom");
}

const getRoomByID = (id) =>{
    return axios.get(`Message/GetRoomByID/${id}`);
}
const getMessageByRoomID =(id) =>{
    return axios.get(`Message/GetMessageByRoomID/${id}`)
}
export {getAllMessageByAccountID, getAllRoom,getMessageByRoomID,getRoomByID }