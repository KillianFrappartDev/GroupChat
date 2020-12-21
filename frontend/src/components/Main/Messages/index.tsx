import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type PropsMessage = {};

const Message: React.FC<PropsMessage> = props => {
  return (
    <div className={styles.messageContainer}>
      <img
        className={styles.image}
        alt="User image"
        src="https://images.pexels.com/photos/1220757/pexels-photo-1220757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      />
      <div className={styles.textBox}>
        <p className={styles.username}>John Smith</p>
        <p className={styles.message}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quam quibusdam dolorem rem quisquam illo nemo
          necessitatibus hic quidem ipsam, ullam corrupti quae cum cumque aperiam blanditiis. Beatae, vero facilis!
        </p>
      </div>
    </div>
  );
};

type PropsMessages = {};

const Messages: React.FC<PropsMessages> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Message />
      </div>
    </div>
  );
};

export default Messages;
