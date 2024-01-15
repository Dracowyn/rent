import {POST} from "../../services/request";

const Home = {
	index(data = {}) {
		return POST({
			url: '/home/index',
			params: data
		});
	}
}

export default Home;