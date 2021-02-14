import React from 'react';
import {Route, Redirect} from 'react-router-dom';
const ProtectedRoute = ({component: Component, role, currentUser, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        );
      }}
    />
  );
};

export default ProtectedRoute;
