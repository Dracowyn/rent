import React from "react";
import Footer from "../components/common/Footer";
import home from "../api/home/home";
import {Image, NavBar, Notify, Sticky, Swiper} from "react-vant";
import {NavLink} from "react-router-dom";

const Home = () => {
	const [newList, setNewList] = React.useState([])
	const [recommendList, setRecommendList] = React.useState([])
	const [cateList, setCateList] = React.useState([])


	React.useEffect(() => {
		const getHomeData = async () => {
			let result = await home.index();
			if (result.code === 1) {
				setNewList(result.data.newList)
				setRecommendList(result.data.recommendList)
				setCateList(result.data.categoryList)
			} else {
				Notify.show({
					type: 'warning',
					message: result.msg,
					duration: 1500,
				})
			}
		}

		getHomeData().then(r => r);
	}, []);

	const NewSwiper = () => {
		if (newList.length > 0) {
			return (
				<>
					<Swiper autoplay={5000}>
						{newList.map(item => {
							return (
								<Swiper.Item key={item.id} style={{height: 200 +'px'}}>
									<Image src={item.thumb_cdn}/>
								</Swiper.Item>
							)
						})}
					</Swiper>
				</>
			)
		}
	}

	const RecommendSwiper = () => {
		if (recommendList.length > 0) {
			return (
				<>
					<Swiper autoplay={5000}>
						{recommendList.map(item => {
							return (
								<Swiper.Item key={item.id}>
									<NavLink to={'/product/product/info?id=' + item.id} className={'a_blok'}>
										<Image src={item.thumb_cdn}/>
										<span>查看详情</span>
									</NavLink>
								</Swiper.Item>
							)
						})}
					</Swiper>
				</>
			)
		}
	}

	const CategoryList = () => {
		if (cateList.length > 0) {
			return (
				<ul>
					{cateList.map(item => {
						return (
							<li key={item.id}>
								<img src={item.image_cdn} alt={''}/>
								<div className={'right'}>
									<p>
										{item.name}
									</p>
									<span>
										{item.createtime_text}
									</span>
								</div>
							</li>
						)
					})}
				</ul>
			)
		}
	}


	return (
		<>
			<Sticky zIndex={10}>
				<NavBar
					title={'租赁商城'}
					leftArrow={false}
				/>
			</Sticky>

			{/* 轮播图 */}
			<div className={'banner_shouy'}>
				<NewSwiper/>
			</div>

			{/* 快捷导航 */}
			<div className={'shouye_kuanj'}>
				<div className={'swiper-wrapper'} style={{display: 'flex'}}>
					<div className={'swiper-slide'} style={{width: '25%'}}>
						<a href={'/'} className={'shouye_kuanj_a'}>
							<img src='/assets/images/kj.png' alt=""/>
							<span>产品租赁</span>
						</a>
					</div>
					<div className={'swiper-slide'} style={{width: '25%'}}>
						<a href={'/'} className={'shouye_kuanj_a'}>
							<img src='/assets/images/kj1.png' alt=""/>
							<span>我要归还</span>
						</a>
					</div>
					<div className={'swiper-slide'} style={{width: '25%'}}>
						<a href={'/'} className={'shouye_kuanj_a'}>
							<img src='/assets/images/kj2.png' alt=""/>
							<span>商品大全</span>
						</a>
					</div>
					<div className={'swiper-slide'} style={{width: '25%'}}>
						<a href={'/'} className={'shouye_kuanj_a'}>
							<img src='/assets/images/kj3.png' alt=""/>
							<span>关于我们</span>
						</a>
					</div>
				</div>
				<div className={'swiper-pagination'}/>
			</div>

			{/* 产品中心 */}
			<div className={'chan_p_center'}>
				<div className={'chan_p_sy'} style={{marginBottom: '20px'}}>
					<div className={'sjpiue_chanp_list'}>
						<RecommendSwiper/>
					</div>
				</div>

				<div className="list_color">
					<CategoryList/>
				</div>
			</div>

			{/* 站位 */}
			<div style={{height: '.75rem'}}/>

			{/* 底部导航 */}
			<Footer/>
		</>
	)
}

export default Home;