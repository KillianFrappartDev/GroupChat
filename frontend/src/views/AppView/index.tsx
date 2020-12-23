import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

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
import { DUMMY_MESSAGES, DUMMY_MEMBERS } from '../../utils/dummy-data';
import styles from './styles.module.scss';

type Props = {};

type GroupData = {
  _id: string;
  title: string;
  description: string;
};

const AppView: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [inChannel, setInChannel] = useState(true);
  const [modal, setModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [displayedGroups, setDisplayedGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({ id: '0', title: '', description: '' });

  useEffect(() => {
    fetchGroups();
    const socket = socketIOClient('http://localhost:5000', { transports: ['websocket'] });
    socket.on('test', () => {
      console.log('WE MADE IT');
    });
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  const groupHandler = (id: string) => {
    const current = groups.filter((item: GroupData) => item._id === id);
    setCurrentGroup(current[0]);
    setInChannel(true);
  };

  const searchHandler = (grps: any) => {
    setDisplayedGroups(grps);
  };

  // Async Requests
  const createGroup = async (title: string, description: string) => {
    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/groups`, {
        title,
        description
      });
    } catch (error) {
      console.log('[ERROR][GROUPS][CREATE]: ', error);
      return;
    }
    setModal(false);
    fetchGroups();
  };

  const fetchGroups = async () => {
    let response;
    try {
      response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/groups`);
    } catch (error) {
      console.log('[ERROR][GROUPS][FETCH]: ', error);
      return;
    }
    if (!response) return;
    setGroups(response.data.groups);
    setDisplayedGroups(response.data.groups);
    setCurrentGroup(response.data.groups[0]);
  };

  let sideContent;
  if (inChannel) {
    sideContent = (
      <div className={styles.sideContent}>
        <GroupInfo currentGroup={currentGroup} />
        <Members members={DUMMY_MEMBERS} />
      </div>
    );
  } else {
    sideContent = (
      <div className={styles.sideContent}>
        <Search groups={groups} update={filteredGroups => searchHandler(filteredGroups)} />
        <Groups groups={displayedGroups} groupClick={id => groupHandler(id)} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.side}>
        <SideTopBar
          inChannel={inChannel}
          arrowClick={() => {
            setInChannel(false);
            setDisplayedGroups(groups);
          }}
          plusClick={() => setModal(true)}
        />
        {sideContent}
        <BottomBar exitClick={logoutHandler} />
      </div>
      <div className={styles.main}>
        <MainTopBar title={currentGroup.title} menuClick={() => console.log('Clicked')} />
        <Messages messages={DUMMY_MESSAGES} />
        <MsgInput />
      </div>
      {modal && <Modal backClick={() => setModal(false)} onCreate={createGroup} />}
    </div>
  );
};

export default AppView;
