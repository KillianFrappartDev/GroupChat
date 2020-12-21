import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type PropsGroup = {
  title: string;
  tag: string;
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
          <Group title={group.title} tag={group.tag} />
        ))}
      </div>
    </div>
  );
};

export default Groups;
