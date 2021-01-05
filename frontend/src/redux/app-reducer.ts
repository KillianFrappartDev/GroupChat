type AppState = {
  inChannel: boolean;
  mobile: boolean;
  modal: boolean;
  editProfile: boolean;
  bug: boolean;
  loading: boolean;
  displayedGroups: [];
  messages: [];
  members: [];
  groups: [];
  currentGroup: null;
};

type AppAction = {
  type: string;
  payload: { currentGroup: {}; displayedGroups: []; groups: []; messages: []; members: [] };
};

const initialState: AppState = {
  inChannel: false,
  mobile: false,
  modal: false,
  editProfile: false,
  bug: false,
  loading: false,
  messages: [],
  members: [],
  displayedGroups: [],
  groups: [],
  currentGroup: null
};

const reducer = (state = initialState, action: AppAction) => {
  switch (action.type) {
    case 'CHANGE GROUP':
      return { ...state, currentGroup: action.payload.currentGroup, inChannel: true };

    case 'SEARCH':
      return { ...state, displayedGroups: action.payload.displayedGroups };

    case 'FETCH GROUPS':
      return { ...state, displayedGroups: action.payload.displayedGroups, groups: action.payload.groups };

    case 'FETCH MESSAGES':
      return { ...state, messages: action.payload.messages, members: action.payload.members };

    default:
      return state;
  }
};

export default reducer;
