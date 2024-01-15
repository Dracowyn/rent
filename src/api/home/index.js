// 引入目录下所有的js文件
const Modules = require.context('./', true, /.js$/);

const ApiList = {};

// 遍历每个目录下的js文件
Modules.keys().reduce((modules, modulePath) => {
	// 获取模块名
	const ModuleName = modulePath.replace(/^.\/(.*)\.js/, '$1');

	if (ModuleName !== 'index') {
		// 获取模块下的js文件
		const value = Modules(modulePath);

		// 将模块下的js文件的default属性赋值给ApiList
		ApiList[ModuleName] = value.default;
	}

	return ApiList;
}, {});

export default ApiList;