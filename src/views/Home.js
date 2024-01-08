import React from "react";
import Footer from "../components/common/Footer";

const Home = () => {
	return (
		<>
			{/* 轮播图 */}
			<div className={'banner_shouy'}>
				<div className={'swiper-wrapper'}>
					<div className={'swiper-slide'}>
						<img src='/assets/images/banner.jpg' alt=""/>
					</div>
					<div className={'swiper-slide'}>
						<img src='/assets/images/banner1.jpg' alt=""/>
					</div>
				</div>
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
						<div className={'swiper-wrapper'}>
							<div className={'swiper-slide'}>
								<a href={'/'} className={'a_blok'}>
									<img src='/assets/images/chanp_img.jpg' alt={''}/>
									<span>查看详情</span>
								</a>
							</div>
							<div className={'swiper-slide'}>
								<a href={'/'} className={'a_blok'}>
									<img src='/assets/images/chanp_img1.jpg' alt={''}/>
									<span>查看详情</span>
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className="list_color">
					<ul>
						<li>
							<img src="/assets/images/banner.jpg" alt=""/>
							<div className="right">
								<p>
									人的美丽会随着时间的流失,会渐渐流失在往日的光彩照人里,只有知识的美丽才是永...
								</p>
								<span>
                                    博弈论在商业和生活不同场景中的应用指南教程，比《策略思维》有趣、有料、更有挑战性。
                                </span>
							</div>
						</li>
						<li>
							<img src="/assets/images/banner1.jpg" alt=""/>
							<div className="right">
								<p>人的美丽会随着时间的流失 </p>
								<span>
                                    博弈论在商业和生活不同场景中的应用指南教程，比《策略思维》有趣、有料、更有挑战性。
                                </span>
							</div>
						</li>
						<li>
							<img src="/assets/images/anli.jpg" alt=""/>
							<div className="right">
								<p>
									人的美丽会随着时间的流失,会渐渐流失在往日的光彩照人里,只有知识的美丽才是永...
								</p>
								<span>
                                    博弈论在商业和生活不同场景中的应用指南教程，比《策略思维》有趣、有料、更有挑战性。
                                </span>
							</div>
						</li>
						<li>
							<img src="/assets/images/anli1.jpg" alt=""/>
							<div className="right">
								<p>
									人的美丽会随着时间的流失,会渐渐流失在往日的光彩照人里,只有知识的美丽才是永...
								</p>
								<span>
                                    博弈论在商业和生活不同场景中的应用指南教程，比《策略思维》有趣、有料、更有挑战性。
                                </span>
							</div>
						</li>
					</ul>
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