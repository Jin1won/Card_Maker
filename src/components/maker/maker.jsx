import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './maker.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';

const Maker = ({authService}) => {
    const history = useHistory();

    const onLogout = () => {
        authService.logout();
    }
    
    useEffect(()=>{
        authService.onAuthChanged(user => {
          if(!user){
            history.push('/');
          };
        });
    });

    return(
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <h1>Maker</h1>
            <Footer />
        </section>
    );
};

export default Maker;