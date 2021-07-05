import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './maker.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import Editor from '../editor/editor';

const Maker = ({FileInput, authService, cardRepository}) => {
//class로 react 쓸 때 state에 object 넣었던 것 처럼 useState안에도 넣을 수 있다.
    const [cards, setCards] = useState({});
    const history = useHistory();
    //다른 화면에서 왔다면 history의 state가 있을 것이다.
    const historyState = history?.location?.state;
    const [userId, setUserId] = useState(historyState && historyState.id);

    const onLogout = () => {
        authService.logout();
    }
    
    useEffect(()=>{
        if(!userId){
            return;
        }
        const stopSync = cardRepository.syncCards(userId, cards => {
            setCards(cards);
        });
    //component가 unmount되었을 때 자동으로 호출된다
        return () => stopSync();
    },[userId, cardRepository]);

    useEffect(()=>{
        authService.onAuthChanged(user => {
          if(user){
            setUserId(user.uid);
          } else{
            history.push('/');
          };
        });
    },[authService,history]);
//card라는 object를 함수 내에서 만드는 것이 아닌 card_add_form에서 만들어서 card라는 object를 파라미터로 받는다<div className=""></div>

    const createOrUpdateCard = (card) => {
        setCards(cards => {
            const updated = {...cards };
            updated[card.id] = card;
            return updated;
        });
        cardRepository.saveCard(userId, card);
    }

    const onDelete = (card) => {
        setCards(cards => {
            const updated = {...cards };
            delete updated[card.id];
            return updated;
        });
        cardRepository.removeCard(userId, card);
    }

    return(
        <section className={styles.maker}>
            <div className={styles.header}>
                <Header onLogout={onLogout}/>
            </div>
            <div className={styles.container}>
                <Editor FileInput={FileInput} cards={cards} onAdd={createOrUpdateCard} updateCard={createOrUpdateCard} onDelete={onDelete}/>
                <Preview cards={cards}/>
            </div>
            <Footer />
        </section>
    );
};

export default Maker;