import A from '../actionTypes';

export const addError = (error) => {
  return {
    type: A.ADD_ERROR,
    error,
  };
};

export const removeError = () => {
  return {type: A.REMOVE_ERROR};
};
