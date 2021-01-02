type UserState = {
    isLogged: boolean;
    id: string | null;
    username: string | null;
    image: string | null;
    token: string | null;
  };

type UserAction = {
  type: string;
  payload: {
    id: string;
    username: string;
    image: string;
    token: string | null;
  }
}

  const initialState: UserState = { isLogged: false, username: null, image: null, token: null, id: null };

  const reducer = ( state = initialState, action: UserAction) => {
    switch(action.type) {
      case 'LOGIN':
        return {...state, isLogged: true, username: action.payload.username, image: action.payload.image, token: action.payload.token, id: action.payload.id}

      case 'LOGOUT':
        return {...state, isLogged: false, username: null, image: null, token: null, id: null}

      case 'GUEST':
        return {...state, isLogged: true, username: action.payload.username, image: action.payload.image, token: null, id: action.payload.id}

      case 'EDIT':
        return {...state, isLogged: true, username: action.payload.username, image: action.payload.image}

      default:
        return state;
    }
  }

  export default reducer;