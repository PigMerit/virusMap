import {jsonp} from './jsonp.js'
import {setOption1,setOption2,setOption3,setOption4,setOption5,setOption6,setForeignData} from './options.js'

//获取国外疫情数据
//通过return promise的形式,导出异步获得的数据
export function getForeinData (){
	return new Promise((resolve,reject)=>{
		jsonp({
			url: 'https://view.inews.qq.com/g2/getOnsInfo',
			params: {
				name: 'disease_foreign',
			},
			success(res) {
				let foreinData;
				let chinaData;
				foreinData = JSON.parse(res.data);
				const option1 = setOption1(foreinData.countryAddConfirmRankList);
				const option2 = setOption2(foreinData.foreignList);
				const option3 = setOption3(foreinData.continentStatis);
				const option4 = setOption4(foreinData.globalDailyHistory);
				const option5 = setOption5(foreinData.continentStatis[foreinData.continentStatis.length-1]);
				const option6 = setOption6(foreinData.importStatis);
				const centerTop = foreinData.globalStatis;
				resolve({option1,option2,option3,option4,option5,option6,centerTop})
			}
		});		
	})
}

//同时获取国外和国内疫情数据与，并进行一定处理
export function getMapData(){
	return Promise.all([new Promise((resolve,reject)=>{
		
		jsonp({
			url: 'https://view.inews.qq.com/g2/getOnsInfo',
			params: {
				name: 'disease_foreign',
			},
			success(res) {
				let foreinData;
				foreinData = JSON.parse(res.data);
				const foreignData = setForeignData(foreinData.foreignList);
				resolve(foreignData)
			}})
		
		
	}),new Promise((resolve,reject)=>{
		jsonp({
			url: 'https://view.inews.qq.com/g2/getOnsInfo',
			params: {
				name: 'disease_h5',
			},
			success(res1) {   //注意不能和上面的重复
				let chinaData;
				chinaData = JSON.parse(res1.data);
				const chinaMapData = {name:'中国',confirm:chinaData.chinaTotal.confirm,nowConfirm:chinaData.chinaTotal.nowConfirm}
				resolve(chinaMapData);
			}
		});
	})])
}

//添加echart图表
export function addChart(dom,option){
	let myChart = echarts.init(dom);
	myChart.setOption(option);
	window.addEventListener("resize", function() {
	  myChart.resize();
	});
	return myChart;
}
