import React, { useState } from 'react';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';
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
  onCreate: (title: string, description: string) => void;
};

const Modal: React.FC<Props> = props => {
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState('');
  const [titleError, setTitleEror] = useState(false);
  const [titleHelper, setTitleHelper] = useState('');
  const [description, setDescription] = useState('');

  const createHandler = (title: string, description: string) => {
    if (titleError) {
      setIsValid(false);
      return;
    }

    props.onCreate(title, description);
  };

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value.length <= 0) {
      setTitleEror(true);
      setTitleHelper('Title can not be empty.');
    } else {
      setTitleEror(false);
      setTitleHelper('');
      setIsValid(true);
    }

    setTitle(e.target.value);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={props.backClick}></div>
      <div className={styles.modal}>
        <h2>New channel</h2>
        <ThemeProvider theme={darkTheme}>
          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <TextField
              className={styles.input}
              id="title"
              label="Title"
              variant="outlined"
              onChange={e => titleHandler(e)}
              helperText={titleHelper}
              error={titleError}
              value={title}
            />
            <TextField
              className={styles.input}
              id="description"
              rows={3}
              label="Description"
              variant="outlined"
              multiline
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <CustomButton onClick={() => createHandler(title, description)} isPurple title="Create" small />
          </form>
        </ThemeProvider>
      </div>
    </>
  );
};

export default Modal;
