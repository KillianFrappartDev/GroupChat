import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

// Local Imports
import styles from './styles.module.scss';

type MemberProps = {
  _id: string;
  username: string;
  image: string;
};

const Member: React.FC<MemberProps> = props => {
  return (
    <div className={styles.member}>
      <img className={styles.image} alt="User" src={props.image} />
      <p className={styles.username}>{props.username}</p>
    </div>
  );
};

type MembersProps = {
  members: MemberProps[];
  loading: boolean;
};

const Members: React.FC<MembersProps> = props => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Members</p>
      {props.loading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.wrapper}>
          {props.members.map(member => (
            <Member key={member?._id} _id={member?._id} username={member?.username} image={member?.image} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Members;
