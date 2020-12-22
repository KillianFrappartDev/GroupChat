import React from 'react';
import { Link } from 'react-router-dom';

// Local Imports
import logo from '../../../assets/cropped.png';
import styles from './styles.module.scss';

type Props = {};

const Welcome: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} alt="GroupChat Logo" src={logo} />
      <Link to="/login">
        <button className={styles.login}>Login</button>
      </Link>
      <Link to="/signup">
        <button className={styles.signup}>Signup</button>
      </Link>
      <p className={styles.guest}>Continue as guest</p>
    </div>
  );
};

export default Welcome;
