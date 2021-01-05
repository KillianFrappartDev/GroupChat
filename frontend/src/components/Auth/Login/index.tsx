import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, FormControlLabel, Checkbox, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Local Imports
import logo from '../../../assets/gc-logo-symbol-nobg.png';
import CustomButton from '../../Shared/CustomButton/index';
import styles from './styles.module.scss';

type Props = {};

type SnackData = {
  open: boolean;
  message: string | null;
};

const Login: React.FC<Props> = props => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [snack, setSnack] = useState<SnackData>({ open: false, message: null });

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
    if (!response.data.access) {
      setSnack({ open: true, message: response.data.message });
      return;
    }
    if (checked) {
      localStorage.setItem('userData', JSON.stringify({ id: response.data.user.id, token: response.data.user.token }));
    }
    dispatch({ type: 'LOGIN', payload: { ...response.data.user } });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters at least').required('Required')
    }),
    onSubmit: values => loginSubmit(checked, values.email, values.password)
  });

  return (
    <div className={styles.container}>
      <Link to="/">
        <img className={styles.logo} alt="logo" src={logo} />
      </Link>
      <form className={styles.form}>
        <TextField
          className={styles.input}
          id="email"
          label="Email"
          variant="outlined"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          helperText={formik.touched.email && formik.errors.email}
          error={formik.touched.email && !!formik.errors.email}
        />
        <TextField
          className={styles.input}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          helperText={formik.touched.password && formik.errors.password}
          error={formik.touched.password && !!formik.errors.password}
        />
        <FormControlLabel
          className={styles.check}
          control={
            <Checkbox checked={checked} onChange={() => setChecked(prev => !prev)} name="checked" color="primary" />
          }
          label="Remember me"
        />
        <CustomButton type="submit" onClick={formik.handleSubmit} isPurple title="Login" small={false} />
      </form>
      <Link to="/signup">
        <p className={styles.guest}>Don't have an account? Sign Up</p>
      </Link>
      <Snackbar open={snack.open} onClose={() => setSnack({ open: false, message: null })} autoHideDuration={5000}>
        <MuiAlert variant="filled" onClose={() => setSnack({ open: false, message: null })} severity="error">
          {snack.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Login;
