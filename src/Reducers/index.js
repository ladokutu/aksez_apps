const initialState = {
  usersData:[],
  logindata: false,
  drawer: false,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
	case 'GET_DATA_USERS':
      return {
            ...state,
            usersData:action.payload,
        }
	case 'SET_DATA_USERS':
      return {
            ...state,
            usersData : action.payload,
        }
	case 'SET_LOGIN':
      return {
            ...state,
            logindata : action.payload,
        }
	case 'SET_DRAWER':
      return {
            ...state,
            drawer : action.payload,
        }
	default:
      return state;
  }
};

export default reducers;