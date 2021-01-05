import React from 'react';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BugReportIcon from '@material-ui/icons/BugReport';
import { useSelector } from 'react-redux';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  exitClick: () => void;
  profileClick: () => void;
  bugClick: () => void;
};

interface IRootState {
  auth: {
    username: string;
    image: string;
  };
}

const BottomBar: React.FC<Props> = props => {
  const { username, image } = useSelector((state: IRootState) => state.auth);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.userBox}>
          <img className={styles.image} alt="User" src={image} onClick={props.profileClick} />
          <p className={styles.username}>{username}</p>
        </div>
        <div className={styles.buttonContainer}>
          <IconButton className={styles.exitButton} onClick={props.bugClick}>
            <BugReportIcon className={styles.exit} />
          </IconButton>
          <IconButton className={styles.exitButton} onClick={props.exitClick}>
            <ExitToAppIcon className={styles.exit} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
