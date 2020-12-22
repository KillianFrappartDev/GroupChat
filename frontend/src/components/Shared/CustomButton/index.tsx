import React from 'react';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  isPurple: boolean;
  title: string;
};

const CustomButton: React.FC<Props> = props => {
  if (!props.isPurple) return <button className={styles.login}>{props.title}</button>;
  else return <button className={styles.signup}>{props.title}</button>;
};

export default CustomButton;
