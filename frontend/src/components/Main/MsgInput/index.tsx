import React, { useState } from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

// Local Imports
import styles from './styles.module.scss';

type Props = {};

const MsgInput: React.FC<Props> = props => {
  const [msg, setMsg] = useState('');

  return (
    <div className={styles.container}>
      <InputBase
        className={styles.input}
        multiline
        placeholder="Write here..."
        value={msg}
        onChange={e => setMsg(e.target.value)}
      />
      <IconButton className={styles.iconButton}>
        <SendIcon className={styles.send} />
      </IconButton>
    </div>
  );
};

export default MsgInput;
