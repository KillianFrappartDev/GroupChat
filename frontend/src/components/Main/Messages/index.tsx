import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

// Local Imports
import styles from './styles.module.scss';

type PropsMessage = {
  username: string;
  text: string;
  image: string;
  _id: string;
  date: string;
};

const Message: React.FC<PropsMessage> = props => {
  return (
    <div className={styles.messageContainer}>
      <img className={styles.image} alt="User" src={props.image} />
      <div className={styles.textBox}>
        <p className={styles.username}>
          {props.username} <span className={styles.date}>{props.date}</span>
        </p>
        <p className={styles.message}>{props.text}</p>
      </div>
    </div>
  );
};

type PropsMessages = {
  messages: PropsMessage[];
  onClick: () => void;
  loading: boolean;
};

const Messages: React.FC<PropsMessages> = props => {
  useEffect(() => {
    const chatElement = document.getElementById('chat');
    if (chatElement) {
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  });

  return (
    <div id="chat" className={styles.container} onClick={props.onClick}>
      {props.loading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.wrapper}>
          {props.messages.map(message => (
            <Message
              _id={message._id}
              key={message._id}
              username={message.username}
              text={message.text}
              image={message.image}
              date={message.date}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
