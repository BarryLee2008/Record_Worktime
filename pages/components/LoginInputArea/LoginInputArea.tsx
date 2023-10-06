import React from "react";
import { Button, Form, Input } from "antd";
import styles from "./LoginInputArea.module.css";
import { useRouter } from "next/router";

type FieldType = {
  username?: string;
  password?: string;
};

const LoginInputArea: React.FC = () => {
  const router = useRouter();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    router.push("/punchPage");
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
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
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
