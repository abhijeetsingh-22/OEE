import React from 'react'
import {Route, Redirect} from 'react-router-dom'
const ProtectedRoute = ({component: Component, role, currentUser, componentProps, ...rest}) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!!role && currentUser.isAuthenticated) {
					// console.log('user', currentUser, 'role', role)
					if (currentUser.user.role === role) return <Component {...props} {...componentProps} />
					else return <Redirect to='/' />
				} else
					return currentUser.isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
			}}
		/>
	)
}

export default ProtectedRoute
