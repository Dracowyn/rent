import React from "react";
import {useCookies} from "react-cookie";
import {Navigate} from "react-router-dom";

const AuthRouter = ({component: Component, auth}) => {
	const [cookies] = useCookies(['business']);
	const business = cookies.business;

	if (auth) {
		if (!business || JSON.stringify(business) === '{}') {
			return (
				<Navigate to="/business/base/login"/>
			)
		} else {
			return <Component />
		}
	} else {
		return <Component/>
	}
}

export default AuthRouter;