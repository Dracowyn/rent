import {POST, UPLOAD} from '../../services/request'

const base = {
	register: (data = {}) => {
		return POST({
			url: '/business/base/register',
			params: data
		})
	},
	login: (data = {}) => {
		return POST({
			url: '/business/base/login',
			params: data
		})
	},
	profile: (data = {}) => {
		return POST({
			url: '/business/base/profile',
			params: data
		})
	},
	avatar: (data = {}) => {
		return UPLOAD({
			url: '/business/base/avatar',
			params: data
		})
	},
}

export default base;
