import React, { useEffect } from 'react';

// Local Imports
import styles from './styles.module.scss';

type PropsMessage = {
  username: string;
  text: string;
  image: string;
  _id: string;
};

const Message: React.FC<PropsMessage> = props => {
  return (
    <div className={styles.messageContainer}>
      <img className={styles.image} alt="User" src={props.image} />
      <div className={styles.textBox}>
        <p className={styles.username}>{props.username}</p>
        <p className={styles.message}>{props.text}</p>
      </div>
    </div>
  );
};

type PropsMessages = {
  messages: PropsMessage[];
  onClick: () => void;
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
      <div className={styles.wrapper}>
        {props.messages.map(message => (
          <Message
            _id={message._id}
            key={message._id}
            username={message.username}
            text={message.text}
            image={message.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Messages;
