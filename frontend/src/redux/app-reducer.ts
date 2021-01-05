type UserState = {};

type UserAction = {
  type: string;
  payload: {};
};

const initialState: UserState = {};

const reducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
