import React from "react";
import {useNavigate} from "react-router-dom";
import {Area, Button, Form, Input, NavBar, Notify, Picker, Popup, Sticky, Uploader} from "react-vant";
import {useCookies} from "react-cookie";
import {areaList} from "@vant/area-data";
import base from "../../../api/business/base";

const Profile = () => {
	let navigate = useNavigate();

	const [form] = Form.useForm();

	const [cookies, setCookie] = useCookies(['business']);

	const [business, setBusiness] = React.useState(JSON.stringify(cookies.business) === '{}' ? null : cookies.business)

	const [genderShow, setGenderShow] = React.useState(false)

	const [genderList, setGenderList] = React.useState([
		{text: '保密', value: 0},
		{text: '男', value: 1},
		{text: '女', value: 2},
	])

	const [regionShow, setRegionShow] = React.useState(false)
	const [code, setCode] = React.useState([
		'business.province',
		'business.city',
		'business.district',
	])

	const [avatar, setAvatar] = React.useState([])

	const onSubmit = () => {
		form.validateFields().then(async (res) => {
			let data = {
				busid: business.id,
				nickname: business.nickname,
				email: business.email,
				gender: business.gender,
				province: business.province,
				city: business.city,
				district: business.district,
			}

			let avatar = res.avatar[0].file ? res.avatar[0].file : {};
			if (avatar || JSON.stringify(avatar) !== '{}') {
				data.avatar = avatar;
			}

			let res2 = await base.profile(data);

			if (res2.code === 1) {
				setBusiness(res2.data);
				// 更新cookie
				setCookie('business', JSON.stringify(res2.data), {path: '/'});
				Notify.show({
					type: 'success',
					message: res2.msg,
					duration: 1500,
				})
			} else {
				Notify.show({
					type: 'danger',
					message: res2.msg,
					duration: 1500
				})
			}
		})
	}

	const genderConfirm = (_, item) => {
		setGenderShow(false)
		if (item) {
			business.gender = item.value;
			business.gender_text = item.text;
		}
	}

	const regionConfirm = (_, item) => {
		setRegionShow(false)

		let [province, city, district] = item;

		if (!province || !city || !district) {
			return;
		}

		let region_text = province.text + '-' + city.text + '-' + district.text;
		let region = [province.value, city.value, district.value]

		setCode(region)
		business.region_text = region_text;
		business.region = region;
	}

	const getAvatar = () => {
		let avatar = '';
		if (business && business.avatar) {
			avatar = business.avatar;
		} else {
			avatar = '/assets/images/toux.jpg';
		}
		return avatar;
	}

	const formFooter = () => {
		return (
			<div style={{margin: '16px 16px 0'}}>
				<Button round nativeType="submit" block type="primary">保存</Button>
			</div>
		)
	}

	return (
		<>
			<Sticky z-index={10}>
				<NavBar
					title={'基本资料'}
					leftText={'返回'}
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
					<Form
						form={form}
						onFinish={onSubmit}
						footer={formFooter}
						labelAlign={'right'}
						colon
					>
						{/* 手机号 */}

						<Form.Item
							label={'手机号'}
							name='mobile'
							labelWidth='55'
							initialValue={business.mobile}
						>
							<Input placeholder={'请输入手机号'} readOnly/>
						</Form.Item>


						{/* 昵称 */}
						<Form.Item
							rules={[{required: true, message: '请填写昵称'}]}
							name='nickname'
							label='昵称'
							labelWidth='55'
							initialValue={business.nickname || ''}
						>
							<Input placeholder='请输入昵称'/>
						</Form.Item>

						<Form.Item
							rules={[{required: true, message: '请填写邮箱'}]}
							name='email'
							label='邮箱'
							labelWidth='55'
							initialValue={business.email || ''}
						>
							<Input type='email' placeholder='请输入邮箱'/>
						</Form.Item>

						<Form.Item
							name='password'
							label='密码'
							labelWidth='55'
						>
							<Input type='password' placeholder='留空不修改密码'/>
						</Form.Item>

						{/* 性别 */}
						<Form.Item
							label="性别"
							onClick={() => {
								setGenderShow(true)
							}}
							isLink
							labelWidth='55'

						>
							<Input placeholder="请选择性别" readOnly value={business.gender_text}/>
						</Form.Item>


						<Popup
							position="bottom"
							round visible={genderShow}
							onClose={() => {
								setGenderShow(false)
							}}>
							<Picker
								title="性别"
								columns={genderList}
								defaultValue={business.gender * 1}
								onConfirm={genderConfirm}
								onCancel={() => {
									setGenderShow(false)
								}}
							/>
						</Popup>

						{/* 地区 */}
						<Form.Item
							label="地区"
							onClick={() => {
								setRegionShow(true)
							}}
							isLink
							labelWidth='55'
						>
							<Input placeholder="请选择地区" readOnly value={business.region_text}/>
						</Form.Item>

						<Popup
							position="bottom"
							round
							visible={regionShow}
							onClose={() => {
								setRegionShow(false)
							}}>
							<Area
								title="选择地区"
								value={code}
								areaList={areaList}
								onConfirm={regionConfirm}
								onCancel={() => setRegionShow(false)}
								onChange={(value) => {
									setCode(value)
								}}
							/>
						</Popup>

						{/* 头像 */}
						<Form.Item
							label="头像"
							labelWidth='3.5em'
							labelAlign={'right'}
							name='avatar'
							initialValue={
								[
									{
										url: business.avatar
									}
								]
							}
						>
							<Uploader
								maxCount={1}
								value={avatar}
								onChange={(files) => {
									setAvatar(files)
								}}
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

export default Profile;