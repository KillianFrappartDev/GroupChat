import React, { useState } from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

// Local Imports
import styles from './styles.module.scss';

type Props = {
  groups: Group[];
  update: (groups: Group[]) => void;
};

type Group = {
  title: string;
  _id: string;
  description: string;
  members: any;
  groupClick: () => {};
};

const Search: React.FC<Props> = props => {
  const [searchValue, setSearchValue] = useState('');

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.target.value);
    const allGroups = props.groups;
    const filteredGroups: Group[] = allGroups.filter(grp =>
      grp.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    props.update(filteredGroups);
  };

  return (
    <div className={styles.container}>
      <IconButton className={styles.iconButton}>
        <SearchIcon className={styles.search} />
      </IconButton>
      <InputBase
        className={styles.input}
        placeholder="Search..."
        onChange={e => searchHandler(e)}
        value={searchValue}
      />
    </div>
  );
};

export default Search;
