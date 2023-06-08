import React, { useState } from "react";
import "./style.css";
import Chatbot from "react-chatbot-kit";
import { SiMessenger } from "react-icons/si";
import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

function Chat(props) {
  const [showBot, toggleBot] = useState(false);

  return (
    <div>
      {showBot ? (
        <div className="chatbot-container">
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
          <button
            className="close-button btn-close"
            onClick={() => toggleBot(false)}
          >
            {/* <MdClose onClick={toggleBot}/> */}
          </button>
        </div>
      ) : (
        <SiMessenger
          className="chat-icon"
          style={{ color: "#2898ec", fontSize: 40 }}
          onClick={toggleBot}
        />
      )}
    </div>
  );
}

export default Chat;
