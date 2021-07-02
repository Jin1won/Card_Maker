import React from 'react';
import styles from './editor.module.css';
import CardEditForm from '../card_edit_form/card_edit_form';
import CardAddForm from '../card_add_form/card_add_form';

const Editor = ({cards, onAdd}) => {
    return(
        <section className={styles.editor}>
            <h1 className={styles.title}>Card Maker</h1>
            {cards.map(card => (
//list이므로 key값을 넣어줘야 한다
                <CardEditForm key={card.id} card={card} />
            ))}
            <CardAddForm onAdd={onAdd}/>
        </section>

    );
};

export default Editor;