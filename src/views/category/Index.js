import React from "react";
import Footer from "../../components/common/Footer";
import {List, NavBar, PullRefresh, Search, Sticky} from "react-vant";
import {AppsO} from "@react-vant/icons";

const Index = () => {
	const [hotList, setHotList] = React.useState([]);
	const [categoryList, setCategoryList] = React.useState([]);
	const listRef = React.useRef(null);
	const [finished, setFinished] = React.useState(false);

	const onRefresh = () => {

	}

	const onLoadRefresh = () => {

	}

	const Items = () => {

	}


	React.useState(() => {
		const getHotData = async () => {

		}
	}, []);

	return (
		<>
			<Sticky zIndex={10}>
				<NavBar
					title="学术"
					leftText={<AppsO fontSize={'1.5em'}/>}
					rightText={<Search fontSize={'1.5em'}/>}
				/>
			</Sticky>

			<div className={'banner_shouy'}>

			</div>

			{/* 列表 */}
			<PullRefresh onRefresh={onRefresh} onLoadRefresh={() => listRef.current?.check()}>
				<List finished={finished} ref={listRef} onLoad={onLoadRefresh()}>
					<div className={'lest_xs'}>
						<ul>
							<Items/>
						</ul>
					</div>
				</List>
			</PullRefresh>

			<div style={{height: '.75em'}}/>

			<Footer/>
		</>
	)
}

export default Index;