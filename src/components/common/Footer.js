import React from "react";

const Footer = () => {
	let location = React.Router.useLocation();
	let navigate = React.Router.useNavigate();

	// 定义状态
	const [active, setActive] = React.useState(location.pathname);

	const onChangeBar = (name) => {
		setActive(name);
		navigate(name);
	}

	return (
		<div className="footer_menu">
			<React.Vant.Tabbar value={active} onChange={onChangeBar} activeColor={'#ef6382'}>
				<React.Vant.Tabbar.Item name={'/'} icon={<React.Icons.WapHomeO/>}>首页</React.Vant.Tabbar.Item>
				<React.Vant.Tabbar.Item name={''} icon={<React.Icons.WapHomeO/>}>商品</React.Vant.Tabbar.Item>
				<React.Vant.Tabbar.Item name={''} icon={<React.Icons.WapHomeO/>}>学术</React.Vant.Tabbar.Item>
				<React.Vant.Tabbar.Item name={''} icon={<React.Icons.WapHomeO/>}>我的</React.Vant.Tabbar.Item>
			</React.Vant.Tabbar>
		</div>
	)
}

export default Footer;