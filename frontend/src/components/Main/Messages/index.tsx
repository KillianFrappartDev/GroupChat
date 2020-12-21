import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type PropsMessage = {
  username: string;
  text: string;
  image: string;
};

const Message: React.FC<PropsMessage> = props => {
  return (
    <div className={styles.messageContainer}>
      <img className={styles.image} alt="User image" src={props.image} />
      <div className={styles.textBox}>
        <p className={styles.username}>{props.username}</p>
        <p className={styles.message}>{props.text}</p>
      </div>
    </div>
  );
};

type PropsMessages = {
  messages: PropsMessage[];
};

const Messages: React.FC<PropsMessages> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {props.messages.map(message => (
          <Message username={message.username} text={message.text} image={message.image} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
