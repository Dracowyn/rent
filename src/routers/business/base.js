import Index from "../../views/business/base/Index";
import Login from "../../views/business/base/Login";
import Register from "../../views/business/base/Register";
import Profile from "../../views/business/base/Profile";

const Base = [
	{
		path: 'base/index',
		name: 'BaseIndex',
		component: Index,
		auth: true,
	},
	{
		path: 'base/login',
		name: 'BaseLogin',
		component: Login,
		auth: false,
	},
	{
		path: 'base/register',
		name: 'BaseRegister',
		component: Register,
		auth: false,
	},
	{
		path: 'base/profile',
		name: 'BaseProfile',
		component: Profile,
		auth: true,
	},
]

export default Base;