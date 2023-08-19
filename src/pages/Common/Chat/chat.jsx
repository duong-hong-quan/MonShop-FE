import React, { useEffect, useRef, useState } from "react";
import "./chat.css"; // Import your custom CSS for the chat component
import * as signalR from "@microsoft/signalr";
import { Button, Modal } from "react-bootstrap"; // Import necessary components
import { getAllMessageByAccountID } from "../../../services/chatServices";
import { decodeToken, isTokenExpired } from "../../../services/jwtHelper";
import { refreshAccessToken, logout } from "../../../services/userService"
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import hosting from "../../../Utils/config";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [connection, setConnection] = useState(null);
  const [senderId, setSenderId] = useState(0);
  const chatContentRef = useRef(null);
  const [user, setUser] = useState(null);
  const [isManager, setIsManager] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token != null || token != undefined) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      let user = decodeToken();
      if (user.userRole == "admin" || user.userRole == "staff") {
        setIsManager(true);
      }
    }
  }, []);

  const getAllMessageByAccount = async () => {
    const userToken = decodeToken();
    setSenderId(userToken?.accountID);

    if (userToken !== null) {
      try {
        let res = await getAllMessageByAccountID(userToken?.accountID);

        if (res) {
          console.log(res)
          setMessages(res);
        }
        if (res.status == 400) {
          setMessages([]);

        }

      } catch (error) {
      }

    }
  };
  useEffect(() => {
    getAllMessageByAccount();

  }, []);
  useEffect(() => {
    const startConnection = async () => {
      const userToken = await decodeToken();
      setSenderId(userToken?.accountID);
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
        console.log("Connection started.");
        setConnection(newConnection);

        newConnection.on("ReceiveMessage", (newMessageList) => {
          // Update the messages state with the new list of messages
          console.log(newMessageList);
          setMessages(newMessageList);
          chatContentRef.current.scrollTop =
            chatContentRef.current.scrollHeight;
        });
      } catch (error) {
        console.error("Error starting connection:", error);
      }
    };

    startConnection();
  }, []);



  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleOpenModal = () => {

    setShowModal(true);

  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const sendMessage = async () => {
    if (user != null) {
      console.log("Sending message...");
      const userToken = await decodeToken();

      if (connection && message.trim() !== "") {
        try {
          console.log("About to invoke SendMessage...");

          console.log({
            accountID: parseInt(userToken?.accountID),
            message: message,
          });

          await connection.invoke("SendMessage", {
            accountID: parseInt(userToken?.accountID),
            message: message,
          });

          console.log("Message sent successfully.");

          setMessage("");
          chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    } else {
      toast.error("Please log in to chat");
      navigator("/login");
    }

  };

  return (
    <>
      <div className="chat-button">
        {!showModal &&
          <Button style={{ backgroundColor: 'black', color: 'white', border: 'none', height: '50px', width: '50px', borderRadius: '50%', display: isManager == true ? "none" : "block" }} onClick={handleOpenModal}>
            <i className="fa-solid fa-comment-dots"></i>{" "}
          </Button>
        }

        <div className="page-content page-container" id="page-content" style={{ borderRadius: '5px', display: showModal ? "block" : "none" }}>
          <div className="row  d-flex justify-content-center">
            <div className="col-md-12">
              <div className="title d-flex" style={{ justifyContent: 'space-between', backgroundColor: 'rgb(233,233,233)', padding: '10px', alignItems:'center' }}>
                <span>Chat</span>
                <span><Button style={{ backgroundColor: 'red', border: 'none' }} onClick={() => handleCloseModal()}><i className="fa-solid fa-xmark"></i></Button></span>
              </div>
              <div className="card card-bordered">
                <div
                  className="ps-container ps-theme-default ps-active-y"
                  id="chat-content"
                  ref={chatContentRef}
                >
                  {messages && messages.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`media media-chat ${item.sender == senderId ? "media-chat-reverse" : ""
                          }`}
                      >
                        <img
                          className="avatar"
                          src="https://img.icons8.com/color/36/000000/administrator-male.png"
                          alt="..."
                        />
                        <div className="media-body" width="100%">
                          <p>{item.content}</p>

                          {/* <p class="meta">
                        <time datetime="2018">{item.sendTime}</time>
                      </p> */}
                        </div>
                      </div>

                    )
                  }
                  )}

                  <div
                    className="ps-scrollbar-x-rail"
                    style={{ left: 0, bottom: 0 }}
                  >
                    <div
                      className="ps-scrollbar-x"
                      style={{ left: 0, width: 0 }}
                    ></div>
                  </div>
                  <div
                    className="ps-scrollbar-y-rail"
                    style={{ top: 0, height: 0, right: "2px" }}
                  >
                    <div
                      className="ps-scrollbar-y"
                      style={{ top: 0, height: "2px" }}
                    ></div>
                  </div>
                </div>

                <div className="publisher bt-1 border-light">
                  <img
                    className="avatar avatar-xs"
                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                    alt="..."
                  />
                  <input
                    className="publisher-input"
                    type="text"
                    placeholder="Write something"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <span className="publisher-btn file-group">
                    <i className="fa fa-paperclip file-browser"></i>
                    <input type="file" />
                  </span>
                  <a className="publisher-btn" href="#" data-abc="true">
                    <i className="fa fa-smile"></i>
                  </a>
                  <a
                    className="publisher-btn text-info"
                    onClick={sendMessage}
                  >
                    <i className="fa fa-paper-plane"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Chat;
