import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './maker.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import Editor from '../editor/editor';

const Maker = ({FileInput, authService}) => {
//class로 react 쓸 때 state에 object 넣었던 것 처럼 useState안에도 넣을 수 있다.
    const [cards, setCards] = useState({
        1: {
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
        2: {
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
        3: {
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
    });

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
//card라는 object를 함수 내에서 만드는 것이 아닌 card_add_form에서 만들어서 card라는 object를 파라미터로 받는다<div className=""></div>

    const createOrUpdateCard = (card) => {
        setCards(cards => {
            const updated = {...cards };
            updated[card.id] = card;
            return updated;
        });
    }

    const onDelete = (card) => {
        setCards(cards => {
            const updated = {...cards };
            delete updated[card.id];
            return updated;
        });
    }

    return(
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor FileInput={FileInput} cards={cards} onAdd={createOrUpdateCard} updateCard={createOrUpdateCard} onDelete={onDelete}/>
                <Preview cards={cards}/>
            </div>
            <Footer />
        </section>
    );
};

export default Maker;