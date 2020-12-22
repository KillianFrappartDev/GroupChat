import React from 'react';
import ReactDOM from 'react-dom';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  backClick: () => void;
};

const Modal: React.FC<Props> = props => {
  return (
    <div className={styles.backdrop} onClick={props.backClick}>
      <div className={styles.modal}>
        <h2>New channel</h2>
      </div>
    </div>
  );
};

export default Modal;
