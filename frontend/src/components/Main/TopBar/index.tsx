import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type Props = {};

const TopBar: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Title</h2>
    </div>
  );
};

export default TopBar;
