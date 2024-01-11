import React from "react";
import base from "../../../api/business/base";
import {NavBar, Notify, Sticky} from "react-vant";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const Record = () => {
	// 获取cookie
	const [cookies, setCookie] = useCookies(['business']);

	// 设置状态数据
	const [business] = React.useState(JSON.stringify(cookies.business) === '{}' ? null : cookies.business);

	const navigate = useNavigate();

	const [list, setList] = React.useState([])
	const [page, setPage] = React.useState(1)
	const [pageSize, setPageSize] = React.useState(10)
	const [total, setTotal] = React.useState(0)

	React.useEffect(() => {
		const getList = async () => {
			let res = await base.record({
				page,
				pageSize,
				busid: business.id,
			})
			if (res.code === 1) {
				setList(res.data.list)
				setTotal(res.data.total)
			} else {
				Notify.show({
					type: 'warning',
					message: res.msg,
					duration: 1500,
				})
			}
		}
		getList().then(r => r)
	}, [business.id, page, pageSize])


	return (
		<>
			<Sticky zIndex={100}>
				<NavBar
					title="消费记录"
					left-text="返回"
					left-arrow
					onClickLeft={() => navigate(-1)}
				/>
			</Sticky>


		</>


	)
}

export default Record;