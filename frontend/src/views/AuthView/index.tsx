import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Local Imports
import Welcome from '../../components/Auth/Welcome/index';
import Login from '../../components/Auth/Login/index';
import Signup from '../../components/Auth/Signup/index';
import styles from './styles.module.scss';

type Props = {};

const AuthView: React.FC<Props> = props => {
  return (
    <Router>
      <Route path="/" exact component={Welcome} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </Router>
  );
};

export default AuthView;
