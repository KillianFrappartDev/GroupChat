import React from 'react';

// Local Imports
import MsgInput from '../../components/Main/MsgInput/index';
import styles from './styles.module.scss';

type Props = {};

const AppView: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.side}></div>
      <div className={styles.main}>
        <div>PlaceHolder</div>
        <div>PlaceHolder</div>
        <MsgInput />
      </div>
    </div>
  );
};

export default AppView;
