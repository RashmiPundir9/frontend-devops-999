import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "../../navigation/sidebar.config";
import "./Sidebar.css";

const { Sider } = Layout;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      width={214}
      style={{
        height: "100vh",
        position: "sticky",
        top: 0,
        background:
          "linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-strong) 61.54%, var(--color-primary-soft) 123.07%)",
        paddingTop: 10,
      }}
    >
      {/* Brand text (no logo image) */}
      <div
        style={{
          margin: "10px 16px 20px 16px",
          display: "flex",
          alignItems: "center",
          color: "#fff",
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        Admin
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={sidebarItems}
        onClick={({ key }) => navigate(key)}
        rootClassName="custom-sidebar-menu"
        style={{
          background: "transparent",
          borderRight: "none",
          padding: "0 8px",
        }}
        theme="dark"
      />
    </Sider>
  );
}