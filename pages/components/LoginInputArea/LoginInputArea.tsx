import React from "react";
import { Button, Form, Input } from "antd";
import styles from "./LoginInputArea.module.css";

type FieldType = {
  email?: string;
  password?: string;
};

const LoginInputArea: React.FC<{onLogin: Function, disable: boolean | undefined}> = ({onLogin, disable}) => {
  const onFinish = (values: FieldType) => {
    onLogin(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onClickChangePassword = () =>{
    window.location.href = '/updatePasswordPage';
  }

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      disabled = {disable}
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

      <Form.Item className={styles.buttonGroup} wrapperCol={{ offset: 2, span: 1 }}>
        <Button className={styles.button} type="primary" htmlType="submit">
          Login
        </Button>
        <div className={styles.anchor} onClick={onClickChangePassword}>Change Your Password</div>
      </Form.Item>
    </Form>
  );
};

export default LoginInputArea;
