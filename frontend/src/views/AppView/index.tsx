import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type Props = {};

const AppView: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.side}></div>
      <div className={styles.main}></div>
    </div>
  );
};

export default AppView;
