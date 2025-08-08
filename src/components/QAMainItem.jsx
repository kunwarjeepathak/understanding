import React, { useState } from 'react';
import QASubItem from './QASubItem';
import styles from '../styles/QAMainItem.module.css';

const QAMainItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <h2
        className={styles.question}
        onClick={() => setOpen(!open)}
      >
        {item.question}
      </h2>
      {open && (
        <div className={styles.answerBlock}>
          <p className={styles.answer}>{item.answer}</p>
          {item.subItems?.map((sub, idx) => (
            <QASubItem key={idx} sub={sub} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QAMainItem;