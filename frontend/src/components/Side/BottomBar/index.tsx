import React from 'react';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector } from 'react-redux';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  exitClick: () => void;
  profileClick: () => void;
};

interface IRootState {
  username: string;
  image: string;
}

const BottomBar: React.FC<Props> = props => {
  const { username, image } = useSelector((state: IRootState) => state);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.userBox}>
          <img className={styles.image} alt="User" src={image} onClick={props.profileClick} />
          <p className={styles.username}>{username}</p>
        </div>
        <IconButton className={styles.exitButton} onClick={props.exitClick}>
          <ExitToAppIcon className={styles.exit} />
        </IconButton>
      </div>
    </div>
  );
};

export default BottomBar;
