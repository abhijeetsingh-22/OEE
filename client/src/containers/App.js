import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import Main from './Main';
import Footer from '../components/Footer';
import jwtDecode from 'jwt-decode';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {setCurrentUser, setToken} from '../store/actions/auth';

const store = configureStore();

function App() {
  if (localStorage.authToken) {
    setToken(localStorage.authToken);
    try {
      store.dispatch(setCurrentUser(jwtDecode(localStorage.authToken)));
    } catch (e) {
      setCurrentUser({});
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
  );
}

export default App;
