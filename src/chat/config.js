// in config.js
import { createChatBotMessage } from "react-chatbot-kit";

const botName = "Admin";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Xin chào, tôi là ${botName}. Tôi có thể giúp gì được cho bạn?`
    ),
  ],
  botName: botName,
};

export default config;
