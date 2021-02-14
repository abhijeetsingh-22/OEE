import A from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {},
};

function currentUserReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case A.SET_CURRENT_USER:
      return {
        isAuthenticated: Object.keys(action.user).length > 0,
        user: action.user,
      };
    default:
      return state;
  }
}

export default currentUserReducer;
