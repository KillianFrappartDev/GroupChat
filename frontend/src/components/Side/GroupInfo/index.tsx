import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  currentGroup: {
    title: string;
    description: string;
  } | null;
};

const GroupInfo: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.title}>{props.currentGroup?.title}</p>
        <p className={styles.description}>{props.currentGroup?.description}</p>
      </div>
    </div>
  );
};

export default GroupInfo;
