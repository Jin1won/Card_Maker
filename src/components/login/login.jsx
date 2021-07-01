import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';

const Login = ({ authService }) => {
  const history = useHistory();
// gotoMaker 함수를 만든 이유는 반복되는 코드를 줄이기 위해서
  const gotoMaker = (userId) => {
    history.push({
      pathname: '/maker',
      state: {id: userId},
    })
  }
  const onLogin = event => {
    authService //
      .login(event.currentTarget.textContent)
      .then(data => gotoMaker(data.user.uid));
  };
//로그인된 유저가 바뀔 때 마다(업데이트 될 때 마다) 변화를 주기 위해 useEffect사용
  useEffect(()=>{
    authService.onAuthChanged(user => {
      user && gotoMaker(user.uid);
    })
  });

  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
