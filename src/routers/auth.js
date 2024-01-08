import React from "react";

const AuthRouter = (props) => {
	if (props.auth) {
		let business = React.Cookies.load('business') ? React.Cookies.load('business') : {};

		if (!business || JSON.stringify(business) === '{}') {
			return (
				<>
					<React.Router.Navigate to="/business/base/login"/>
				</>
			)
		} else {
			return (
				<>
					<props.component/>
				</>
			)
		}
	} else {
		return (
			<>
				<props.component/>
			</>
		)
	}
}

export default AuthRouter;