import React, { useState } from 'react';

// Local Imports
import image from '../../../assets/cookies.png';
import styles from './styles.module.scss';

type Props = {};

const Cookie: React.FC<Props> = props => {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.container}>
      {open && <div className={styles.box}></div>}
      <img className={styles.cookie} onClick={() => setOpen(prev => !prev)} src={image} />
    </div>
  );
};

export default Cookie;
