import Index from "./base";
import Login from "./base/login";
import Register from "./base/register";
import Profile from "./base/Profile";

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