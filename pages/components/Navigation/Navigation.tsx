import React from 'react';
import { useRouter } from 'next/router';
import styles from './Navigation.module.css';

const NAV_MENU = [
  {
    key: 0,
    title: 'CLOCK',
    route: '/punchPage',
  },
  {
    key: 1,
    title: 'RECORD',
    route: '/recordPage',
  },
];

const Navigation: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      {NAV_MENU.map((n) => (
        <div
          className={styles.navItem}
          key={n.key}
          onClick={() => router.push(n.route)}
        >
          {n.title}
        </div>
      ))}
    </div>
  );
};

export default Navigation;
