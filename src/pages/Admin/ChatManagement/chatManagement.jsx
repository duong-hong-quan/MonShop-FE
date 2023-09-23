import { Layout, Menu, theme, Collapse } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useEffect, useRef, useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Table, Form, Modal, Badge, Button } from 'react-bootstrap';
import "./chatManagement.css"
import * as signalR from "@microsoft/signalr";
import { getAllRoom, getMessageByRoomID, getRoomByID } from "../../../services/chatServices";
import { decodeToken, isTokenExpired } from "../../../services/jwtHelper";
import jwtDecode from "jwt-decode";
import { getAccountByID, logout, refreshAccessToken } from "../../../services/userService";
import HeaderAdmin from "../../../components/HeaderAdmin/headerAdmin";
import SideMenu from '../../../components/SideMenu/sideMenu';
import { useNavigate } from 'react-router-dom';
import hosting from '../../../Utils/config';
import CreateRoomModal from './CreateRoomModal/createRoomModal';
import EditRoomModal from './EditRoomModal/editRoomModal';
import LoadingOverlay from '../../../components/Loading/LoadingOverlay';
import { formatDate } from '../../../Utils/util';
import _ from 'lodash';

const ChatManagement = () => {
    const chatContentRef = useRef(null);
    const [collapsed, setCollapsed] = useState(false);
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState(0);
    const [message, setMessage] = useState("");
    const userToken = decodeToken();
    const [room, setRoom] = useState({});
    const [contentChange, setContentChange] = useState(0);
    const [searchKey, setSearchKey] = useState("");
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [rooms, setRooms] = useState([]);
    const [roomsFilter, setRoomsFilter] = useState([]);

    const [account, setAccount] = useState({});
    const [user, setUser] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentRoom, setCurrentRoom] = useState({});
    const [isDisplay, setIsDisplay] = useState(true);
    const [loading, setLoading] = useState(true);
    const [disableButton, setDisableButton] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            let userToken = decodeToken();
            if (userToken.userRole == "admin" || userToken.userRole == "staff") {
                navigate("/management/chat");
            } else {
                navigate("/products");

            }
        } else {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (contentChange > 0) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [contentChange]);
    useEffect(() => {
        if (user && isTokenExpired()) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                refreshAccessToken();
            } else {
                logout();
            }
        }
    }, [user]);

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            let res = await getAccountByID(decodedToken?.AccountID);
            if (res.isSuccess) {
                setAccount(res.data);

            }
        }



    }

    useEffect(() => {
        const startConnection = async () => {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl(`${hosting}/chat`)
                .build();

            newConnection.onclose((error) => {
                console.log("Connection closed:", error);
            });

            newConnection.onreconnecting(() => {
                console.log("Reconnecting...");
            });

            newConnection.onreconnected(() => {
                console.log("Reconnected.");
            });

            try {
                await newConnection.start();
                setConnection(newConnection);

                newConnection.on("ReceiveAdminMessage", (message) => {
                    // Update the messages state with the new list of messages
                    console.log(message);
                    setMessages(message);
                    setContentChange(prevChange => prevChange + 1); // Tăng giá trị để kích hoạt cuộn xuống

                });
                newConnection.on("ReceiveAllRoom", (room) => {
                    // Update the messages state with the new list of messages
                    setRooms(room);
                    setRoomsFilter(room);

                });
            } catch (error) {
            }
        };

        startConnection();
    }, []);

    const fetchRoom = async () => {
        let res = await getAllRoom();
        if (res.isSuccess) {
            setRooms(res.data);
            setRoomsFilter(res.data);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRoom();
        fetchUser();
    }, [])

    const handleGetMessByRoom = async (id) => {

        setRoomId(id);
        setIsDisplay(false);
        console.log(roomId)
        let res = await getMessageByRoomID(id);
        let room = await getRoomByID(id);
        if (res.isSuccess && room.isSuccess) {
            setMessages(res.data);
            setRoom(room.data);


        }
        setTimeout(() => {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }, 100);
    }
    const sendMessage = async (roomIdToSend) => {
        if (message != "") {
            setDisableButton(true);

            console.log("Sending message...");

            if (connection && message.trim() !== "") {
                try {
                    console.log("About to invoke SendMessage...");

                    console.log({
                        "sender": parseInt(userToken.accountID),
                        "content": message,
                        "roomId": roomIdToSend
                    });

                    await connection.invoke("AddMessageAdmin", {
                        "sender": parseInt(userToken.accountID),
                        "content": message,
                        "roomId": roomIdToSend
                    });

                    console.log("Message sent successfully.");
                    setMessage("");
                    setContentChange(prevChange => prevChange + 1);
                    setDisableButton(false);
                } catch (error) {
                    console.error("Error sending message:", error);
                }
            }
        }

    };
    const handleAddClick = () => {
        setShowAddModal(true);
    }
    const handleEditClick = (room) => {
        setCurrentRoom(room);
        setShowEditModal(true);
    }
    const createRoom = async (room) => {
        console.log("Creating room...");
        if (connection) {

            try {
                console.log("About to invoke SendMessage...");

                console.log(room)
                await connection.invoke("CreateRoom", room);
                setShowAddModal(false);

            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    }

    const editRoom = async (room) => {
        if (connection) {

            try {
                console.log("About to invoke SendMessage...");

                console.log(room)
                await connection.invoke("UpdateRoom", room);
                setShowEditModal(false);
                await handleGetMessByRoom(room.roomId);

            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    }

    const deleteRoom = async (id) => {
        if (connection) {

            try {
                console.log("About to invoke SendMessage...");

                console.log(room)
                await connection.invoke("DeleteRoom", id);
                await handleGetMessByRoom(id);

            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    }


    const toggleOptions = (id) => {
        setSelectedRoomId(id);
        setShowOptions(!showOptions);
    };
    const handleSearch = (e) => {
        let temp = e.target.value;

        if (temp != "") {
            let tempData = roomsFilter.filter(room =>
                room.roomName.toLowerCase().includes(temp.toLowerCase()));
            setRooms(tempData);

        } else if (temp == "") {
            fetchRoom();
        }


    }
    return (<>
        <LoadingOverlay loading={loading} type={"Please wait..."}></LoadingOverlay>
        <Layout>
            <SideMenu collapsed={collapsed} />

            <Layout>
                <HeaderAdmin collapsed={collapsed} setCollapsed={setCollapsed}></HeaderAdmin>
                <Content
                    style={{

                        padding: 24,
                        minHeight: '900px',
                        background: '#fff',
                    }}
                >

                    <div className="container app">
                        <div className="row app-one">
                            <div className={`col-sm-4 side ${isDisplay ? 'show-on-mobile' : 'hide-on-mobile'}`}>
                                <div className="side-one">
                                    <div className=" heading">
                                        <h5>Messenger</h5>
                                        <Button style={{ backgroundColor: 'rgb(22, 119, 255)', color: 'white' }} onClick={() => handleAddClick()}>Create Room</Button>

                                    </div>

                                    <div className="row searchBox">
                                        <div className="col-sm-12 searchBox-inner">
                                            <div className="form-group has-feedback">
                                                <input id="searchText" type="text" className="form-control" name="searchText" placeholder="Search" onChange={(e) => handleSearch(e)} />
                                                <span className="glyphicon glyphicon-search form-control-feedback"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" sideBar">
                                        {rooms && rooms.map((room, index) => {
                                            return (
                                                <div key={index} className="row sideBar-body" onClick={() => handleGetMessByRoom(room.roomId)}>
                                                    <div className="d-flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div className='d-flex' style={{ alignItems: 'center' }}>
                                                            <div className="avatar-icon">
                                                                <img src={room.roomImg} />
                                                            </div>
                                                            <div className="">
                                                                <span className="name-meta">{room.roomName}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="d-inline-block">
                                                            <Button onClick={() => toggleOptions(room.roomId)}>
                                                                <i className="fa fa-ellipsis-vertical"></i>
                                                            </Button>

                                                        </div>
                                                        {showOptions && room.roomId === selectedRoomId && (
                                                            <ul className="list-group position-absolute " style={{ bottom: '-45px', right: '25px', zIndex: '1' }}>
                                                                <li className='list-group-item' onClick={() => handleEditClick(room)}>Edit Room</li>
                                                                <li className='list-group-item' onClick={() => deleteRoom(room.roomId)}>Delete Room</li>
                                                            </ul>
                                                        )}
                                                    </div>

                                                </div>

                                            )
                                        })}

                                    </div>


                                </div>

                            </div>

                            <div className={`col-sm-8 conversation ${isDisplay ? "hide-on-mobile" : "show-on-mobile"}`}>
                                <div className="heading-room" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#eee', padding: "10px 16px 10px 15px" }}>
                                    <div style={{ margin: '0 5px' }} className={`show-on-mobile-button`}>
                                        <Button onClick={() => setIsDisplay(true)} > <i className="fa-solid fa-backward-step"></i></Button>
                                    </div>
                                    <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                                        <div className="heading-avatar-icon">
                                            <img src={room.roomImg} alt="room" />
                                        </div>
                                    </div>
                                    <div className="">
                                        <span className="heading-name-meta">{room.roomName}
                                        </span>
                                    </div>

                                </div>

                                <div className=" message" id="conversation"
                                    ref={chatContentRef}

                                >
                                    {messages && messages.map((mess, index) => {

                                        return (
                                            <div key={index} className=" message-body">
                                                <div className={mess.sender != userToken.accountID ? "message-main-receiver" : "message-main-sender"}>
                                                    <div className={mess.sender != userToken.accountID ? "receiver" : "sender"}>
                                                        <div className="message-text">
                                                            {mess.content}
                                                        </div>
                                                        <span className="message-time">
                                                            {formatDate(mess.sendTime)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })}


                                </div>

                                <div className=" reply">
                                    <Form onSubmit={(e) => {
                                        e.preventDefault(); // Ngăn chặn tải lại trang mặc định
                                        sendMessage(roomId); // Gửi tin nhắn
                                    }} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                        <div className=" reply-main" >
                                            <input className="form-control" rows="1" id="comment" value={message} onChange={(e) => setMessage(e.target.value)}></input>
                                        </div>

                                        <Button className=" reply-send" onClick={() => sendMessage(roomId)} disabled={disableButton} type="submit">
                                            <i className="fa-solid fa-paper-plane"></i>
                                        </Button>
                                    </Form>

                                </div>
                            </div>
                        </div>
                    </div>

                </Content>
            </Layout>
        </Layout>
        <CreateRoomModal show={showAddModal} onHide={() => setShowAddModal(false)} createRoom={createRoom}></CreateRoomModal>
        <EditRoomModal show={showEditModal} onHide={() => setShowEditModal(false)} currentRoom={currentRoom} editRoom={editRoom}></EditRoomModal>

    </>)
}

export default ChatManagement;