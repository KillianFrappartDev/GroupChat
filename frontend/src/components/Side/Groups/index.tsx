import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type PropsGroup = {
  title: string;
  key: string;
  tag: string;
  id: string;
};

const Group: React.FC<PropsGroup> = props => {
  return (
    <div className={styles.group}>
      <span className={styles.tag}>{props.tag}</span>
      <p className={styles.title}>{props.title}</p>
    </div>
  );
};

type PropsGroups = {
  groups: PropsGroup[];
};

const Groups: React.FC<PropsGroups> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {props.groups.map(group => (
          <Group
            id={group.id}
            key={group.id}
            title={group.title}
            tag={`${group.title[0]}${group.title[1]}`.toUpperCase()}
          />
        ))}
      </div>
    </div>
  );
};

export default Groups;
