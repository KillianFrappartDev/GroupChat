import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Local Imports
import CustomButton from '../CustomButton/index';
import styles from './styles.module.scss';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

type Props = {
  backClick: () => void;
  onEdit: (username: string, image: string) => void;
};

const Modal: React.FC<Props> = props => {
  const [isValid, setIsValid] = useState(true);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelper, setUsernameHelper] = useState('');
  const [image, setImage] = useState('');

  const editHandler = (username: string, image: string) => {
    if (usernameError) {
      setIsValid(false);
      return;
    }

    props.onEdit(username, image);
  };

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value.length <= 2) {
      setUsernameError(true);
      setUsernameHelper('Title should contain at least 3 characters.');
    } else {
      setUsernameError(false);
      setUsernameHelper('');
      setIsValid(true);
    }

    setUsername(e.target.value);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={props.backClick}></div>
      <div className={styles.modal}>
        <h2>Profile</h2>
        <ThemeProvider theme={darkTheme}>
          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <TextField
              className={styles.input}
              id="username"
              label="Username"
              variant="outlined"
              onChange={e => usernameHandler(e)}
              helperText={usernameHelper}
              error={usernameError}
              value={username}
            />
            <CustomButton onClick={() => editHandler(username, image)} isPurple title="Edit" small />
            {!isValid && <p className={styles.error}>Invalid entries.</p>}
          </form>
        </ThemeProvider>
      </div>
    </>
  );
};

export default Modal;
