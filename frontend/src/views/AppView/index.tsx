import React from 'react';

// Local Imports
import Messages from '../../components/Main/Messages/index';
import MsgInput from '../../components/Main/MsgInput/index';
import MainTopBar from '../../components/Main/TopBar/index';
import SideTopBar from '../../components/Side/TopBar/index';
import BottomBar from '../../components/Side/BottomBar/index';
import { DUMMY_MESSAGES } from '../../utils/dummy-data';
import styles from './styles.module.scss';

type Props = {};

const AppView: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.side}>
        <SideTopBar
          isInChannel={false}
          arrowClick={() => console.log('Clicked')}
          plusClick={() => console.log('Clicked')}
        />
        <h1>Place Holder</h1>
        <BottomBar exitClick={() => console.log('Clicked')} />
      </div>
      <div className={styles.main}>
        <MainTopBar title="Front-End" menuClick={() => console.log('Clicked')} />
        <Messages messages={DUMMY_MESSAGES} />
        <MsgInput />
      </div>
    </div>
  );
};

export default AppView;
