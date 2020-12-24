import React from 'react';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  title?: String;
  menuClick: () => void;
};

const TopBar: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <IconButton className={styles.iconButton} onClick={props.menuClick}>
          <MenuIcon className={styles.menu} fontSize="large" />
        </IconButton>
        <h2 className={styles.title}>{props.title}</h2>
      </div>
    </div>
  );
};

export default TopBar;
