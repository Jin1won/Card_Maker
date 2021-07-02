import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './maker.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import Editor from '../editor/editor';

const Maker = ({authService}) => {
//class로 react 쓸 때 state에 object 넣었던 것 처럼 useState안에도 넣을 수 있다.
    const [cards, setCards] = useState([
        {
            id: '1',
            name: 'Jin1',
            company: 'Seoultech',
            theme: 'dark',
            title: 'Front-end Developer',
            email: 'wlsdnjs16521@gmail.com',
            message: 'go for it',
            fileName: 'jinwon',
            fileURL: null,
        },
        {
            id: '2',
            name: 'Jin2',
            company: 'Seoultech',
            theme: 'light',
            title: 'Front-end Developer',
            email: 'wlsdnjs16521@gmail.com',
            message: 'go for it',
            fileName: 'jinwon',
            fileURL: null,
        },
        {
            id: '3',
            name: 'Jin3',
            company: 'Seoultech',
            theme: 'colorful',
            title: 'Front-end Developer',
            email: 'wlsdnjs16521@gmail.com',
            message: 'go for it',
            fileName: 'jinwon',
            fileURL: null,
        }
    ]);

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
            <div className={styles.container}>
                <Editor cards={cards}/>
                <Preview cards={cards}/>
            </div>
            <Footer />
        </section>
    );
};

export default Maker;