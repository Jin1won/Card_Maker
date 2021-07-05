import React, { memo } from 'react';
import styles from './header.module.css';

const Header = memo(({ onLogout }) => (
  <header className={styles.header}>
    {onLogout && (
//onClick={onLogout} 이렇게 전달하면 함수를 실행한 결과값이 아니라 함수가 전달되는 것
      <button className={styles.logout} onClick={onLogout}>
        Logout
      </button>
    )}
    <img className={styles.logo} src="/images/logo.png" alt="logo" />
    <h1 className={styles.title}>Business Card Maker</h1>
  </header>
));

export default Header;
