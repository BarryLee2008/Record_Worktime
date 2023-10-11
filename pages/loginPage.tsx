import React, { useState } from 'react';
import styles from '../styles/LoginPage.module.css';
import LoginInputArea from './components/LoginInputArea';
import login from '../services/login';
import { useRouter } from 'next/router';
import { Spin } from 'antd';

type LoginCredential = {
  email?: string,
  password?: string,
};

const PUNCH_PAGE = '/punchPage';
const ADMIN_PAGE = '/adminRecordPage';

const LoginPage: React.FC = () => {
  const [logFailed, setLogFailed] = useState(false);
  const [onLoading, setOnLoading] = useState(false);
  const ERROR_MESSAGE = 'Login Failed, Please check your email and password';

  const router = useRouter();

  const userLogin = (credentials: LoginCredential) => {
    setLogFailed(false);
    setOnLoading(true);
    login(credentials).then((res) => {
      if (res?.status === 200)
        router.push(res?.data?.admin ? ADMIN_PAGE : PUNCH_PAGE);
      else {
        setLogFailed(true);
        setOnLoading(false);
      }
    });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div>Login</div>
      </div>
      <div className={styles.content}>
        <div />
        <LoginInputArea onLogin={userLogin} disable={onLoading} />
        <div className={styles.errorLabel}>{logFailed && ERROR_MESSAGE}</div>
        {onLoading && <Spin />}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default LoginPage;
