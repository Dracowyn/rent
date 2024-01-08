import React from "react";
import {Route, Routes, Outlet} from "react-router-dom";
import AuthRouter from "./auth";

// 引入首页
import Home from "../views/Home";

// 引入每个目录下的index.js
const Modules = require.context('./', true, /index\.js$/);

const RouterMap = [];

// 遍历每个目录下的index.js
Modules.keys().reduce((modules, modulePath) => {
	// 获取模块名
	const ModuleName = modulePath.replace(/^.\/(.*)\.js/, '$1');

	if (ModuleName !== 'index') {
		// 获取模块下的index.js
		const value = Modules(modulePath);

		// 将模块下的index.js的default属性赋值给RouterMap
		RouterMap.push(...value.default);
	}

	return RouterMap;
}, {});

const RouterList = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Home/>}/>
			<Route path={'/'} element={<Outlet/>}>>
				{
					RouterMap.map((item, index) => {
						return (
							// 将父级路由传递给子级路由
							<Route key={index} path={item.path}>
								{item.children && item.children.map((child, childIndex) => {
									return (
										// 将父级路由传递给子级路由
										<Route key={childIndex} path={child.path}
											   element={<AuthRouter auth={child.auth} component={child.component}/>}/>
									)
								})}
							</Route>
						)
					})
				}
			</Route>
		</Routes>
	)
}

export default RouterList;