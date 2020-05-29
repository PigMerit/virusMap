//封装一个获取jsonp接口方法 
export function jsonp({
	url,
	params = {},
	success
}) {
	// 根据时间戳生成一个callback名
	let callbackName = 'jsonp_callback_' + Date.now() + Math.random().toString().substr(2, 5);
	let script = document.createElement('script');
	let baseUrl = `${url}?callback=${callbackName}`;

	// 取出params对象属性并得到完整url
	for (let item in params) {
		baseUrl += `&${item}=${params[item]}`;
	}
	// jsonp核心，通过script的跨域特性发出请求
	script.src = baseUrl;
	// 把创建的script挂载到DOM
	document.body.appendChild(script);

	// 给window添加属性，用于获取jsonp结果
	window[callbackName] = (res) => {
		// 执行success回调
		success(res);
		// 删除window下属性
		delete window[callbackName];
		// 得到结果后删除创建的script
		document.body.removeChild(script);
	}

}
