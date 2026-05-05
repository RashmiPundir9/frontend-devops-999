import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";

import App from "./App";
import { ConfigProvider } from "antd";
import { MessageProvider } from "./components/MessageProvider";
import { initTheme } from "./styles/theme";

// Initialize theme engine: inject CSS variables into :root and expose global THEME
const THEME = initTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: THEME.primary,
        borderRadius:
          (THEME.raw && THEME.raw.antd && THEME.raw.antd.borderRadius) ?? 8,
        fontFamily:
          (THEME.raw && THEME.raw.antd && THEME.raw.antd.fontFamily) ||
          (THEME.fonts && THEME.fonts.familyBase) ||
          "Inter, sans-serif",
      },
    }}
  >
    <MessageProvider>
      <App />
    </MessageProvider>
  </ConfigProvider>
);