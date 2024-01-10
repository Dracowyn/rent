import Index from "../../views/business/base/Index";
import Login from "../../views/business/base/Login";
import Register from "../../views/business/base/Register";
import Profile from "../../views/business/base/Profile";
import Email from "../../views/business/base/Email";

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
	{
		path: 'base/email',
		name: 'BaseEmail',
		component: Email,
		auth: true,
	}
]

export default Base;