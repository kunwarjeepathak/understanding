import React from 'react';
import styles from '../styles/QASubItem.module.css';

const QASubItem = ({ sub }) => (
  <div className={styles.container}>
    <h3 className={styles.question}>{sub.question}</h3>
    <p className={styles.answer}>{sub.answer}</p>
  </div>
);

export default QASubItem;