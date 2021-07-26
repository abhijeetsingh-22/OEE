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
import {library} from '@fortawesome/fontawesome-svg-core'
import {
	faCaretDown,
	faCommentAlt,
	faFolder,
	faMicrophone,
	faPaperPlane,
	faUserFriends,
	faUserPlus,
	faVideo,
	faMicrophoneSlash,
	faVideoSlash,
	faTag,
	faCode,
	faQuestion,
	faUsers,
	faLaptopCode,
	faPlusCircle,
	faHome,
	// faComment,
} from '@fortawesome/free-solid-svg-icons'
import {faComment, faHdd, faFolder as farFolder} from '@fortawesome/free-regular-svg-icons'
const store = configureStore()
toast.configure({position: toast.POSITION.BOTTOM_RIGHT, limit: 4})
library.add(
	faFolder,
	faCaretDown,
	faMicrophone,
	faVideo,
	faUserFriends,
	faCommentAlt,
	faUserPlus,
	faPaperPlane,
	faMicrophoneSlash,
	faVideoSlash,
	faComment,
	faHdd,
	faTag,
	farFolder,
	faHome,
	faQuestion,
	faCode,
	faPlusCircle,
	faLaptopCode,
	faUsers
)
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
