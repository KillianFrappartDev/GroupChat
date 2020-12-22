import React from 'react';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  exitClick: () => void;
};

const BottomBar: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.userBox}>
          <img
            className={styles.image}
            alt="User"
            src="https://images.pexels.com/photos/1220757/pexels-photo-1220757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          />
          <p className={styles.username}>John Smith</p>
        </div>
        <IconButton className={styles.exitButton} onClick={props.exitClick}>
          <ExitToAppIcon className={styles.exit} />
        </IconButton>
      </div>
    </div>
  );
};

export default BottomBar;
