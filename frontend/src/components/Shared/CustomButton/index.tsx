import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  isPurple: boolean;
  title: string;
  small: boolean;
};

const CustomButton: React.FC<Props> = props => {
  if (!props.isPurple) return <button className={styles.black}>{props.title}</button>;
  else return <button className={props.small ? styles.smallPurple : styles.purple}>{props.title}</button>;
};

export default CustomButton;
