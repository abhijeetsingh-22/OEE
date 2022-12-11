import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setAuthUser} from '../../store/actions/auth';

function AuthForm(props) {
  const history = useHistory();
  const [email, setEmail] = useState('staff@oee.in');
  const [password, setPassowrd] = useState('password');
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name == 'email') setEmail(e.target.value);
    else setPassowrd(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAuthUser('signin', {email, password})).then(() => history.push('/'));
  };

  return (
    <div className='container d-flex flex-column justify-content-center  pt-4  my-auto mx-auto min-vh-100'>
      <div className='row align-items-center justify-content-md-center  '>
        <div className='col-9  col-md-10 col-lg-7 col-xl-4 bg-light mx-auto p-5 '>
          <h2 className='text-center'>Login</h2>
          {error.message && <div className='alert alert-danger'>{error.message}</div>}
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                className='form-control'
                type='email'
                value={email}
                name='email'
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                className='form-control'
                type='password'
                value={password}
                name='password'
                onChange={handleChange}
              />
            </div>

            <button type='submit' className='btn btn-primary col-12 my-3'>
              {/* {buttonText} */}
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
