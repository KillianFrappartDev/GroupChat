import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
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
          <Tooltip title="Back to channels list" placement="bottom">
            <IconButton className={styles.arrowButton} onClick={props.arrowClick}>
              <ArrowBackIosIcon className={styles.arrow} />
            </IconButton>
          </Tooltip>
          <h2 className={styles.title}>All channels</h2>
        </div>
      ) : (
        <div className={styles.wrapperOutChannel}>
          <h2 className={styles.title}>Channels</h2>
          <Tooltip title="Create Channel" placement="bottom">
            <IconButton className={styles.addButton} onClick={props.plusClick}>
              <AddIcon className={styles.add} />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default TopBar;
