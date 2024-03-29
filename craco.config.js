const path = require("path");

module.exports = {
	webpack: {
		// 别名
		alias: {
			"@": path.resolve("src"),
		},
	},
	//配置代理解决跨域
	devServer: {
		proxy: {
			"/rent": {
				target: "http://shop.example.com/rent",
				changeOrigin: true,
				pathRewrite: {
					"^/rent": "",
				},
			},
		},
	},
};