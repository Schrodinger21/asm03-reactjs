// in ActionProvider.jsx
import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage(
      "Chào mừng bạn đến với của hàng của chúng tôi."
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleProduct = () => {
    const botMessage = createChatBotMessage(
      "Bạn đang quan tâm đến sản phẩm nào? Hãy để lại thông tin tôi sẽ liên hệ lại bạn sớm nhất."
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleShip = () => {
    const botMessage = createChatBotMessage(
      "Chúng tôi sẽ giao hàng đến bạn trong thời gian nhanh nhất và hoàn toàn miễn phí."
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleThanks = () => {
    const botMessage = createChatBotMessage(
      "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Hẹn gặp lại bạn."
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleProduct,
            handleShip,
            handleThanks,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
