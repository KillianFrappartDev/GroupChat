import React from 'react';

// Local Imports
import Welcome from '../../components/Auth/Welcome/index';
import styles from './styles.module.scss';

type Props = {};

const AuthView: React.FC<Props> = props => {
  return <Welcome />;
};

export default AuthView;
