import {POST} from "../../services/request";

const Category = {
	index(data = {}) {
		return POST({
			url: '/category/index',
			params: data,
		})
	},
	getHot(data = {}) {
		return POST({
			url: '/category/hot',
			params: data,
		})
	}
}

export default Category;