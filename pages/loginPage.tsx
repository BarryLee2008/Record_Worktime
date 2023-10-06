import React from "react";
import styles from "../styles/LoginPage.module.css";
import LoginInputArea from "./components/LoginInputArea";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div>Login</div>
      </div>
      <div className={styles.content}>
        <div />
        <LoginInputArea />
        <div />
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default LoginPage;
