import React from 'react';

// Local Imports
import Messages from '../../components/Main/Messages/index';
import MsgInput from '../../components/Main/MsgInput/index';
import TopBar from '../../components/Main/TopBar/index';
import styles from './styles.module.scss';

type Props = {};

const AppView: React.FC<Props> = props => {
  const DUMMY_MESSAGES = [
    {
      image:
        'https://images.pexels.com/photos/1220757/pexels-photo-1220757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      text: 'Hello World! 🌟',
      username: 'John Smith'
    },
    {
      image:
        'https://images.pexels.com/photos/3366753/pexels-photo-3366753.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      text: 'How are you doing today ?',
      username: 'Marie Doe'
    },
    {
      image:
        'https://images.pexels.com/photos/2738919/pexels-photo-2738919.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      text: 'This app works well ✅',
      username: 'Elena White'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.side}></div>
      <div className={styles.main}>
        <TopBar title="Front-End" menuClick={() => console.log('Clicked')} />
        <Messages messages={DUMMY_MESSAGES} />
        <MsgInput />
      </div>
    </div>
  );
};

export default AppView;
