// src/providers/messageProvider.js
import React from "react";
import { message } from "antd";

let messageApiRef;

export const MessageProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  // store globally
  messageApiRef = messageApi;

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};

// global functions
export const Message = {
  success: (content, duration = 3) => {
    messageApiRef?.open({
      type: "success",
      content,
      duration,
    });
  },

  error: (content, duration = 3) => {
    messageApiRef?.open({
      type: "error",
      content,
      duration,
    });
  },

  warning: (content, duration = 3) => {
    messageApiRef?.open({
      type: "warning",
      content,
      duration,
    });
  },

  info: (content, duration = 3) => {
    messageApiRef?.open({
      type: "info",
      content,
      duration,
    });
  },

  loading: (content, duration = 0) => {
    messageApiRef?.open({
      type: "loading",
      content,
      duration,
    });
  },
};
