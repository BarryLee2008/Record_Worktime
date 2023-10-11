import React from 'react';
import { Button, Form, Input } from 'antd';
import styles from '../styles/UpdatePasswordPage.module.css';

const UpdatePasswordPage: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <div className={styles.layout}>
      <Form
        form={form}
        name="Update Password"
        autoComplete="off"
        style={{ maxWidth: 600 }}
        layout="vertical"
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
          <Button className={styles.button} type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePasswordPage;
