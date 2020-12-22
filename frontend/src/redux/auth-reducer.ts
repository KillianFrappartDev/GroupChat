type UserState = {
    isLogged: boolean;
    username: string | null;
    image: string | null;
    token: string | null;
  };

type UserAction = {
  type: string;
  payload: {
    username: string;
    image: string;
    token: string;
  }
}

  const initialState: UserState = { isLogged: false, username: null, image: null, token: null };

  const reducer = ( state = initialState, action: UserAction) => {
    switch(action.type) {
      case 'LOGIN':
        return {...state, isLogged: true, username: action.payload.username, image: action.payload.image, token: action.payload.token}

      case 'LOGOUT':
        return {...state, isLogged: false, username: null, image: null, token: null}

      default:
        return state;
    }
  }

  export default reducer;