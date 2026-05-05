import { Card, Row, Col } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

import "./Dashboard.css";

const userGrowthStats = [
  {
    title: "Total Users",
    value: "12,450",
    change: 12,
    type: "up",
  },
  {
    title: "Daily Active Users",
    value: "3,420",
    change: 12,
    type: "up",
  },
  {
    title: "New Users (7d)",
    value: "850",
    change: 12,
    type: "up",
  },
  {
    title: "Churn Rate",
    value: "2.5%",
    change: 12,
    type: "up",
  },
];

const monetisationStats = [
  {
    title: "Revenue (MTD)",
    value: "$15,890",
    change: 12,
    type: "up",
  },
  {
    title: "Active Subscriptions",
    value: "892",
    change: 12,
    type: "down",
  },
  {
    title: "New Subscribers (7d)",
    value: "145",
    change: 12,
    type: "up",
  },
  {
    title: "Paywall Views (7d)",
    value: "4,200",
    change: 12,
    type: "down",
  },
];

function StatCard({ title, value, change, type }) {
  const isUp = type === "up";

  return (
    <Card className="dashboard-stat-card" bordered={false}>
      <div className="dashboard-stat-title">{title}</div>

      <div className="dashboard-stat-bottom">
        <div className="dashboard-stat-value">{value}</div>

        <div className={isUp ? "dashboard-stat-change up" : "dashboard-stat-change down"}>
          {isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {change}%
        </div>
      </div>
    </Card>
  );
}

function Section({ title, data }) {
  return (
    <div className="dashboard-section">

      <div className="dashboard-section-header">
        <div className="dashboard-section-indicator" />
        <div className="dashboard-section-title">{title}</div>
      </div>

      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col xs={24} sm={12} md={12} lg={6} key={index}>
            <StatCard {...item} />
          </Col>
        ))}
      </Row>

    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="dashboard-container">

      <Section title="User Growth" data={userGrowthStats} />

      <Section title="Monetisation" data={monetisationStats} />

      <Section title="Trends" data={[]} />

    </div>
  );
}
