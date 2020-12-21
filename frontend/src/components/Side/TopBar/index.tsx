import React from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  arrowClick: () => void;
  title: string;
  iconIsVisible: boolean;
};

const TopBar: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {props.iconIsVisible ? (
          <IconButton className={styles.menuButton} onClick={props.arrowClick}>
            <ArrowBackIosIcon className={styles.menu} />
          </IconButton>
        ) : (
          <IconButton className={styles.addButton} onClick={props.arrowClick}>
            <AddIcon className={styles.add} />
          </IconButton>
        )}
        <h2 className={styles.title}>{props.title}</h2>
      </div>
    </div>
  );
};

export default TopBar;
