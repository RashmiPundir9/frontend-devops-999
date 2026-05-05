import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    message.success("Password reset link sent to your email");
    navigate("/reset-password");
  };

  return (
    <Card
      title="Forgot Password"
      style={{ width: 380 }}
      bordered={false}
    >
      <p style={{ marginBottom: 24, color: "#8c8c8c" }}>
        Enter your registered email and we’ll send you a reset link.
      </p>

      <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input size="large" placeholder="Enter registered email" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large">
          Send Reset Link
        </Button>

        <Button
          type="link"
          block
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
      </Form>
    </Card>
  );
}