import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type PropsGroup = {
  title: string;
  key?: string;
  tag?: string;
  _id: string;
  groupClick: (id: string) => void;
};

const Group: React.FC<PropsGroup> = props => {
  return (
    <div className={styles.group} onClick={() => props.groupClick(props._id)}>
      <span className={styles.tag}>{props.tag}</span>
      <p className={styles.title}>{props.title}</p>
    </div>
  );
};

type PropsGroups = {
  groups: PropsGroup[];
  groupClick: (id: string) => void;
};

const Groups: React.FC<PropsGroups> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {props.groups.map(group => (
          <Group
            _id={group._id}
            key={group._id}
            title={group.title}
            tag={`${group.title[0]}${group.title[1]}`.toUpperCase()}
            groupClick={id => props.groupClick(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Groups;
