import { Form, Input, Button, Typography, message as messages } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useState } from "react";
import { isFulfilled, isRejected } from "@reduxjs/toolkit";
import "./login.css";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "store";
import { LoginRequest } from "models/user";
import { login } from "store/slices/signIn";
import { ErrorMessages } from "constants/index";

function Login() {
  const [loader, setLoader] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  // let navigate = useNavigate()
  const history = useHistory();
  // login button click
  const onFinish = async (values: LoginRequest) => {
    setLoader(true);
    const actoinResult = await dispatch(
      login({ email: values.email, password: values.password })
    );
    if (actoinResult && isFulfilled(actoinResult)) {
      setLoader(false);
      if (actoinResult.payload.success) {
        messages.success(actoinResult.payload.message);
        history.push("/projects", { replace: true });
      }
    } else if (actoinResult && isRejected(actoinResult)) {
      setLoader(false);
      messages.error(actoinResult.payload.message);
    }
    form.resetFields();
  };

  const { Title } = Typography;

  return (
    <div className="login">
      <div className="login-form">
        <div className="login-logo">
          <Title level={3}>Login</Title>
        </div>
        <Form
          onFinish={onFinish}
          form={form}
          labelCol={{ span: 50 }}
          wrapperCol={{ span: 30 }}
          scrollToFirstError
          layout="vertical"
        >
          <FormItem
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: ErrorMessages.EmailRequired
              },
              {
                type: "email",
                message: ErrorMessages.EmailInvalid
              }
            ]}
          >
            <Input placeholder="Enter Email" />
          </FormItem>
          <FormItem
            name="password"
            label="Password"
            className="password"
            rules={[
              {
                required: true,
                message: ErrorMessages.PasswordRequired
              }
            ]}
          >
            <Input.Password placeholder="Enter Password" />
          </FormItem>
          <div style={{ paddingTop: "1em" }}>
            <Button
              htmlType="submit"
              size="middle"
              style={{ margin: "auto", display: "block" }}
              loading={loader}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
