import React, {Component} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store/actions/auth';
import {capitalize} from '../../utils';
// import logo from '../assets/logo-new.svg';
function Navbar() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <header className='navbar  navbar-collapse navbar-expand-md navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow '>
      {/* <nav className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'> */}
      {/* <nav className='navbar navbar-dark sticky-top bg-dark p-0'> */}

      <a class='navbar-brand col-md-3 col-lg-2 me-0 px-3' href='#'>
        O E E
      </a>
      <button
        class='navbar-toggler position-absolute d-md-none collapsed'
        type='button'
        data-bs-toggle='collapse'
        data-bs-target='#sidebarMenu'
        aria-controls='sidebarMenu'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span class='navbar-toggler-icon'></span>
      </button>
      <input
        class='form-control form-control-dark w-100 d-none d-md-block'
        type='text'
        placeholder='Search'
        aria-label='Search'
      ></input>
      {/* <div className='container'> */}

      {currentUser.isAuthenticated ? (
        // <ul className='nav navbar-nav ml-auto'>
        <ul className='navbar-nav  px-2' id='topBar'>
          {' '}
          <li className='nav-item text-nowrap'>
            <Link
              to={`/users/${currentUser.user.id}/movies/new`}
              className='nav-link ml-4'
            >
              Welcome {capitalize(currentUser.user.name)}
            </Link>
          </li>
          <li className='nav-item text-nowrap'>
            <a onClick={dispatch(logout)} className='nav-link ml-4' href=''>
              Logout
            </a>
          </li>
        </ul>
      ) : (
        // </ul>
        // <ul className='nav navbar-nav nav-right'>
        <ul className='navbar-nav  px-2 collapse navbar-collapse' id='topBar'>
          {/* {' '}
              <li className='nav-item text-nowrap'>
                <Link to='/signup' className='nav-link ml-4'>
                  Sign up
                </Link>
              </li> */}
          <li className='nav-item text-nowrap'>
            <Link to='/signin' className='nav-link ml-4'>
              Login
            </Link>
          </li>
        </ul>
        // </ul>
      )}

      {/* </div> */}
    </header>
  );
}

export default Navbar;
