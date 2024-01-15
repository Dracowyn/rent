import {POST} from "../../services/request";

const Category = {
	getHot(data = {}) {
		return POST({
			url: '/category/hot',
			params: data,
		})
	}
}

export default Category;