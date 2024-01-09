import React, {useState} from "react";
import {Form, Notify} from "react-vant";
import {NavLink, useNavigate} from "react-router-dom";
import base from "../../../api/business/base";
import {useCookies} from "react-cookie";

const Login = () => {
	const [form] = Form.useForm();

	let navigate = useNavigate();

	// 定义状态
	const [mobile, setMobile] = useState('')
	const [password, setPassword] = useState('');

	const [cookies, setCookie] = useCookies(['business']);

	const onSubmit = () => {
		if (!mobile) {
			Notify.show({
				type: 'warning',
				message: '请输入手机号',
				duration: 1500
			})
			return
		}

		let MobileReg = /^1[3456789]\d{9}$/;
		if (!MobileReg.test(mobile)) {
			Notify.show({
				type: 'warning',
				message: '请输入正确的手机号',
				duration: 1500
			})
			return
		}

		if (!password) {
			Notify.show({
				type: 'warning',
				message: '请输入密码',
				duration: 1500
			})
			return
		}

		let data = {
			mobile,
			password
		};

		// 发送请求
		(async () => {
			let res = await base.login(data);
			if (res.code === 1) {
				setCookie('business', JSON.stringify(res.data), { path: '/' });

				Notify.show({
					type: 'success',
					message: res.msg,
					duration: 1500,
					onClose: () => {
						navigate('/business/base/index')
					}
				})
			} else {
				Notify.show({
					type: 'warning',
					message: res.msg,
					duration: 1500
				})
			}
		})()
	}

	const onChangeInput = (e) => {
		let name = e.target.name;
		let value = e.target.value.trim();

		switch (name) {
			case 'mobile':
				setMobile(value)
				break;
			case 'password':
				setPassword(value)
				break;
			default:
				break;
		}
	}

	return (
		<>
			{/* 图标样式 */}
			<link rel={'stylesheet'} type={'text/css'}
				  href={'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/font-awesome/4.7.0/css/font-awesome.min.css'}/>

			{/* 布局样式 */}
			<link rel={'stylesheet'} type={'text/css'} href="/assets/css/util.css"/>

			{/* 主要样式 */}
			<link rel={'stylesheet'} type={'text/css'} href={'/assets/css/main.css'}/>

			<div className="limiter">
				<div className="container-login100" style={{backgroundImage: "url('/assets/images/img-01.jpg')"}}>
					<div className="wrap-login100 p-t-190 p-b-30">
						<Form form={form} onFinish={onSubmit} className="login100-form validate-form">
							<div className="login100-form-avatar">
								<img src="/assets/images/avatar-01.jpg" alt="AVATAR"/>
							</div>

							<span className="login100-form-title p-t-20 p-b-45">Hello</span>

							<div className="wrap-input100 validate-input m-b-10" data-validate="请输入手机号">
								<input className="input100" type="text" name="mobile" value={mobile}
									   placeholder="手机号" onChange={(e) => onChangeInput(e)} autoComplete="off"/>
								<span className="focus-input100"></span>
								<span className="symbol-input100">
                                    <i className="fa fa-user"></i>
                                </span>
							</div>

							<div className="wrap-input100 validate-input m-b-10" data-validate="请输入密码">
								<input className="input100" type="password" name="password" value={password}
									   placeholder="密码" onChange={(e) => onChangeInput(e)}/>
								<span className="focus-input100"></span>
								<span className="symbol-input100">
                                    <i className="fa fa-lock"></i>
                                </span>
							</div>

							<div className="container-login100-form-btn p-t-10">
								<button className="login100-form-btn">登 录</button>
							</div>

							<div className="text-center w-full p-t-25">
								<NavLink className="txt1" to='/business/base/register'>
									立即注册
									<i className="fa fa-long-arrow-right"></i>
								</NavLink>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login;