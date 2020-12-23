import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  isPurple: boolean;
  title: string;
  small: boolean;
  onClick: () => void;
};

const CustomButton: React.FC<Props> = props => {
  if (!props.isPurple)
    return (
      <button onClick={props.onClick} className={styles.black}>
        {props.title}
      </button>
    );
  else
    return (
      <button onClick={props.onClick} className={props.small ? styles.smallPurple : styles.purple}>
        {props.title}
      </button>
    );
};

export default CustomButton;
