import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// 引入cookie
import Cookies from 'react-cookies';
// 引入路由
import * as Router from 'react-router-dom';
// 引入React-vant
import * as Vant from 'react-vant';
// 引入React-vant-icons
import * as Icons from '@react-vant/icons';

// 全局挂载插件
React.Cookies = Cookies;
React.Router = Router;
React.Vant = Vant;
React.Icons = Icons;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
