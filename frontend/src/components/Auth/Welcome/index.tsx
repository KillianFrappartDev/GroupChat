import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Local Imports
import logo from '../../../assets/cropped.png';
import CustomButton from '../../Shared/CustomButton/index';
import styles from './styles.module.scss';

type Props = {};

const Welcome: React.FC<Props> = props => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <img className={styles.logo} alt="GroupChat Logo" src={logo} />
      <Link to="/login">
        <CustomButton onClick={() => console.log('Clicked')} isPurple={false} title="Login" small={false} />
      </Link>
      <Link to="/signup">
        <CustomButton onClick={() => console.log('Clicked')} isPurple={true} title="Signup" small={false} />
      </Link>
      <p className={styles.guest} onClick={() => dispatch({ type: 'GUEST' })}>
        Continue as guest
      </p>
    </div>
  );
};

export default Welcome;
