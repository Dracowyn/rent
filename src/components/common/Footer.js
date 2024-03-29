import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Tabbar} from "react-vant";
import {AppsO, Description, UserO, WapHomeO} from "@react-vant/icons";

const Footer = () => {
	let location = useLocation();
	let navigate = useNavigate();

	// 定义状态
	const [active, setActive] = React.useState(location.pathname);

	const onChangeBar = (name) => {
		setActive(name);
		navigate(name);
	}

	return (
		<div className="footer_menu">
			<Tabbar value={active} onChange={onChangeBar} activeColor={'#ef6382'}>
				<Tabbar.Item name={'/'} icon={<WapHomeO/>}>首页</Tabbar.Item>
				<Tabbar.Item name={''} icon={<AppsO/>}>商品</Tabbar.Item>
				<Tabbar.Item name={'/category/category/index'} icon={<Description/>}>学术</Tabbar.Item>
				<Tabbar.Item name={'/business/base/index'} icon={<UserO/>}>我的</Tabbar.Item>
			</Tabbar>
		</div>
	)
}

export default Footer;