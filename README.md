# virusMap

## 初始化项目

```javascript
npm run serve 开发
npm run build 打包
```
## cdn方式引echart

```html
<script src="https://cdn.bootcss.com/echarts/3.7.0/echarts.min.js"></script>
```

```javascript
//vue.config.js 配置   
chainWebpack: config => {
        // 用cdn方式引入
        config.externals({
		  "echarts": "echarts",
        })
      },
```

## 自适应页面方式

```javascript
//采用vm的方式实现自适应页面
npm install postcss-px-to-viewport --save-dev
css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px",
            viewportWidth: 750,
            viewportHeight: 667, // 视窗的高度, 根据375设备的宽度来指定，一般是667，也可不配置
            unitPrecision: 3,//(Number)指定`px`转换为视窗单位值的小数位数，默认是5
            propList: [   // 转化为vw的属性列表
              "*"
            ],
            selectorBlackList: ['.ignore', '.hairlines'], // (Array) 指定不转换为视窗单位的类，保留px，值为string或正则regexp，建议定义一至两个通用的类名
            viewportUnit: "vw",
            fontViewportUnit: "vw",
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: /(\/|\\)(node_modules)(\/|\\)/,
          })
        ]
      }
    }
  }

//注意，最外面的包围壳如果宽度是100vw，但高度上面出现滚动条的时候，宽度100vm的值不会变，会有一部分内容出现在垂直滚动条后面，此时，水平方向上也会出现滚动条
//通过下面方式，可以设置不让页面水平方向上出现滚动条，但是，会有一部分内容被遮挡在垂直滚动条后面。
/* 	html {
	overflow-y: scroll;
	}
	body {
	overflow: hidden;
	}
	 */
//本页面采用的方式是设置最外面的包围壳如果宽度是100vw-15px(这个15px不能转化成vw，不同尺寸下的浏览器的垂直滚动条都是这个尺寸) 缺点是，但没有垂直滚动条的时候，页面最右边会有15px大小的空白，不过还可以接受

```

## 接口

jsonp的接口，在封装一个jsonp的函数

```javascript
 
export  function jsonp({url,params={},success}){
                // 根据时间戳生成一个callback名
                let callbackName = `jsonp_${new Date().getTime()}`;

                // 创建script
                let script = document.createElement('script');

                // 字符串拼接生成基本url
                let baseUrl = `${url}?callback=${callbackName}`;

                // 取出params对象属性并得到完整url
                for(let item in params){
                    baseUrl += `&${item}=${params[item]}`;
                }
                // jsonp核心，通过script的跨域特性发出请求
                script.src = baseUrl;
                // 把创建的script挂载到DOM
                document.body.appendChild(script);

                // 给window添加属性，用于获取jsonp结果
                window[callbackName] = (res)=>{
                    // 执行success回调
                    success(res);
                    // 删除window下属性
                    delete window[callbackName];
                    // 得到结果后删除创建的script
                    document.body.removeChild(script);
                }

            }
```

```javascript
'https://view.inews.qq.com/g2/getOnsInfo?name=disease_foreign'
'data':
'foreignList':
{
            "name":"美国",
            "continent":"北美洲",
            "date":"05.27",
            "isUpdated":true,
            "confirmAdd":19049,
            "confirmAddCut":0,
            "confirm":1725275,
            "suspect":0,
            "dead":100579,
            "heal":479969,
             "nowConfirm":1144727,
            "confirmCompare":19049,
            "nowConfirmCompare":2976,
            "healCompare":15299,
            "deadCompare":774,
            "children":{}
}
"globalStatis":{
        "nowConfirm":2898884,
        "confirm":5594262,
        "heal":2347956,
        "dead":347422,
        "nowConfirmAdd":22880,
        "confirmAdd":62982,
        "healAdd":38283,
        "deadAdd":3238,
        "lastUpdateTime":"2020-05-27 12:17:36"
    },
"globalDailyHistory":[
        {
            "date":"01.28",
            "all":{
                "confirm":57,
                "dead":0,
                "heal":3,
                "newAddConfirm":19,
                "deadRate":"0.00",
                "healRate":"5.26"
            }
    ]
"importStatis":{
        "TopList":[{
                "province":"黑龙江",
                "importedCase":386
        }]
    },        
"countryAddConfirmRankList":[
    {
            "nation":"美国",
            "addConfirm":26158
        },
]   


```

```java
"https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5"
    
"chinaTotal":{
        "confirm":84544,
        "heal":79774,
        "dead":4645,
        "nowConfirm":125,
        "suspect":6,
        "nowSevere":5,
        "importedCase":1732,
        "noInfect":404
    },

"areaTree":{
    {
            "name":"中国",
            "today":{
                "confirm":1,
                "isUpdated":true
            },
            "children":[
                {
                    "name":"内蒙古",
                    "today":{
                        "confirm":0,
                        "confirmCuts":0,
                        "isUpdated":true,
                        "tip":"内蒙古自治区累计报告境外输入确诊病例155例。"
                    },
                    "total":{
                        "nowConfirm":26,
                        "confirm":232,
                        "suspect":0,
                        "dead":1,
                        "deadRate":"0.43",
                        "showRate":false,
                        "heal":205,
                        "healRate":"88.36",
                        "showHeal":true
                    },
                    "children":[{
                            "name":"呼伦贝尔",
                            "today":{
                                "confirm":0,
                                "confirmCuts":0,
                                "isUpdated":false
                            },
                            "total":{
                                "nowConfirm":0,
                                "confirm":9,
                                "suspect":0,
                                "dead":0,
                                "deadRate":"0.00",
                                "showRate":false,
                                "heal":9,
                                "healRate":"100.00",
                                "showHeal":true
                            }
                        },
                    ]
            ]
}
```

## export异步数据

对于异步获取到的数据，不能直接export，因为会在数据还没获取的时候，就export出去一个undefined值。

解决方案：export出来一个函数，函数里面返回一个promise值，将要返回的数据通过resolve返回出去。

## 传递数据的方式

chart.js中，先异步请求到数据，通过调用options.js里面的函数，将请求到的数据进行加工，形成echarts图表要用到的option。chart.js export返回值为promise的函数，该promise在成功后，会把上面形成的option都存到res中，在App.vue中调用chart.js 的函数，获取到所有的图标配置信息，通过props发送给所需要的组件。由于上面获取数据的方式是异步的。在App.vue组件给子组件传递option信息时，值还是空的，所以子组件里面通过watch监听option，当option有值的时候，就可以渲染echart图表了。

通过上述方式，减少了对数据的请求次数。
