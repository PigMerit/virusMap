module.exports = {
	publicPath:'./',
	chainWebpack: config => {
			// 用cdn方式引入
			config.externals({
				"echarts": "echarts",
			})
	},

	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views',
				'commonfun': '@/commonfun'
			}
		}
	},
	
	css: {
	    loaderOptions: {
	      postcss: {
	        plugins: [
	          require("postcss-px-to-viewport")({
	            unitToConvert: "px",
	            viewportWidth: 1920,
	            unitPrecision: 3,
	            propList: [
	              "*"
	            ],
	            viewportUnit: "vw",
	            fontViewportUnit: "vw",
	            selectorBlackList: ['#app'],
	            minPixelValue: 1,
	            mediaQuery: false,
	            replace: true,
	            exclude: /(\/|\\)(node_modules)(\/|\\)/,
	          })
	        ]
	      }
	    }
	  }

}
