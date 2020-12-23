import React from 'react';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  exitClick: () => void;
};

interface IRootState {
  username: string;
  image: string;
}

const BottomBar: React.FC<Props> = props => {
  const { username, image } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.userBox}>
          <img className={styles.image} alt="User" src={image} />
          <p className={styles.username}>{username}</p>
        </div>
        <IconButton className={styles.exitButton} onClick={props.exitClick}>
          <ExitToAppIcon className={styles.exit} onClick={logoutHandler} />
        </IconButton>
      </div>
    </div>
  );
};

export default BottomBar;
