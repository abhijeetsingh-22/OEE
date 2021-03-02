import {apiCall, setTokenHeader} from '../../services/api';
import A from '../actionTypes';
import {addError, removeError} from './error';

export function setCurrentUser(user) {
  return {type: A.SET_CURRENT_USER, user};
}

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    dispatch(setCurrentUser({}));
    setToken(false);
  };
}

export function setToken(token) {
  setTokenHeader(token);
}

export function setAuthUser(type, userData) {
  // return new Promise((resolve, reject) => {});
  return async (dispatch) => {
    try {
      const {token, ...user} = await apiCall('post', `/api/auth/signin`, userData);
      localStorage.setItem('authToken', token);
      setToken(token);
      dispatch(setCurrentUser(user));
      dispatch(removeError());
    } catch (error) {
      console.error('error occured');
      dispatch(addError(error.message));
      // throw new Error();
    }
  };
}
