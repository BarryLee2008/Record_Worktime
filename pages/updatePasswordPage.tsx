import React, { useState } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import styles from '../styles/UpdatePasswordPage.module.css';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import login from 'services/login';
import updatePassword from 'services/updatePassword';

const UpdatePasswordPage: NextPage = () => {
  const SUCCESS = 200;
  const LOG_ERROR_MESSAGE =
    'Login Failed, Please Check Your Email and Password';
  const UPDATE_ERROR_MESSAGE = 'Update Password Failed';
  type FieldType = {
    email: string,
    password: string,
    new_password: string,
  };

  const router = useRouter();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [waitting, setWaitting] = useState(false);

  const onFinish = (value: FieldType) => {
    setWaitting(true);
    login({ email: value.email, password: value.password }).then((res) => {
      console.log(value.new_password);
      if (res?.status === SUCCESS)
        updatePassword({ newPassword: value.new_password }).then((res) => {
          if (res?.status === SUCCESS) {
            localStorage.removeItem('token');
            router.push('/');
          } else {
            setErrorMessage(UPDATE_ERROR_MESSAGE);
            setWaitting(false);
          }
        });
      else {
        setErrorMessage(LOG_ERROR_MESSAGE);
        setWaitting(false);
      }
    });
  };

  return (
    <div className={styles.layout}>
      {waitting && <Spin size="large" />}
      <Form
        form={form}
        name="Update Password"
        autoComplete="off"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        layout="vertical"
        disabled={waitting}
      >
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="new_password"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        {/* Field */}
        <Form.Item
          label="Confirm New Password"
          name="new_password2"
          dependencies={['new_password']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 1 }}>
          <div className={styles.buttonGroup}>
            <Button className={styles.button} type="primary" htmlType="submit">
              Confirm
            </Button>
            <Button className={styles.button} onClick={() => router.push('/')}>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
      <div className={styles.errorMessage}>{errorMessage}</div>
    </div>
  );
};

export default UpdatePasswordPage;
