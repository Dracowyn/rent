import React from "react";
import {useCookies} from "react-cookie";
import {Navigate} from "react-router-dom";

const AuthRouter = ({component: Component, auth}) => {
	let [cookies] = useCookies(['business']);

	if (auth) {
		if (!cookies || JSON.stringify(cookies) === '{}') {
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