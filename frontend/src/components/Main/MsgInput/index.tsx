import React, { useState } from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  sendClick: () => void;
};

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
      <IconButton className={styles.iconButton} onClick={props.sendClick}>
        <SendIcon className={styles.send} />
      </IconButton>
    </div>
  );
};

export default MsgInput;
