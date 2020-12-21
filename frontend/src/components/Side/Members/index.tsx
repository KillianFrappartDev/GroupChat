import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type MemberProps = {
  username: string;
  image: string;
};

const Member: React.FC<MemberProps> = props => {
  return (
    <div className={styles.member}>
      <img className={styles.image} alt="User image" src={props.image} />
      <p className={styles.username}>{props.username}</p>
    </div>
  );
};

type MembersProps = {
  members: MemberProps[];
};

const Members: React.FC<MembersProps> = props => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Members</p>
      <div className={styles.wrapper}>
        {props.members.map(member => (
          <Member username={member.username} image={member.image} />
        ))}
      </div>
    </div>
  );
};

export default Members;
