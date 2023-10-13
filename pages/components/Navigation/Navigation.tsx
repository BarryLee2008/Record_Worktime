import React from 'react';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
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

  return (
    <div className={styles.layout}>
      {NAV_MENU.map((n) => (
        <div
          className={styles.navItem}
          key={n.key}
          onClick={() => (window.location.href = n.route)}
        >
          {n.title}
        </div>
      ))}
    </div>
  );
};

export default Navigation;
