import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {configureStore} from '../store'
import Main from './common/Main'
import Footer from './common/Footer'
import jwtDecode from 'jwt-decode'
import Navbar from './common/Navbar'
import Sidebar from './common/Sidebar'
import {setCurrentUser, setToken} from '../store/actions/auth'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const store = configureStore()
toast.configure({position: toast.POSITION.BOTTOM_RIGHT})
function App() {
	if (localStorage.authToken) {
		setToken(localStorage.authToken)
		try {
			store.dispatch(setCurrentUser(jwtDecode(localStorage.authToken)))
		} catch (e) {
			setCurrentUser({})
		}
	}
	return (
		<Provider store={store}>
			<Router>
				{/* <Navbar />
        <Sidebar /> */}
				<Main />
			</Router>
		</Provider>
	)
}

export default App
