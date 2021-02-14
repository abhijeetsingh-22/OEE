import A from '../actionTypes';

function errorReducer(state = {}, action) {
  switch (action.type) {
    case A.ADD_ERROR:
      return {...state, message: action.error};
    case A.REMOVE_ERROR:
      return {...state, message: null};
    default:
      return state;
  }
}

export default errorReducer;
