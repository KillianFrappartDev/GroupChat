import React from 'react';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Local Imports
import logo from '../../../assets/gc-logo-symbol-nobg.png';
import styles from './styles.module.scss';

type Props = {};

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#252329'
    },
    secondary: {
      main: '#120F13'
    }
  }
});

const Login: React.FC<Props> = props => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={styles.container}>
        <img className={styles.logo} alt="logo" src={logo} />
        <form className={styles.form}>
          <TextField className={styles.input} id="email" label="Email" variant="outlined" />
          <TextField className={styles.input} id="password" label="Password" variant="outlined" />
          <FormControlLabel
            className={styles.check}
            control={<Checkbox checked={false} onChange={() => console.log('Click')} name="checkedB" color="primary" />}
            label="Remember me"
          />
        </form>
      </div>
    </ThemeProvider>
  );
};

export default Login;
