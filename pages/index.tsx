import type { NextPage } from 'next'
import LoginPage from "./loginPage";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <LoginPage />
    </div>
  );
};

export default Home
