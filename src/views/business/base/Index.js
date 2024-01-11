import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import Footer from "../../../components/common/Footer";
import {useCookies} from "react-cookie";
import {Dialog, Notify} from "react-vant";
import base from "../../../api/business/base";

const Index = () => {
	// 获取cookie
	const [cookies, , removeCookie] = useCookies(['business']);

	// 设置状态数据
	const [business] = React.useState(JSON.stringify(cookies.business) === '{}' ? null : cookies.business);

	let navigate = useNavigate();

	const [count, setCount] = React.useState({
		productCount: 0,
		cateCount: 0,
		orderCount: 0,
	})

	// 退出登录
	const logout = (e) => {
		// 组织默认事件
		e.preventDefault();
		Dialog.confirm({
			title: '提示',
			message: '您确定要退出登录吗？',
		}).then(() => {
			Notify.show({
				type: 'success',
				message: '退出登录成功',
				duration: 1500,
				onClose: () => {
					removeCookie('business', {path: '/'});
					navigate('/business/base/login');
				}
			})
		}).catch(() => {
			// on cancel
		});
	}

	// 获取头像
	const getAvatar = () => {
		let avatar = '';
		if (business && business.avatar) {
			avatar = business.avatar;
		} else {
			avatar = '/assets/images/toux.jpg';
		}
		return avatar;
	}

	// 获取昵称
	const getNickname = () => {
		let nickname = '';
		if (business && business.nickname) {
			nickname = business.nickname;
		} else {
			nickname = '未设置昵称';
		}
		return nickname;
	}


	// 获取数据总数
	React.useEffect(() => {
		if (!business) {
			Notify.show({
				type: 'warning',
				message: '请先登录',
				duration: 1500,
				onClose: () => {
					navigate('/business/base/login');
				}
			})
			return;
		}
		const getCountData = async () => {
			let data = {
				busid: business.id,
			}

			let result = await base.index(data);

			if (result.code === 1) {
				setCount(result.data);
			} else {
				Notify.show({
					type: 'warning',
					message: result.msg,
					duration: 1500,
				})
			}
		}
		getCountData().then(r => r);
	}, [business, navigate]);

	// 获取认证状态
	const Email = () => {
		if (business && business.auth !== '1') {
			return (
				<div className="my_dind">
					<div className="bt">
						<NavLink to="/business/base/email">
							<h3><img src="/assets/images/my_x_01.png" alt=""/>邮箱认证</h3>
							<div className="right">
								<img src="/assets/images/right_jiant.png" alt=""/>
							</div>
						</NavLink>
					</div>
				</div>
			)
		}
	}


	return (
		<>
			<div className="my_kuang">
				<div className="bj_img">
					<img className="beij_s" src="/assets/images/my_beij.jpg" alt=""/>
					<div className="nimetou_gaib">
						<div className="toux_hou">
							<img id="Dfgrg" src={getAvatar()} alt=""/>
							<input id="tupian_Sc" type="file"/>
						</div>
						<div className="mingz">
							<h2>{getNickname()}</h2>
						</div>
					</div>
				</div>
				<div className="div_bx_k">
					<div className="neir_Ef">
						<div className="yverjif">
							<ul>
								<li>
									<h2>{count.productCount}</h2>
									<p>收藏商品</p>
								</li>
								<li>
									<h2>{count.cateCount}</h2>
									<p>收藏文章</p>
								</li>
								<li>
									<h2>{count.orderCount}</h2>
									<p>订单总数</p>
								</li>
							</ul>
						</div>

						{/* 菜单 */}
						<div className="list_index_my">
							<div className="fenh_ziyek">
								<h3>更多服务</h3>
							</div>

							<div className="my_dind">
								<div className="bt">
									<NavLink to="/business/base/profile">
										<h3><img src="/assets/images/my_x_01.png" alt=""/>基本资料</h3>
										<div className="right">
											<img src="/assets/images/right_jiant.png" alt=""/>
										</div>
									</NavLink>
								</div>
							</div>

							{/* 邮箱认证 */}
							<Email/>

							<div className="my_dind">
								<div className="bt">
									<NavLink to="/business/base/record">
										<h3><img src="/assets/images/my_x_01.png" alt="img"/>消费记录</h3>
										<div className="right">
											<img src="/assets/images/right_jiant.png" alt="img"/>
										</div>
									</NavLink>
								</div>
							</div>

							<div className="my_dind">
								<div className="bt">
									<NavLink to="/business/base/profile">
										<h3><img src="/assets/images/my_x_01.png" alt="img"/>意见反馈</h3>
										<div className="right">
											<img src="/assets/images/right_jiant.png" alt="img"/>
										</div>
									</NavLink>
								</div>
							</div>

							<div className="my_dind">
								<div className="bt">
									<NavLink to="/about">
										<h3><img src="/assets/images/my_x_02.png" alt=""/>关于我们</h3>
										<div className="right">
											<img src="/assets/images/right_jiant.png" alt=""/>
										</div>
									</NavLink>
								</div>
							</div>
							<div className="my_dind">
								<div className="bt">
									<a onClick={logout} href={'/'}>
										<h3><img src="/assets/images/my_x_02.png" alt=""/>退出登录</h3>
										<div className="right">
											<img src="/assets/images/right_jiant.png" alt=""/>
										</div>
									</a>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</>
	)
}

export default Index;