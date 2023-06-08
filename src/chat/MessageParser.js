// in MessageParser.js
import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes("hello")) {
      actions.handleHello();
    }
    if (message.includes("giao hàng")) {
      actions.handleShip();
    }
    if (message.includes("sản phẩm") || message.includes("iphone")) {
      actions.handleProduct();
    }
    if (message.includes("bye")) {
      actions.handleThanks();
    }
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
