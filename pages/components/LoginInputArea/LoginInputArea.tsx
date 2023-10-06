import React from "react";
import { Button, Form, Input } from "antd";
import styles from "./LoginInputArea.module.css";

type FieldType = {
  email?: string;
  password?: string;
};

const LoginInputArea: React.FC<{onLogin: Function}> = ({onLogin}) => {
  
  const onFinish = (values: FieldType) => {
    console.log("Success:", values);
    onLogin(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 2, span: 1 }}>
        <Button className={styles.button} type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginInputArea;
