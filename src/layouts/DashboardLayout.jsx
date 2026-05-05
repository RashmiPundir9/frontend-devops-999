import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import Sidebar from "../components/Sidebar";

const { Content } = Layout;

export default function DashboardLayout() {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Sidebar />

      <Layout style={{ background: "#f8fafc" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <HeaderBar />
        </div>
        <Content
          style={{
            background: "#f8fafc",
            height: "calc(100vh - 64px)",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}