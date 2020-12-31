import React, { useState } from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  sendClick: (msg: string) => void;
  onClick: () => void;
};

const MsgInput: React.FC<Props> = props => {
  const [msg, setMsg] = useState('');

  return (
    <div className={styles.container} onClick={props.onClick}>
      <InputBase
        className={styles.input}
        multiline
        placeholder="Write here..."
        value={msg}
        onChange={e => setMsg(e.target.value)}
      />
      <IconButton
        className={styles.iconButton}
        onClick={() => {
          props.sendClick(msg);
          setMsg('');
        }}
      >
        <SendIcon className={styles.send} />
      </IconButton>
    </div>
  );
};

export default MsgInput;
