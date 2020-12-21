import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type PropsGroup = {};

const Group: React.FC<PropsGroup> = props => {
  return <h1>Groups</h1>;
};

type PropsGroups = {};

const Groups: React.FC<PropsGroups> = props => {
  return <div className={styles.container}></div>;
};

export default Groups;
