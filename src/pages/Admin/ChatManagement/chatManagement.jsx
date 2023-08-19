import { Layout, Menu, Button, theme, Collapse } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useEffect, useRef, useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Table, Form, Modal, Badge } from 'react-bootstrap';
import "./chatManagement.css"
import * as signalR from "@microsoft/signalr";
import { getAllRoom, getMessageByRoomID, getRoomByID } from "../../../services/chatServices";
import { decodeToken, isTokenExpired } from "../../../services/jwtHelper";
import jwtDecode from "jwt-decode";
import { getAccountByID, logout, refreshAccessToken } from "../../../services/userService";
import HeaderAdmin from "../../../components/HeaderAdmin/headerAdmin";
import SideMenu from '../../../components/SideMenu/sideMenu';
import { useNavigate } from 'react-router-dom';

const ChatManagement = () => {
    const chatContentRef = useRef(null);
    const [collapsed, setCollapsed] = useState(false);
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState(0);
    const [message, setMessage] = useState("");
    const userToken = decodeToken();
    const [room, setRoom] = useState({});
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [rooms, setRooms] = useState([]);
    const [account, setAccount] = useState({});
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            let userToken = decodeToken();
            if (userToken.userRole == "admin" || userToken.userRole == "staff") {
                navigate("/management/chat");
            }else{
                navigate("/products");

            }
        } else {
            navigate("/login");
        }
    }, []);

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
            if (res) {
                setAccount(res);

            }
        }



    }

    useEffect(() => {
        const startConnection = async () => {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl("https://localhost:7022/chat")
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
                console.log("Connection started.");
                setConnection(newConnection);

                newConnection.on("ReceiveAdminMessage", (message) => {
                    // Update the messages state with the new list of messages
                    console.log(message);
                    setMessages(message);
                    chatContentRef.current.scrollTop =
                        chatContentRef.current.scrollHeight;
                });
                newConnection.on("ReceiveAllRoom", (room) => {
                    // Update the messages state with the new list of messages
                    console.log(room);
                    setRooms(room);

                });
            } catch (error) {
                console.error("Error starting connection:", error);
            }
        };

        startConnection();
    }, []);

    const fetchRoom = async () => {
        let res = await getAllRoom();
        if (res) {
            setRooms(res);
        }
    }

    useEffect(() => {
        fetchRoom();
        fetchUser();
    }, [])

    const handleGetMessByRoom = async (id) => {

        setRoomId(id);
        console.log(roomId)
        let res = await getMessageByRoomID(id);
        let room = await getRoomByID(id);
        if (res && room) {
            setMessages(res);
            setRoom(room);
        }
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;

    }
    const sendMessage = async (roomIdToSend) => {

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
                chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;

            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };
    return (<>

        <Layout>
            <SideMenu collapsed={collapsed} />

            <Layout>
                <HeaderAdmin collapsed={collapsed} setCollapsed={setCollapsed}></HeaderAdmin>
                <Content
                    style={{

                        padding: 24,
                        minHeight: 280,
                        background: '#fff',
                    }}
                >

                    <div className="container app">
                        <div className="row app-one">
                            <div className="col-sm-4 side">
                                <div className="side-one">
                                    <div className=" heading">
                                        <h5>Messenger</h5>
                                        <Button style={{ backgroundColor: 'rgb(22, 119, 255)', color: 'white' }}>Create Room</Button>

                                    </div>

                                    <div className="row searchBox">
                                        <div className="col-sm-12 searchBox-inner">
                                            <div className="form-group has-feedback">
                                                <input id="searchText" type="text" className="form-control" name="searchText" placeholder="Search" />
                                                <span className="glyphicon glyphicon-search form-control-feedback"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" sideBar">
                                        {rooms && rooms.map((room, index) => {
                                            return (
                                                <div key={index} className="row sideBar-body" onClick={() => handleGetMessByRoom(room.roomId)}>
                                                    <div className="col-sm-3 col-xs-3 sideBar-avatar">
                                                        <div className="avatar-icon">
                                                            <img src={room.roomImg} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9 col-xs-9 sideBar-main">
                                                        <div className="row">
                                                            <div className="col-sm-8 col-xs-8 sideBar-name">
                                                                <span className="name-meta">{room.roomName}
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        })}

                                    </div>


                                </div>

                            </div>

                            <div className="col-sm-8 conversation">
                                <div className="heading-room" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#eee', padding: "10px 16px 10px 15px" }}>
                                    <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                                        <div className="heading-avatar-icon">
                                            <img src={room.roomImg} alt="" />
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
                                                        <span className="message-time pull-right">
                                                            Sun
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })}


                                </div>

                                <div className=" reply">

                                    <div className=" reply-main" >
                                        <input className="form-control" rows="1" id="comment" value={message} onChange={(e) => setMessage(e.target.value)}></input>
                                    </div>

                                    <div className=" reply-send" onClick={() => sendMessage(roomId)}>
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Content>
            </Layout>
        </Layout>
    </>)
}

export default ChatManagement;