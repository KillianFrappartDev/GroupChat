import React from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

// Local Imports
import styles from './styles.module.scss';

type Props = {};

const MsgInput: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <InputBase className={styles.input} placeholder="Write here..." />
      <IconButton className={styles.iconButton}>
        <SendIcon className={styles.send} />
      </IconButton>
    </div>
  );
};

export default MsgInput;
