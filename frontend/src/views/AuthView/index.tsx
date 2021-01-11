import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

// Local Imports
import Cookie from '../../components/Shared/Cookie/index';
import Welcome from '../../components/Auth/Welcome/index';
import Login from '../../components/Auth/Login/index';
import Signup from '../../components/Auth/Signup/index';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

type Props = {};

type UserData = {
  id: string;
  token: string;
};

const AuthView: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [cookie, setCookie] = useState(true);

  useEffect(() => {
    const cookieData = localStorage.getItem('cookieData');
    if (cookieData) setCookie(false);
    const userData = localStorage.getItem('userData');
    if (!userData) return;
    const parsedData: UserData = JSON.parse(userData);
    verifyRequest(parsedData.id, parsedData.token);
  }, []);

  // Async Requests
  const verifyRequest = async (id: string, token: string) => {
    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/verify`, {
        id,
        token
      });
    } catch (error) {
      console.log('[ERROR][AUTH][VERIFY]: ', error);
      return;
    }
    if (!response.data.access) {
      localStorage.removeItem('userData');
      return;
    }
    dispatch({ type: 'LOGIN', payload: { ...response.data.user } });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      {cookie && (
        <Cookie
          onAccept={() => {
            localStorage.setItem('cookieData', 'accepted');
            setCookie(false);
          }}
        />
      )}
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/" exact component={Welcome} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AuthView;
