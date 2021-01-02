import React from 'react';

// Local Imports
import logo from '../../../assets/gc-logo-symbol-nobg.png';
import styles from './styles.module.scss';

type Props = {
  onClick: () => void;
};

const Onboard: React.FC<Props> = props => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.wrapper}>
        <img className={styles.logo} alt="logo" src={logo} />
        <h1 className={styles.title}>Hello World!</h1>
        <p className={styles.description}>
          I really appreciate that you take time to have a look to my work. This app is an instant messaging project
          that offer the possibility to create and join channels and start a conversation.
        </p>
        <ul className={styles.list}>
          <li>⭐️ Use the "menu" icon on top (Mobile).</li>
          <li>⭐️ Click on any channel you want to join.</li>
          <li>⭐️ Create a channel with the "+" icon.</li>
          <li>⭐️ Send messages with the text input.</li>
          <li>⭐️ Browse channels with the search input.</li>
          <li>⭐️ Report a bug with the "bug" icon.</li>
          <li>⭐️ Click on your profile to edit.</li>
          <li>⭐️ Use the "exit" icon to logout.</li>
        </ul>
      </div>
    </div>
  );
};

export default Onboard;
