import {Outlet} from "react-router-dom";

const Modules = require.context("./", true, /.js$/);

const RouterMap = [];

Modules.keys().reduce((modules, modulePath) => {
	const ModuleName = modulePath.replace(/^.\/(.*)\.js/, "$1");

	if (ModuleName !== "index") {
		const value = Modules(modulePath);

		RouterMap.push(...value.default);
	}

	return RouterMap;
}, {});

const layout = () => {
	return (
		<>
			<Outlet/>
		</>
	)
}

const RouterList = [
	{
		path: "/category",
		component: layout,
		children: RouterMap,
	}
]

export default RouterList;