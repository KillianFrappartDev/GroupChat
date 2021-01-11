import React, { useState } from 'react';
import axios from 'axios';
import { TextField, FormControlLabel, Checkbox, Snackbar, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

// Local Imports
import logo from '../../../assets/gc-logo-symbol-nobg.png';
import CustomButton from '../../Shared/CustomButton/index';
import styles from './styles.module.scss';

type Props = {};

type SnackData = {
  open: boolean;
  message: string | null;
};

const Signup: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [snack, setSnack] = useState<SnackData>({ open: false, message: null });

  // Async Requests
  const signupSubmit = async (checked: boolean, email: string, password: string, username: string) => {
    setIsLoading(true);
    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signup`, {
        checked,
        email: email.toLowerCase(),
        password: password.toLowerCase(),
        username
      });
    } catch (error) {
      console.log('[ERROR][AUTH][SIGNUP]: ', error);
      setIsLoading(false);
      return;
    }
    if (!response.data.access) {
      setSnack({ open: true, message: response.data.message });
      setIsLoading(false);
      return;
    }
    if (checked) {
      localStorage.setItem('userData', JSON.stringify({ id: response.data.user.id, token: response.data.user.token }));
    }
    dispatch({ type: 'LOGIN', payload: { ...response.data.user } });
    history.push('');
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, 'Must be 2 characters at least')
        .required('Required')
        .max(12, 'Can not exceed 12 characters'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Must be 6 characters at least')
        .required('Required')
        .max(20, 'Can not exceed 20 characters')
    }),
    onSubmit: values => signupSubmit(checked, values.email, values.password, values.username)
  });

  return (
    <div className={styles.container}>
      <Link to="/">
        <img className={styles.logo} alt="logo" src={logo} />
      </Link>
      <form className={styles.form}>
        <TextField
          className={styles.input}
          id="username"
          label="Username"
          variant="outlined"
          helperText={formik.touched.username && formik.errors.username}
          error={formik.touched.username && !!formik.errors.username}
          {...formik.getFieldProps('username')}
        />
        <TextField
          className={styles.input}
          id="email"
          label="Email"
          variant="outlined"
          helperText={formik.touched.email && formik.errors.email}
          error={formik.touched.email && !!formik.errors.email}
          {...formik.getFieldProps('email')}
        />
        <TextField
          className={styles.input}
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          helperText={formik.touched.password && formik.errors.password}
          error={formik.touched.password && !!formik.errors.password}
          {...formik.getFieldProps('password')}
        />
        <FormControlLabel
          className={styles.check}
          control={
            <Checkbox checked={checked} onChange={() => setChecked(prev => !prev)} name="checkedB" color="primary" />
          }
          label="Remember me"
        />
        <CustomButton type="submit" onClick={formik.handleSubmit} isPurple title="Signup" small={false} />
      </form>
      <Link to="/login">
        <p className={styles.guest}>Already a member ? Login</p>
      </Link>
      {isLoading && <CircularProgress />}
      <Snackbar open={snack.open} onClose={() => setSnack({ open: false, message: null })} autoHideDuration={5000}>
        <MuiAlert variant="filled" onClose={() => setSnack({ open: false, message: null })} severity="error">
          {snack.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Signup;
