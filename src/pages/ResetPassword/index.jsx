import { Card, Form, Input, Button, Progress } from "antd";
import { useNavigate } from "react-router-dom";

/* 🔐 Password strength helper */
const getPasswordStrength = (password = "") => {
  if (password.length < 6)
    return { label: "Weak", percent: 30, status: "exception" };
  if (/[A-Z]/.test(password) && /[0-9]/.test(password))
    return { label: "Strong", percent: 100, status: "success" };
  return { label: "Medium", percent: 60, status: "active" };
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async () => { };

  return (
    <Card title="Reset Password" style={{ width: 380 }} bordered={false}>
      <p style={{ marginBottom: 24, color: "#8c8c8c" }}>
        Create a new strong password for your account.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { required: true, message: "Password is required" },
            { min: 6, message: "Minimum 6 characters" },
          ]}
        >
          <Input.Password size="large" placeholder="Enter new password" />
        </Form.Item>

        <Form.Item shouldUpdate>
          {({ getFieldValue }) => {
            const pwd = getFieldValue("password");
            if (!pwd) return null;

            const strength = getPasswordStrength(pwd);

            return (
              <div style={{ marginBottom: 16 }}>
                <Progress
                  percent={strength.percent}
                  size="small"
                  status={strength.status}
                  showInfo={false}
                />
                <small style={{ color: "#8c8c8c" }}>
                  Password strength: {strength.label}
                </small>
              </div>
            );
          }}
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Confirm password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large">
          Reset Password
        </Button>

        <Button type="link" block onClick={() => navigate("/login")}>
          Back to Login
        </Button>
      </Form>
    </Card>
  );
}