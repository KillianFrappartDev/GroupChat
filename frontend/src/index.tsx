import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// Local imports
import App from './App';
import appReducer from './redux/app-reducer';
import authReducer from './redux/auth-reducer';
import './index.scss';

const rootReducer = combineReducers({ auth: authReducer, app: appReducer });

const store = createStore(rootReducer);

ReactDOM.render(
  // <React.StrictMode></React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
