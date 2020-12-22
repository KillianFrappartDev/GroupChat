import React from 'react';
import { useSelector } from 'react-redux';

// Local Imports
import AppView from './views/AppView/index';
import AuthView from './views/AuthView/index';

interface IRootState {
  isLogged: boolean;
}

const App: React.FC = () => {
  const isAuth = useSelector((state: IRootState) => state.isLogged);

  return isAuth ? <AppView /> : <AuthView />;
};

export default App;
