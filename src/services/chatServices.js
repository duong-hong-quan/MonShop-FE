import axios from "../services/customizeAxios"

const getAllMessageByAccountID = (accountID) =>{
    return axios.get(`/Message/GetAllMessageByAccountID?AccountID=${accountID}`)
}

const getAllRoom = () =>{
    return axios.get("/Message/GetAllRoom");
}

const getRoomByID = (id) =>{
    return axios.get(`Message/GetRoomByID?roomID=${id}`);
}
const getMessageByRoomID =(id) =>{
    return axios.get(`Message/GetMessageByRoomID?roomID=${id}`)
}
export {getAllMessageByAccountID, getAllRoom,getMessageByRoomID,getRoomByID }