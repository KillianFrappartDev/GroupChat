import React from 'react';
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
};

const Modal: React.FC<Props> = props => {
  return (
    <div className={styles.backdrop} onClick={props.backClick}>
      <div className={styles.modal}>
        <h2>New channel</h2>
        <ThemeProvider theme={darkTheme}>
          <form className={styles.form}>
            <TextField className={styles.input} id="title" label="Title" variant="outlined" />
            <TextField
              className={styles.input}
              id="description"
              rows={3}
              label="Description"
              variant="outlined"
              multiline
            />
            <CustomButton onClick={() => console.log('Clicked')} isPurple title="Create" small />
          </form>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Modal;
