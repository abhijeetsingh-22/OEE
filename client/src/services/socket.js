import io from 'socket.io-client'
// import {SOCKET_URL} from 'config'

const options = {auth: {token: localStorage.authToken}}
export const socket = io(process.env.REACT_APP_API_URL, options)
