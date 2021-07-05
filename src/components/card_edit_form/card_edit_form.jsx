import React, {useRef, memo} from 'react';
import styles from './card_edit_form.module.css';
import Button from '../button/button';

const CardEditForm = memo(({FileInput, card, onDelete, updateCard}) => {
    const {name, company, theme, title, email, message, fileName} = card;
    
    const inputNameRef = useRef();
    const inputCompanyRef = useRef();
    const inputThemeRef = useRef();
    const inputTitleRef = useRef();
    const inputEmailRef = useRef();
    const inputMessageRef = useRef();

    const onFileChange = file => {
        updateCard({
            ...card,
            fileName: file.name,
            fileURL: file.url,
        });
    };
    const onSubmit = () => {
        onDelete(card);
    };

    const onChange = (event) => {
        if(event.currentTarget == null){
            return;
        }
        event.preventDefault();
        updateCard({
            ...card,
            [event.currentTarget.name]:event.currentTarget.value,
        });
    };
    
    return(
        <form className={styles.form}> 
            <input ref={inputNameRef} className={styles.input} name="name" type="text" value={name} onChange={onChange}/>
            <input ref={inputCompanyRef} className={styles.input} name="company" type="text" value={company} onChange={onChange}/>
            <select ref={inputThemeRef} className={styles.select} name="theme" value={theme} onChange={onChange}>
                <option value="dark">dark</option>
                <option value="light">light</option>
                <option value="colorful">colorful</option>
            </select>
            <input ref={inputTitleRef} className={styles.input} name="title" type="text" value={title} onChange={onChange}/>
            <input ref={inputEmailRef} className={styles.input} name="email" type="text" value={email} onChange={onChange}/>
            <textarea ref={inputMessageRef} className={styles.textarea} name="message" type="text" value={message} onChange={onChange}/>
        <div className={styles.fileInput}>
            <FileInput name={fileName} onFileChange={onFileChange}/>
        </div>
        <Button name="Delete" onClick={onSubmit}/>
        </form>
    );
});

export default CardEditForm;