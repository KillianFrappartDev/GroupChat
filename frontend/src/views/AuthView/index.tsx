import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Local Imports
import Welcome from '../../components/Auth/Welcome/index';
import Login from '../../components/Auth/Login/index';
import Signup from '../../components/Auth/Signup/index';
import styles from './styles.module.scss';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

type Props = {};

const AuthView: React.FC<Props> = props => {
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <Route path="/" exact component={Welcome} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </ThemeProvider>
    </Router>
  );
};

export default AuthView;
