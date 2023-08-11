import React, { useState } from "react";
import "./chat.css"; // Import your custom CSS for the chat component

const Chat = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className={`chat-container ${showChat ? "chat-open" : ""}`}>
      <div className="chat-toggle-button" onClick={toggleChat}>
        {showChat ? "Close Chat" : <i class="fa-regular fa-comments"></i>}
      </div>
      {showChat && (
        <div className="chat-window">
          {/* Chat content goes here */}
          <p>Hi mng</p>
          <p>Hi mng</p>
          <p>Hi mng</p>
          <p>Hi mng</p>
          <div className="d-flex justify-content-between">
            <input value="hi" className="w-100 p-0" style={{ borderRadius: "5px", border:"1px solid #ccc" }}></input>
            <button className="btn bg-black text-white  h-100" style={{marginLeft:"2px"}}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
