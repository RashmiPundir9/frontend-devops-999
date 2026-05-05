import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, Checkbox, message, Typography } from "antd";
// import { loginUser } from "../../services/auth.service";
import { setAuthData } from "../../utils/storage";
import "./login.css";

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [form] = Form.useForm();

  const redirectPath = location.state?.from || "/dashboard";

  const handleLogin = async (values) => {
    if (loading) return;

    setLoading(true);
    try {
      // const payload = {
      //   ...values,
      //   email: values.email.trim().toLowerCase(),
      // };

      // const response = await loginUser(payload);
      const response = {
        jwt: "1234567890",
        user: {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
        },
      };
      setAuthData({
        token: response.jwt,
        user: response.user,
        remember: values.remember,
      });

      navigate(redirectPath, { replace: true });
    } catch {
      message.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 360 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Welcome back 
      </Title>

      <Form
        form={form}
        layout="vertical"
        className="login-form"
        onFinish={handleLogin}
        requiredMark={false}
        onFieldsChange={() => {
          const hasErrors = form
            .getFieldsError()
            .some(({ errors }) => errors.length);

          setIsFormValid(!hasErrors);
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input
            placeholder="Enter email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password
            placeholder="Enter password"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Button
          type={!isFormValid || loading ? "dashed" : "primary"}
          htmlType="submit"
          block
          loading={loading}
          disabled={!isFormValid || loading}
        >
          Login
        </Button>

        <Button
          type="link"
          onClick={() => navigate("/forgot-password")}
          style={{ textAlign: "left", paddingLeft: 0 }}
        >
          Forgot password?
        </Button>
      </Form>
    </div>
  );
}