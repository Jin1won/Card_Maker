import React, {useCallback, useEffect, useState} from 'react';
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
    //render가 될 때 마다 onLogout함수가 새로 만들어지기 때문에 계속 새로운 함수가 전달되서 header에 memo를 써도 render가 일어난다 
    //따라서, 함수가 계속 호출 되어도 동일한 데이터를 쓰기 위해(동일한 함수를 쓰기 위해) useCallback을 사용한다
    //하지만, authService가 기존 값이 사용될 수 있기 때문이 authService가 업데이트 되면 새로운 함수를 만들도록 설정해준다.
    const onLogout = useCallback(() => {
        authService.logout();
    },[authService]);
    
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