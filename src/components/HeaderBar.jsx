import { Layout, Dropdown, Avatar, Space, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { clearAuthData, getUser } from "../utils/storage";
import routes from "../routes.config";

const { Header } = Layout;
const { Text } = Typography;

export default function HeaderBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();

  const logout = () => {
    clearAuthData();
    navigate("/login");
  };

  const resetPassword = () => {
    navigate("/reset-password");
  };

  const currentRoute = routes
    .slice()
    .reverse()
    .find((r) => {
      const basePath = r.path.replace(/:\w+/g, "");
      return location.pathname.startsWith(basePath);
    });


  const pageTitle = currentRoute?.title || "Dashboard";


  const menuItems = [

    {
      key: "reset",
      icon: <RedoOutlined />,
      label: "Reset Password",
      disabled: true,
      onClick: resetPassword,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Log out",
      onClick: logout,
    }
  ];

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        {pageTitle}
      </Text>

      <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
        <Space size={12} style={{ cursor: "pointer" }}>
          <Avatar size={36} icon={<UserOutlined />} />

          <div style={{ lineHeight: 1.2 }}>
            <Text strong style={{ fontSize: 14 }}>
              {user?.name || "Username"}
            </Text>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {user?.role || "Admin"}
              </Text>
            </div>
          </div>

          <DownOutlined style={{ fontSize: 12, color: "#888" }} />
        </Space>
      </Dropdown>
    </Header>
  );
}