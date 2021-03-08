import React from 'react';
import {useSelector} from 'react-redux';
import {Link, Switch, Route, withRouter, useHistory} from 'react-router-dom';
import AuthForm from './AuthForm';
import ProtectedRoute from '../../hocs/ProtectedRoute';
import Dashboard from './Dashboard';

function Main(props) {
  const currentUser = useSelector((state) => state.currentUser);
  // const history = useHistory();
  // if (!currentUser.isAuthenticated) history.push('/signin');
  return (
    <Switch>
      <Route exact path='/login' component={AuthForm} />
      <ProtectedRoute path='/' currentUser={currentUser} component={Dashboard} />
    </Switch>
  );
}
export default Main;
