import axios from 'axios'
import {toast} from 'react-toastify'

export function apiCall(method, path, data) {
	return new Promise((resolve, reject) => {
		return axios[method](`${process.env.REACT_APP_API_URL}${path}`, data)
			.then((response) => resolve(response.data))
			.catch((err) => {
				toast.error(err.response.data.error.message)
				reject(err.response.data.error)
			})
	})
}

export const setTokenHeader = (token) => {
	if (token) {
		axios.defaults.headers['Authorization'] = `Bearer ${token}`
	} else delete axios.defaults.headers['Authorization']
}
