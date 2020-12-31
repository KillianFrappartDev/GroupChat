import React, { useState } from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  sendClick: (msg: string, date: string) => void;
  onClick: () => void;
};

const MsgInput: React.FC<Props> = props => {
  const [msg, setMsg] = useState('');

  const getDateString = () => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    let dateObj = new Date();
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, '0');
    let output = month + ' ' + day + ',';

    return `${output} - ${new Date().getHours()}:${new Date().getMinutes()}`;
  };

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
          props.sendClick(msg, getDateString());
          setMsg('');
        }}
      >
        <SendIcon className={styles.send} />
      </IconButton>
    </div>
  );
};

export default MsgInput;
