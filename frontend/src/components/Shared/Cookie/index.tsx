import React, { useState } from 'react';

// Local Imports
import image from '../../../assets/cookies.png';
import CustomButton from '../CustomButton/index';
import styles from './styles.module.scss';

type Props = {
  onAccept: () => void;
};

const Cookie: React.FC<Props> = props => {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.container}>
      {open && (
        <div className={styles.box}>
          <h3 className={styles.title}>Are you hungry ?</h3>
          <div className={styles.actions}>
            <CustomButton isPurple small title="Accept cookies" onClick={props.onAccept} />
            <a className={styles.info} target="_blank" href="https://ec.europa.eu/info/cookies_en">
              More information.
            </a>
          </div>
        </div>
      )}
      <img className={styles.cookie} onClick={() => setOpen(prev => !prev)} src={image} />
    </div>
  );
};

export default Cookie;
