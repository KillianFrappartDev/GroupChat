import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

// Local Imports
import Onboard from '../../components/Main/Onboard/index';
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
import EditProfile from '../../components/Shared/EditProfile/index';
import BugReport from '../../components/Shared/BugReport/index';
import styles from './styles.module.scss';

type GroupData = {
  _id: string;
  title: string;
  description: string;
  groupClick: () => void;
};

type SnackData = {
  open: boolean;
  message: string | null;
  severity: 'success' | 'error' | undefined;
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
  const [mobile, setMobile] = useState(false);
  const [modal, setModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [bug, setBug] = useState(false);
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayedGroups, setDisplayedGroups] = useState<GroupData[]>([]);
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState<GroupData | null>(null);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [snack, setSnack] = useState<SnackData>({ open: false, severity: undefined, message: null });

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL!, { transports: ['websocket'] });
    socket.emit('new user', userData.id);
    socket.on('fetch messages', (id: string) => fetchMessages(id));
    socket.on('fetch group', fetchGroups);
    setSocket(socket);
    fetchGroups();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit('join group', userData.id, currentGroup?._id);

    fetchMessages();
  }, [currentGroup]);

  // Handlers
  const logoutHandler = () => {
    socket?.disconnect();
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  const groupHandler = (id: string) => {
    setLoading(true);
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
    const { token, id } = userData;
    if (!token) {
      setSnack({ open: true, severity: 'error', message: `Guests are not allowed to create groups, please register.` });
      return;
    }

    let verifiedToken;
    try {
      verifiedToken = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/verify`, {
        id,
        token
      });
    } catch (error) {
      console.log('[ERROR][AUTH][VERIFY]: ', error);
      return;
    }
    if (!verifiedToken.data.access) {
      localStorage.removeItem('userData');
      return;
    }

    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/groups`, {
        title,
        description: description ? description : 'No description.'
      });
    } catch (error) {
      console.log('[ERROR][GROUPS][CREATE]: ', error);
      setSnack({ open: true, severity: 'error', message: `An error occured: Could not create group.` });
      return;
    }
    if (!response) return;
    setModal(false);
    fetchGroups();
    socket?.emit('create group', userData.id, title);
    setSnack({ open: true, severity: 'success', message: `${title} channel created.` });
  };

  const editProfileRequest = async (username: string, image: string) => {
    const { token, id } = userData;
    if (!token) {
      setSnack({ open: true, severity: 'error', message: `Guests are not allowed to edit profile, please register.` });
      return;
    }

    let verifiedToken;
    try {
      verifiedToken = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/verify`, {
        id,
        token
      });
    } catch (error) {
      console.log('[ERROR][AUTH][VERIFY]: ', error);
      return;
    }
    if (!verifiedToken.data.access) {
      localStorage.removeItem('userData');
      return;
    }

    let response;
    try {
      response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/edit`, {
        id,
        username,
        image
      });
    } catch (error) {
      console.log('[ERROR][USERS][EDIT]: ', error);
      setSnack({ open: true, severity: 'error', message: `An error occured: Could not edit profile.` });
      return;
    }
    if (!response) return;
    setEditProfile(false);
    setSnack({ open: true, severity: 'success', message: `Profile updated.` });
    dispatch({ type: 'EDIT', payload: { username: response.data.user.username, image: response.data.user.image } });
  };

  const createMessage = async (text: string, date: string) => {
    if (!socket) return;

    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/messages`, {
        gid: currentGroup?._id,
        text,
        username: userData.username,
        image: userData.image,
        uid: userData.id,
        date
      });
    } catch (error) {
      console.log('[ERROR][GROUPS][CREATE]: ', error);
      setSnack({ open: true, severity: 'error', message: `An error occured: Could not send message.` });
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
      setSnack({ open: true, severity: 'error', message: `An error occured: Could not fetch groups.` });
      return;
    }
    if (!response) return;
    setGroups(response.data.groups);
    setDisplayedGroups(response.data.groups);
  };

  const fetchMessages = async (gid = currentGroup?._id) => {
    if (!gid) return;
    let response;
    try {
      response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/groups/${gid}`);
    } catch (error) {
      console.log('[ERROR][MESSAGES][FETCH]: ', error);
      setSnack({ open: true, severity: 'error', message: `An error occured: Could not fetch messages and members.` });
      setLoading(false);
      return;
    }
    setLoading(false);
    if (response.data.error) {
      setSnack({ open: true, severity: 'error', message: `An error occured: Could not fetch messages and members.` });
      return;
    }
    setMessages(response.data.messages);
    setMembers(response.data.members);
  };

  const reportBug = async (title: string, description: string) => {
    const { id } = userData;

    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/bugs`, {
        id,
        title,
        description: description ? description : 'No description.'
      });
    } catch (error) {
      console.log('[ERROR][BUGS][CREATE]: ', error);
      setSnack({ open: true, severity: 'error', message: `An error occured: Could not report bug.` });
      return;
    }
    if (!response) return;
    setBug(false);
    setSnack({ open: true, severity: 'success', message: `Bug reported, thank you!` });
  };

  // Render
  let sideContent;
  let mainContent;

  if (inChannel) {
    sideContent = (
      <div className={styles.sideContent}>
        <GroupInfo currentGroup={currentGroup} />
        <Members members={members} loading={loading} />
      </div>
    );
    mainContent = (
      <div className={styles.main}>
        <MainTopBar title={currentGroup?.title} menuClick={() => setMobile(true)} />
        <Messages messages={messages} onClick={() => setMobile(false)} loading={loading} />
        <MsgInput sendClick={createMessage} onClick={() => setMobile(false)} />
      </div>
    );
  } else {
    sideContent = (
      <div className={styles.sideContent}>
        <Search groups={groups} update={filteredGroups => searchHandler(filteredGroups)} />
        <Groups groups={displayedGroups} groupClick={id => groupHandler(id)} />
      </div>
    );
    mainContent = (
      <div className={styles.main}>
        <MainTopBar title="" menuClick={() => setMobile(true)} />
        <Onboard onClick={() => setMobile(false)} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={mobile ? styles.mobile : styles.side}>
        <SideTopBar
          inChannel={inChannel}
          arrowClick={() => {
            setInChannel(false);
            setDisplayedGroups(groups);
            setMembers([]);
            setMessages([]);
            setCurrentGroup(null);
          }}
          plusClick={() => {
            setModal(true);
            setMobile(false);
          }}
        />
        {sideContent}
        <BottomBar
          exitClick={logoutHandler}
          profileClick={() => {
            setEditProfile(true);
            setMobile(false);
          }}
          bugClick={() => {
            setBug(true);
            setMobile(false);
          }}
        />
      </div>
      {mainContent}
      {modal && <Modal backClick={() => setModal(false)} onCreate={createGroup} />}
      {editProfile && <EditProfile backClick={() => setEditProfile(false)} onEdit={editProfileRequest} />}
      {bug && <BugReport backClick={() => setBug(false)} onReport={reportBug} />}
      <Snackbar
        open={snack.open}
        onClose={() => setSnack({ open: false, severity: snack.severity, message: null })}
        autoHideDuration={5000}
      >
        <MuiAlert
          variant="filled"
          onClose={() => setSnack({ open: false, severity: snack.severity, message: null })}
          severity={snack.severity}
        >
          {snack.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AppView;
