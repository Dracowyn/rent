import React from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, NavBar, Notify, Sticky} from "react-vant";
import email from "../../../api/business/email";


const Email = () => {
	// 获取cookie
	const [cookies, setCookie] = useCookies(['business']);

	// 设置状态数据
	const [business] = React.useState(JSON.stringify(cookies.business) === '{}' ? null : cookies.business);

	let navigate = useNavigate();
	// 提示信息
	const [msg, setMsg] = React.useState('发送验证码');
	// 按钮状态
	const [btnDisabled, setBtnDisabled] = React.useState(false);

	const [form] = Form.useForm();

	// 获取头像
	const getAvatar = () => {
		let avatar;
		if (business && business.avatar) {
			avatar = business.avatar;
		} else {
			avatar = '/assets/images/toux.jpg';
		}
		return avatar;
	}

	// 获取邮箱地址
	const getEmail = () => {
		let email = '';
		if (business && business.email) {
			email = business.email;
		}
		return email;
	}

	const onSend = async () => {
		let data = {
			busid: business.id,
			email: business.email,
		}

		let result = await email.emailSend(data);

		if (result.code === 1) {
			Notify.show({
				type: 'success',
				message: result.msg,
			})
		} else {
			Notify.show({
				type: 'warning',
				message: result.msg,
			})
			return;
		}

		let sec = 60;

		let timer = setInterval(() => {
			sec--;
			setBtnDisabled(true);
			setMsg(sec + '秒后重新发送');
			if (sec <= 0) {
				clearInterval(timer);
				setBtnDisabled(false);
				setMsg('重新发送');
			}
		}, 1000);
	}

	const onSubmit = () => {
		form.validateFields().then(async (res) => {
			console.log(res)
			let data = {
				busid: business.id,
				email: business.email,
				code: res.code.trim(),
			}

			let result = await email.emailCheck(data);

			if (result.code === 1) {
				Notify.show({
					type: 'success',
					message: result.msg,
					duration: 1500,
					onClose: () => {
						business.auth = '1';
						setCookie('business', JSON.stringify(business), {path: '/'});
						navigate(-1)
					}
				})
			} else {
				Notify.show({
					type: 'warning',
					message: result.msg,
					duration: 1500
				})
			}
		})
	}

	return (
		<>
			<Sticky>
				<NavBar
					title="邮箱认证"
					left-text="返回"
					left-arrow
					onClickLeft={() => navigate(-1)}
				/>
			</Sticky>

			<div className={'my_kuang'}>
				<div className={'bj_img'}>
					<img className={'beij_s'} src={'/assets/images/my_beij.jpg'} alt={''}/>
					<div className={'nimetou_gaib'}>
						<div className={'toux_hou'}>
							<img id={'Dfgrg'} src={getAvatar()} alt={''}/>
						</div>
					</div>
				</div>

				<div className={'profile'} style={{paddingBottom: '20px'}}>

					<Form form={form} onFinish={onSubmit}>
						<Form.Item
							label="邮箱地址"
							labelAlign="right"
							name="email"
							initialValue={getEmail()}
							colon
						>
							<Input placeholder="请输入邮箱地址" disabled/>
						</Form.Item>
						<Form.Item
							label="验证码"
							labelAlign="right"
							name={'code'}
							colon
						>
							<Input
								placeholder="请输入验证码"
								suffix={
									<Button
										size="small"
										type="primary"
										onClick={onSend}
										disabled={btnDisabled}
									>{msg}</Button>
								}
							/>
						</Form.Item>

						{/* 提交 */}
						<Form.Item>
							<Button
								round nativeType="submit"
								block type="primary"
							>保存</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	)
}

export default Email;