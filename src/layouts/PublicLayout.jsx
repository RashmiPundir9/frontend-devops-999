import { Layout, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

export default function PublicLayout() {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/*  Top Header */}
      <Header
        style={{
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        {/* Brand / Title */}
        <div style={{ fontWeight: 600, fontSize: 16 }}>
          Yaahajji Admin
        </div>

        {/* Actions */}
        <div>
          <Button
            type="link"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>

          <Button
            type="primary"
            onClick={() => navigate("/login")}
          >
            Admin Login
          </Button>
        </div>
      </Header>

      {/* Page Content */}
      <Content style={{ background: "#fafafa" }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
