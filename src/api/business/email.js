import {POST} from "../../services/request";

const Email = {
	emailSend(data = {}) {
		return POST({
			url: '/business/email/send',
			params: data
		});
	},
	emailCheck(data = {}) {
		return POST({
			url: '/business/email/check',
			params: data
		});
	}
}

export default Email;