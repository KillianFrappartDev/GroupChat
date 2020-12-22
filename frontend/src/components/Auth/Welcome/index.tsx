import React from 'react';
import { Link } from 'react-router-dom';

// Local Imports
import logo from '../../../assets/cropped.png';
import CustomButton from '../../Shared/CustomButton/index';
import styles from './styles.module.scss';

type Props = {};

const Welcome: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} alt="GroupChat Logo" src={logo} />
      <Link to="/login">
        <CustomButton isPurple={false} title="Login" />
      </Link>
      <Link to="/signup">
        <CustomButton isPurple={true} title="Signup" />
      </Link>
      <p className={styles.guest}>Continue as guest</p>
    </div>
  );
};

export default Welcome;
