import React, { useState } from 'react';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

// Local Imports
import logo from '../../../assets/gc-logo-symbol-nobg.png';
import CustomButton from '../../Shared/CustomButton/index';
import styles from './styles.module.scss';

type Props = {};

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const Login: React.FC<Props> = props => {
  const [checked, setChecked] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={styles.container}>
        <Link to="/">
          <img className={styles.logo} alt="logo" src={logo} />
        </Link>
        <form className={styles.form}>
          <TextField className={styles.input} id="email" label="Email" variant="outlined" />
          <TextField className={styles.input} id="password" label="Password" variant="outlined" />
          <FormControlLabel
            className={styles.check}
            control={
              <Checkbox checked={checked} onChange={() => setChecked(prev => !prev)} name="checkedB" color="primary" />
            }
            label="Remember me"
          />
          <CustomButton isPurple title="Signup" />
        </form>
        <Link to="/signup">
          <p className={styles.guest}>Don't have an account? Sign Up</p>
        </Link>
      </div>
    </ThemeProvider>
  );
};

export default Login;
