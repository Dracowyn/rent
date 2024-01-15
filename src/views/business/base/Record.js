import React, { useCallback, useEffect, useState } from "react";
import base from "../../../api/business/base";
import { NavBar, Notify, PullRefresh, Sticky, Toast } from "react-vant";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Record = () => {
	const [cookies] = useCookies(['business']);
	const business = JSON.stringify(cookies.business) === '{}' ? null : cookies.business;
	const navigate = useNavigate();

	const [list, setList] = useState([]);
	const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
	const [isMounted, setIsMounted] = useState(true);

	// 使用 useCallback 包裹 fetchInitialData
	const fetchInitialData = useCallback(async () => {
		try {
			let res = await base.record({
				page: 1,
				limit: pagination.pageSize,
				busid: business.id,
			});
			if (res && res.code === 1) {
				setList(res.data.list);
				setPagination(prev => ({ ...prev, total: res.data.total }));
			} else {
				Notify.show({
					type: 'warning',
					message: res ? res.msg : '未知错误',
					duration: 1500,
				});
			}
		} catch (error) {
			console.error('请求错误:', error);
			Notify.show({
				type: 'danger',
				message: '请求失败',
				duration: 1500,
			});
		}
	}, [pagination.pageSize, business.id]);

	useEffect(() => {
		setIsMounted(true);
		fetchInitialData().then(r => r);
		return () => setIsMounted(false);
	}, [fetchInitialData]);

	// 加载更多数据
	const fetchMoreData = useCallback(async () => {
		try {
			let nextPage = pagination.page + 1;
			let res = await base.record({
				page: nextPage,
				limit: pagination.pageSize,
				busid: business.id,
			});
			if (res && res.code === 1) {
				if (isMounted) {
					setList(prevList => [...prevList, ...res.data.list]);
					setPagination(prev => ({ ...prev, page: nextPage }));
					Toast.success({
						message: '加载成功',
						duration: 1500,
					});
				}
			} else {
				Notify.show({
					type: 'warning',
					message: res ? res.msg : '发生错误',
					duration: 1500,
				});
			}
		} catch (error) {
			console.error('请求错误:', error);
			Notify.show({
				type: 'danger',
				message: '请求失败',
				duration: 1500,
			});
		}
	}, [business.id, pagination, isMounted]);

	const onRefresh = () => {
		fetchMoreData().then(r => r);
	};

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

			<PullRefresh onRefresh={onRefresh} style={{ height: '100vh' }}>
				{list.map((item, index) => (
					<div key={index}>
						<div>{item.id}</div>
					</div>
				))}
			</PullRefresh>
		</>
	);
};

export default Record;