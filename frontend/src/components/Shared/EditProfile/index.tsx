import React, { useState, useRef, useLayoutEffect } from 'react';
import { TextField, CircularProgress } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';
import sha1 from 'sha1';
import { useDispatch } from 'react-redux';

// Local Imports
import CustomButton from '../CustomButton/index';
import styles from './styles.module.scss';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

type Props = {
  onEdit: (username: string, image: string) => void;
};

interface IRootState {
  auth: {
    username: string;
    image: string;
  };
}

const EditProfile: React.FC<Props> = props => {
  const dispatch = useDispatch();

  const { username, image } = useSelector((state: IRootState) => state.auth);
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [newUsername, setUsername] = useState(username);
  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelper, setUsernameHelper] = useState('');
  const [newImage, setImage] = useState(image);

  const editHandler = (newUsername: string, newImage: string) => {
    if (usernameError) {
      setIsValid(false);
      return;
    }

    props.onEdit(newUsername, newImage);
  };

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value.length <= 2 || e.target.value.length > 12) {
      setUsernameError(true);
      setUsernameHelper('Username should contain 3 to 12 characters.');
    } else {
      setUsernameError(false);
      setUsernameHelper('');
      setIsValid(true);
    }

    setUsername(e.target.value);
  };

  const postImage = async (data: FormData) => {
    setIsLoading(true);
    let response;
    try {
      response = await axios.post('https://api.cloudinary.com/v1_1/djghq5xmi/image/upload', data);
    } catch (error) {
      console.log('ERROR', error);
      setIsLoading(false);
    }
    if (!response) return;
    setImage(response.data.secure_url);
    setIsLoading(false);
  };

  const uploadHandler = (e: any) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API!);
    formData.append('timestamp', Math.floor(Date.now() / 1000).toString());
    formData.append(
      'signature',
      sha1(`timestamp=${Math.floor(Date.now() / 1000)}${process.env.REACT_APP_CLOUDINARY_SECRET}`)
    );
    postImage(formData);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={() => dispatch({ type: 'MODAL', payload: { modal: null } })}></div>
      <div className={styles.modal}>
        <h2>Profile</h2>
        <ThemeProvider theme={darkTheme}>
          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <img
              className={styles.image}
              alt="User"
              src={newImage}
              onClick={() => {
                if (imagePickerRef.current !== null) imagePickerRef.current.click();
              }}
            />
            <input
              className={styles.file}
              type="file"
              ref={imagePickerRef}
              accept=".jpg,.png,.jpeg"
              onChange={uploadHandler}
            />
            <TextField
              className={styles.input}
              id="username"
              label="Username"
              variant="outlined"
              onChange={e => usernameHandler(e)}
              helperText={usernameHelper}
              error={usernameError}
              value={newUsername}
            />
            <CustomButton onClick={() => editHandler(newUsername, newImage)} isPurple title="Edit" small />
            {!isValid && <p className={styles.error}>Invalid entries.</p>}
            {isLoading && <CircularProgress />}
          </form>
        </ThemeProvider>
      </div>
    </>
  );
};

export default EditProfile;
