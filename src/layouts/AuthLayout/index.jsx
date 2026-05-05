import { Layout, Typography } from "antd";
import { Outlet } from "react-router-dom";
import "./AuthLayout.css";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function AuthLayout() {
  return (
    <Layout className="auth-layout">
      <Content className="auth-content">
        {/* LEFT SIDE: form area */}
        <div className="auth-left">
          <Outlet />
        </div>

        {/* RIGHT PANEL: simple branding, no images */}
        <div className="auth-right">
          <div className="auth-brand">
            <Title level={3} className="auth-title">
              Yaahajji Admin
            </Title>

            <Text className="auth-subtitle">
              Manage Yaahajji platform data
            </Text>
          </div>
        </div>
      </Content>
    </Layout>
  );
}