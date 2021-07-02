import React from 'react';
import styles from './editor.module.css';
import CardEditForm from '../card_edit_form/card_edit_form';
import CardAddForm from '../card_add_form/card_add_form';

const Editor = ({cards, onAdd, updateCard, onDelete}) => {
    return(
        <section className={styles.editor}>
            <h1 className={styles.title}>Card Maker</h1>
            {Object.keys(cards).map(key => (
//list이므로 key값을 넣어줘야 한다
                <CardEditForm key={key.id} card={cards[key]} updateCard={updateCard} onDelete={onDelete} />
            ))}
            <CardAddForm onAdd={onAdd}/>
        </section>

    );
};

export default Editor;