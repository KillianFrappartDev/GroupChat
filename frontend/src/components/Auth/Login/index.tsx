import React, { useState } from 'react';
import axios from 'axios';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Local Imports
import logo from '../../../assets/gc-logo-symbol-nobg.png';
import CustomButton from '../../Shared/CustomButton/index';
import styles from './styles.module.scss';

type Props = {};

const Login: React.FC<Props> = props => {
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState(true);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelper, setEmailHelper] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState('');

  // Async Requests
  const loginSubmit = async (checked: boolean, email: string, password: string) => {
    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, {
        checked,
        email: email.toLowerCase(),
        password: password.toLowerCase()
      });
    } catch (error) {
      console.log('[ERROR][AUTH][LOGIN]: ', error);
      return;
    }
    if (!response.data.access) return;
    if (checked) {
      localStorage.setItem('userData', JSON.stringify({ id: response.data.user.id, token: response.data.user.token }));
    }
    dispatch({ type: 'LOGIN', payload: { ...response.data.user } });
  };

  // Input Validation
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const currentValue = e.target.value;

    if (!reg.test(currentValue)) {
      setEmailError(true);
      setEmailHelper('Please enter a valid email.');
    } else {
      setEmailError(false);
      setEmailHelper('');
      setIsValid(true);
    }

    setEmail(currentValue);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value.length < 6) {
      setPasswordError(true);
      setPasswordHelper('Passwords should have at least 6 characters.');
    } else {
      setPasswordError(false);
      setPasswordHelper('');
      setIsValid(true);
    }

    setPassword(e.target.value);
  };

  const submitHandler = (checked: boolean, email: string, password: string) => {
    if (emailError || passwordError) {
      setIsValid(false);
      return;
    }

    loginSubmit(checked, email, password);
  };

  return (
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
          type="text"
          error={emailError}
          value={email}
          onChange={e => emailHandler(e)}
          helperText={emailHelper}
        />
        <TextField
          className={styles.input}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          error={passwordError}
          onChange={e => passwordHandler(e)}
          helperText={passwordHelper}
        />
        <FormControlLabel
          className={styles.check}
          control={
            <Checkbox checked={checked} onChange={() => setChecked(prev => !prev)} name="checked" color="primary" />
          }
          label="Remember me"
        />
        <CustomButton onClick={() => submitHandler(checked, email, password)} isPurple title="Login" small={false} />
        {!isValid && <p className={styles.error}>Invalid entries.</p>}
      </form>
      <Link to="/signup">
        <p className={styles.guest}>Don't have an account? Sign Up</p>
      </Link>
    </div>
  );
};

export default Login;
