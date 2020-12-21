import React from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

// Local Imports
import styles from './styles.module.scss';

type Props = {};

const Search: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <IconButton className={styles.iconButton}>
        <SearchIcon className={styles.search} />
      </IconButton>
      <InputBase className={styles.input} placeholder="Search..." />
    </div>
  );
};

export default Search;
