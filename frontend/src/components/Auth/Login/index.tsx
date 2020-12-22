import React, { useState } from 'react';
import axios from 'axios';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginSubmit = async (checked: boolean, email: string, password: string) => {
    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, { checked, email, password });
    } catch (error) {
      console.log('[ERROR][AUTH][LOGIN]: ', error);
      return;
    }
    console.log(response);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={styles.container}>
        <Link to="/">
          <img className={styles.logo} alt="logo" src={logo} />
        </Link>
        <form className={styles.form} onSubmit={e => e.preventDefault()}>
          <TextField
            className={styles.input}
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            className={styles.input}
            id="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            className={styles.check}
            control={
              <Checkbox checked={checked} onChange={() => setChecked(prev => !prev)} name="checkedB" color="primary" />
            }
            label="Remember me"
          />
          <CustomButton onClick={() => loginSubmit(checked, email, password)} isPurple title="Login" small={false} />
        </form>
        <Link to="/signup">
          <p className={styles.guest}>Don't have an account? Sign Up</p>
        </Link>
      </div>
    </ThemeProvider>
  );
};

export default Login;
