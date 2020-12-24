import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { DUMMY_MEMBERS } from '../../utils/dummy-data';
import styles from './styles.module.scss';

type GroupData = {
  _id: string;
  title: string;
  description: string;
  groupClick: () => void;
};

interface IRootState {
  isLogged: boolean;
  id: string | null;
  username: string | null;
  image: string | null;
  token: string | null;
}

const AppView: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: IRootState) => state);

  const [inChannel, setInChannel] = useState(false);
  const [modal, setModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [displayedGroups, setDisplayedGroups] = useState<GroupData[]>([]);
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState<GroupData | null>(null);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL!, { transports: ['websocket'] });
    setSocket(socket);
    fetchGroups();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit('join group', userData.id, currentGroup?._id);
    socket.on('fetch messages', (id: string) => {
      console.log('CURRENT: ', currentGroup?._id, ' ID: ', id);
      if (currentGroup?._id == id) fetchMessages(id);
    });
    fetchMessages();
  }, [currentGroup]);

  const logoutHandler = () => {
    socket?.disconnect();
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  const groupHandler = (id: string) => {
    const current = groups.filter((item: GroupData) => item._id === id);
    if (current.length > 0) {
      setCurrentGroup(current[0]);
      setInChannel(true);
    }
  };

  const searchHandler = (grps: GroupData[]) => {
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
    if (!response) return;
    setModal(false);
    fetchGroups();
    socket?.emit('create group', userData.id, title);
  };

  const createMessage = async (text: string) => {
    if (!socket) return;

    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/messages`, {
        gid: currentGroup?._id,
        text,
        username: userData.username,
        image: userData.image
      });
    } catch (error) {
      console.log('[ERROR][GROUPS][CREATE]: ', error);
      return;
    }
    if (!response) return;
    socket?.emit('message', userData.id, currentGroup?._id);
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
  };

  const fetchMessages = async (gid = currentGroup?._id) => {
    let response;
    try {
      response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/messages/${gid}`);
    } catch (error) {
      console.log('[ERROR][MESSAGES][FETCH]: ', error);
      return;
    }
    if (!response.data.messages) return;
    setMessages(response.data.messages);
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
        <MainTopBar title={currentGroup?.title} menuClick={() => console.log('Clicked')} />
        <Messages messages={messages} />
        <MsgInput sendClick={createMessage} />
      </div>
      {modal && <Modal backClick={() => setModal(false)} onCreate={createGroup} />}
    </div>
  );
};

export default AppView;
