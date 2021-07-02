import React from 'react';
import styles from './card_edit_form.module.css';
import Button from '../button/button';
import ImageFileInput from '../image_file_input/image_file_input';

const CardEditForm = ({card}) => {
    const {name, company, theme, title, email, message, fileName, fileURL} = card;
    
    const onSubmit = () => {

    }
    
    return(
        <form className={styles.form}> 
            <input className={styles.input} name="name" type="text" value={name}/>
            <input className={styles.input} name="company" type="text" value={company}/>
            <select className={styles.select} name="theme">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="colorful">Colorful</option>
            </select>
            <input className={styles.input} name="title" type="text" value={title}/>
            <input className={styles.input} name="email" type="text" value={email}/>
            <textarea className={styles.textarea} name="message" type="text" value={message}/>
        <div className={styles.fileInput}>
            <ImageFileInput fileName={fileName}/>
        </div>
        <Button name="Delete" onClick={onSubmit}/>
        </form>
    );
};

export default CardEditForm;