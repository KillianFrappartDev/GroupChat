import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Local Imports
import logo from '../../../assets/cropped.png';
import CustomButton from '../../Shared/CustomButton/index';
import styles from './styles.module.scss';

type Props = {};

const Welcome: React.FC<Props> = props => {
  const dispatch = useDispatch();

  // Async Requests
  const guestRequest = async () => {
    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/guest`);
    } catch (error) {
      console.log('[ERROR][AUTH][GUEST]: ', error);
      return;
    }
    if (!response.data.access) return;
    dispatch({ type: 'GUEST', payload: { ...response.data.user } });
  };

  return (
    <div className={styles.container}>
      <img className={styles.logo} alt="GroupChat Logo" src={logo} />
      <Link to="/login">
        <CustomButton onClick={() => {}} isPurple={false} title="Login" small={false} />
      </Link>
      <Link to="/signup">
        <CustomButton onClick={() => {}} isPurple={true} title="Signup" small={false} />
      </Link>
      <p className={styles.guest} onClick={guestRequest}>
        Continue as guest
      </p>
    </div>
  );
};

export default Welcome;
