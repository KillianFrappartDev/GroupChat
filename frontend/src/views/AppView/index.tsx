import React from 'react';

// Local Imports
import MsgInput from '../../components/Main/MsgInput/index';
import TopBar from '../../components/Main/TopBar/index';
import styles from './styles.module.scss';

type Props = {};

const AppView: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.side}></div>
      <div className={styles.main}>
        <TopBar title="Front-End" menuClick={() => console.log('Clicked')} />
        <div>PlaceHolder</div>
        <MsgInput />
      </div>
    </div>
  );
};

export default AppView;
