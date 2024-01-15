import React from "react";
import Footer from "../../components/common/Footer";
import {Empty, Image, List, NavBar, PullRefresh, Search, Sticky, Swiper, Toast} from "react-vant";
import {AppsO} from "@react-vant/icons";
import category from "../../api/category/category";
import {NavLink} from "react-router-dom";

const Index = () => {
	const [hotList, setHotList] = React.useState([]);
	const [categoryList, setCategoryList] = React.useState([]);
	const listRef = React.useRef(null);
	const [finished, setFinished] = React.useState(false);

	const [page, setPage] = React.useState(1);
	const [limit, setLimit] = React.useState(10);
	const categoryData = React.useRef([]);

	const isMounted = React.useRef(true);

	const onRefresh = () => {
		setFinished(false);
		setPage(1);
		setCategoryList([]);
		categoryData.current = [];

		return new Promise((resolve) => {
			setTimeout(() => {
				Toast.info('刷新成功');
				getCategoryData().then(r => r);
				resolve(true);
			}, 1500)
		})
	}

	const onLoadRefresh = () => {
		setFinished(true);
		getCategoryData().then(r => r);
	}

	const Items = () => {
		if (categoryList.length > 0) {
			return categoryList.map(item => {
				return (
					<li key={item.id}>
						<NavLink to={'/category/category/info?id=' + item.id} className={'a_blok'}>
							<img src={item.image_cdn} alt={''}/>
							<p>{item.name}</p>
							<span>{item.createtime_text}</span>
						</NavLink>
					</li>
				)
			})
		} else {
			return <Empty description={'暂无数据'}/>
		}
	}


	React.useEffect(() => {
		const getHotData = async () => {
			let result = await category.getHot();

			if (result && result.code === 1) {
				setHotList(result.data);
			}
		}
		getHotData().then(r => r);

		return () => {
			isMounted.current = false;
		};
	}, []);

	const getCategoryData = async () => {
		let data = {
			page,
			limit,
		}

		let result = await category.index(data);

		if (result && result.code === 1) {
			let count = result.data.count;
			categoryData.current = categoryData.current.concat(result.data.list);
			setCategoryList(categoryData.current);

			if (categoryData.current.length >= count) {
				setFinished(true);
				return;
			}

			setPage(page + 1);
			setFinished(false);
		}
	}

	const HotSwiper = () => {
		if (hotList.length > 0) {
			return (
				<Swiper>
					{hotList.map(item => (
						<Swiper.Item key={item.id}>
							<Image lazyLoad src={item.image_cdn}/>
						</Swiper.Item>
					))}
				</Swiper>
			)
		}
	}

	return (
		<>
			<Sticky zIndex={10}>
				<NavBar
					title="学术"
					leftText={<AppsO fontSize={'1.5em'}/>}
					rightText={<Search fontSize={'1.5em'}/>}
				/>
			</Sticky>

			<div className={'banner_shouy'}>
				<HotSwiper/>
			</div>

			{/* 列表 */}
			<PullRefresh onRefresh={onRefresh} onRefreshEnd={() => listRef.current?.check()}>
				<List finished={finished} ref={listRef} onLoad={onLoadRefresh}>
					<div className={'lest_xs'}>
						<ul>
							<Items/>
						</ul>
					</div>
				</List>
			</PullRefresh>

			<div style={{height: '.75em'}}/>

			<Footer/>
		</>
	)
}

export default Index;