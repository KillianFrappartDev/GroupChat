import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type Props = {};

const GroupInfo: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Welcome 👋</p>
        <p className={styles.description}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum pariatur quo laudantium labore, itaque
          repudiandae voluptates temporibus. Beatae excepturi quo iusto deserunt sunt aspernatur id aperiam dignissimos
          voluptatem! Harum, delectus!
        </p>
      </div>
    </div>
  );
};

export default GroupInfo;
