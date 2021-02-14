import {apiCall} from '../../services/api';

export const fetchCategories = () => {
  return async (dispatch) => {
    const response = await apiCall('get', '/api/categories');
    console.log(response);
  };
};
