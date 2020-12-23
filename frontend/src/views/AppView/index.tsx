import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Local Imports
import Messages from '../../components/Main/Messages/index';
import MsgInput from '../../components/Main/MsgInput/index';
import MainTopBar from '../../components/Main/TopBar/index';
import SideTopBar from '../../components/Side/TopBar/index';
import BottomBar from '../../components/Side/BottomBar/index';
import Search from '../../components/Side/Search/index';
import Groups from '../../components/Side/Groups/index';
import GroupInfo from '../../components/Side/GroupInfo/index';
import Members from '../../components/Side/Members/index';
import Modal from '../../components/Shared/Modal/index';
import { DUMMY_MESSAGES, DUMMY_GROUPS, DUMMY_MEMBERS } from '../../utils/dummy-data';
import styles from './styles.module.scss';

type Props = {};

const AppView: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [inChannel, setInChannel] = useState(true);
  const [modal, setModal] = useState(false);

  // Async Requests
  const createGroup = async (title: string, description: string) => {
    console.log(title, description);
    setModal(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  let sideContent;
  if (inChannel) {
    sideContent = (
      <div className={styles.sideContent}>
        <GroupInfo />
        <Members members={DUMMY_MEMBERS} />
      </div>
    );
  } else {
    sideContent = (
      <div className={styles.sideContent}>
        <Search />
        <Groups groups={DUMMY_GROUPS} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.side}>
        <SideTopBar inChannel={inChannel} arrowClick={() => setInChannel(false)} plusClick={() => setModal(true)} />
        {sideContent}
        <BottomBar exitClick={logoutHandler} />
      </div>
      <div className={styles.main}>
        <MainTopBar title="Welcome 👋" menuClick={() => console.log('Clicked')} />
        <Messages messages={DUMMY_MESSAGES} />
        <MsgInput />
      </div>
      {modal && <Modal backClick={() => setModal(false)} onCreate={createGroup} />}
    </div>
  );
};

export default AppView;
