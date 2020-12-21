import React from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  arrowClick: () => void;
  plusClick: () => void;
  inChannel: boolean;
};

const TopBar: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      {props.inChannel ? (
        <div className={styles.wrapperInChannel}>
          <IconButton className={styles.arrowButton} onClick={props.arrowClick}>
            <ArrowBackIosIcon className={styles.arrow} />
          </IconButton>
          <h2 className={styles.title}>All channels</h2>
        </div>
      ) : (
        <div className={styles.wrapperOutChannel}>
          <h2 className={styles.title}>Channels</h2>
          <IconButton className={styles.addButton} onClick={props.plusClick}>
            <AddIcon className={styles.add} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default TopBar;
