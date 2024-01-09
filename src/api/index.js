// 引入每个目录下的index.js文件
const Modules = require.context('./', true, /index\.js$/);

const Api = {};

// 遍历每个目录下的index.js
Modules.keys().forEach(modulePath => {
	// 获取模块名
	let ModuleName = modulePath.replace(/^.\/(.*)\.js/, '$1').replace(/\/index$/, '');

	if (ModuleName !== 'index') {
		// 获取模块下的index.js
		const value = Modules(modulePath).default;

		// 按 "/" 分割模块名
		const moduleNames = ModuleName.split('/');

		// 在 Api 对象中创建嵌套对象
		let currentLevel = Api;
		moduleNames.forEach(name => {
			currentLevel[name] = currentLevel[name] || {};
			currentLevel = currentLevel[name];
		});

		// 将模块下的函数添加到嵌套对象中
		for (const funcKey in value) {
			if (value.hasOwnProperty(funcKey)) {
				currentLevel[funcKey] = value[funcKey];
			}
		}
	}
});

export default Api;