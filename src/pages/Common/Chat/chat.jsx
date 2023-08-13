import React, { useEffect, useState } from "react";
import "./chat.css"; // Import your custom CSS for the chat component
import * as signalR from "@microsoft/signalr";

const Chat = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [connection, setConnection] = useState(null);

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

        newConnection.on("ReceiveMessage", (newMessageList) => {
          // Update the messages state with the new list of messages
          setMessages(newMessageList);
        });
      } catch (error) {
        console.error("Error starting connection:", error);
      }
    };

    startConnection();
  }, []);

  const sendMessage = async () => {
    console.log("Sending message...");

    if (connection && message.trim() !== "") {
      try {
        console.log("About to invoke SendMessage...");
        console.log({
          accountID: senderId,
          message: message,
        });

        await connection.invoke("SendMessage", {
          accountID: senderId,
          message: message,
        });

        console.log("Message sent successfully.");

        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
  
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row container d-flex justify-content-center">
          <div class="col-md-6">
            <div class="card card-bordered">
              <div class="card-header">
                <h4 class="card-title">
                  <strong>Chat</strong>
                </h4>
              </div>

              <div
                className="ps-container ps-theme-default ps-active-y"
                id="chat-content"
              >
                {messages.map((item, index) => (
                  <div
                    key={index}
                    className={`media media-chat ${
                      item.sender == senderId ? "media-chat-reverse" : ""
                    }`}
                  >
                    <img
                      class="avatar"
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
                ))}

                <div class="ps-scrollbar-x-rail" style={{ left: 0, bottom: 0 }}>
                  <div
                    class="ps-scrollbar-x"
                    tabindex="0"
                    style={{ left: 0, width: 0 }}
                  ></div>
                </div>
                <div
                  class="ps-scrollbar-y-rail"
                  style={{ top: 0, height: 0, right: "2px" }}
                >
                  <div
                    class="ps-scrollbar-y"
                    tabindex="0"
                    style={{ top: 0, height: "2px" }}
                  ></div>
                </div>
              </div>

              <div class="publisher bt-1 border-light">
                <img
                  class="avatar avatar-xs"
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
                <span class="publisher-btn file-group">
                  <i class="fa fa-paperclip file-browser"></i>
                  <input type="file" />
                </span>
                <a class="publisher-btn" href="#" data-abc="true">
                  <i class="fa fa-smile"></i>
                </a>
                <a class="publisher-btn text-info" onClick={sendMessage}>
                  <i class="fa fa-paper-plane"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
