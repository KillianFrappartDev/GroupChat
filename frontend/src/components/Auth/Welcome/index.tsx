import React from 'react';

// Local Imports
import logo from '../../../assets/cropped.png';
import styles from './styles.module.scss';

type Props = {};

const Welcome: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} alt="GroupChat Logo" src={logo} />
      <button className={styles.login}>Login</button>
      <button className={styles.signup}>Signup</button>
      <p className={styles.guest}>Continue as guest</p>
    </div>
  );
};

export default Welcome;
