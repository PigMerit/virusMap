//配置各个echart图的option方法

//新增确诊TOP10
export function setOption1(countryAddConfirmRankList){
	let yAxis =[];
	let xAxis=[];
	for (let val of countryAddConfirmRankList) {
		xAxis.push(val.nation);
		yAxis.push(val.addConfirm);
	}
	let option1 = {
		color: ["#2f89cf"],
		tooltip: {
			trigger: "axis",
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		// 修改图表的大小
		grid: {
			left: "0%",
			top: "10px",
			right: "3%",
			bottom: "4%",
			containLabel: true
		},
		xAxis: [{
			type: "category",
			data:xAxis,
			axisTick: {
				alignWithLabel: true
			},
			// 修改刻度标签 相关样式
			axisLabel: {
				color: "rgba(255,255,255,.6) ",
				fontSize: "10"
			},
			// 不显示x坐标轴的样式
			axisLine: {
				show: false
			}
		}],
		yAxis: [{
			type: "value",
			// 修改刻度标签 相关样式
			axisLabel: {
				color: "rgba(255,255,255,.6) ",
				fontSize: 10
			},
			// y轴的线条改为了2像素
			axisLine: {
				lineStyle: {
					color: "rgba(255,255,255,.1)",
					width: 2
				}
			},
			// y轴分割线的颜色
			splitLine: {
				lineStyle: {
					color: "rgba(255,255,255,.1)"
				}
			}
		}],
		series: [{
			name: "新增确诊",
			type: "bar",
			data:yAxis,
			barWidth: "35%",
			itemStyle: {
				barBorderRadius: 5
			}
		}]
	}
	return option1	
}
//主要国家治愈率
export function setOption2(foreignList){
	let yAxis1 =[];
	let rate=[];
	let yAxis2=[];
	let countryList = [0,1,2,5,6]
	for (let i of countryList) {
		yAxis1.push(foreignList[i].name);
		let cureRate = ((foreignList[i].heal/foreignList[i].confirm)*100).toFixed(1)
		rate.push(cureRate);
		yAxis2.push(foreignList[i].heal);
	}
	let myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
	let option = {
    grid: {
      top: "10%",
      left: "22%",
      bottom: "10%"
      // containLabel: true
    },
    // 不显示x轴的相关信息
    xAxis: {
      show: false
    },
    yAxis: [
      {
        type: "category",
        inverse: true,
        data: yAxis1,
        // 不显示y轴的线
        axisLine: {
          show: false
        },
        // 不显示刻度
        axisTick: {
          show: false
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: "#fff"
        }
      },
      {
        data: yAxis2,
        inverse: true,
        // 不显示y轴的线
        axisLine: {
          show: false
        },
        // 不显示刻度
        axisTick: {
          show: false
        },
        // 把刻度标签里面的文字颜色设置为白色
		show: false,
        axisLabel: {
          color: "#fff"
        }
      }
    ],
    series: [
      {
        name: "条",
        type: "bar",
        data: rate,
        yAxisIndex: 0,
        // 修改第一组柱子的圆角
        itemStyle: {
          barBorderRadius: 20,
          // 此时的color 可以修改柱子的颜色
          color: function(params) {
            // params 传进来的是柱子对象
            // console.log(params);
            // dataIndex 是当前柱子的索引号
            return myColor[params.dataIndex];
          }
        },
        // 柱子之间的距离
        barCategoryGap: 50,
        //柱子的宽度
        barWidth: 10,
        // 显示柱子内的文字
        label: {
          show: true,
          position: "inside",
          // {c} 会自动的解析为 数据  data里面的数据
          formatter: "{c}%"
        }
      },
      {
        name: "框",
        type: "bar",
        barCategoryGap: 50,
        barWidth: 15,
        yAxisIndex: 1,
        data: [100, 100, 100, 100, 100],
        itemStyle: {
          color: "none",
          borderColor: "#00c1de",
          borderWidth: 3,
          barBorderRadius: 15
        }
      }
    ]
  };

  return option
}
//大洲感染总人数趋势图
export function setOption3(continentStatis){
	
	let xAxis = [];
	let series = {
		'亚洲':[],
		'北美洲':[],
		'大洋洲': [],
		'欧洲': [],
		'其他': []
	};
	
	for(let value of continentStatis){
		if(value.date =='04/05'||value.date =='04/19'||value.date =='04/26'){
			continue
		}
		xAxis.push(value.date);
		if(value.statis['亚洲']){
		series['亚洲'].push(value.statis['亚洲'])	
		}else{
			series['亚洲'].push(series['亚洲'][series['亚洲'].length-1])
		}
		if(value.statis['北美洲']){
		series['北美洲'].push(value.statis['北美洲'])	
		}else{
			series['北美洲'].push(series['北美洲'][series['北美洲'].length-1])
		}
		if(value.statis['大洋洲']){
		series['大洋洲'].push(value.statis['大洋洲'])	
		}else{
			series['大洋洲'].push(series['大洋洲'][series['大洋洲'].length-1])
		}
		if(value.statis['欧洲']){
		series['欧洲'].push(value.statis['欧洲'])	
		}else{
			series['欧洲'].push(series['欧洲'][series['欧洲'].length-1])
		}
		if(value.statis['其他']){
		series['其他'].push(value.statis['其他'])	
		}else{
			series['其他'].push(series['其他'][series['其他'].length-1])
		}
	}
	let option={
    // 通过这个color修改两条线的颜色
    color: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"],
    tooltip: {
      trigger: "axis"
    },
    legend: {
      // 如果series 对象有name 值，则 legend可以不用写data
      // 修改图例组件 文字颜色
      textStyle: {
        color: "#4c9bfd"
      },
      // 这个10% 必须加引号
      right: "10%"
    },
    grid: {
      top: "30%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      show: true, // 显示边框
      borderColor: "#012f4a", // 边框颜色
      containLabel: true // 包含刻度文字在内
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxis,
      axisTick: {
        show: false // 去除刻度线
      },
      axisLabel: {
        color: "#4c9bfd" // 文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      }
    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false // 去除刻度线
      },
      axisLabel: {
        color: "#4c9bfd" // 文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      },
      splitLine: {
        lineStyle: {
          color: "#012f4a" // 分割线颜色
        }
      }
    },
    series: [
      {
        name: "亚洲",
        type: "line",
        // true 可以让我们的折线显示带有弧度
        smooth: true,
        data: series['亚洲']
      },
      {
        name: "北美洲",
        type: "line",
        // true 可以让我们的折线显示带有弧度
        smooth: true,
        data: series['北美洲']
      },
	  {
	    name: "大洋洲",
	    type: "line",
	    // true 可以让我们的折线显示带有弧度
	    smooth: true,
	    data: series['大洋洲']
	  },
	  {
	    name: "欧洲",
	    type: "line",
	    // true 可以让我们的折线显示带有弧度
	    smooth: true,
	    data: series['欧洲']
	  },
	  {
	    name: "其他",
	    type: "line",
	    // true 可以让我们的折线显示带有弧度
	    smooth: true,
	    data: series['其他']
	  },
    ]
  }
  return option
}
//世界每周新增治愈和死亡人数
export function setOption4(globalDailyHistory){
	
	let xAxis = [];
	let series1 = [];
	let series2 = []
	globalDailyHistory=globalDailyHistory.reverse()
	for(let i=0;i<globalDailyHistory.length;i+=7){
		 xAxis.push(globalDailyHistory[i].date);
		 series1.push(globalDailyHistory[i].all.dead)
		 series2.push(globalDailyHistory[i].all.heal)
	}
	series1 = series1.reverse();
	series2 = series2.reverse();
	xAxis = xAxis.reverse()
	
	var option = {
	  tooltip: {
	    trigger: "axis"
	  },
	  legend: {
	    top: "0%",
	    textStyle: {
	      color: "rgba(255,255,255,.5)",
	      fontSize: "12"
	    }
	  },
	
	  grid: {
	    left: "10",
	    top: "30",
	    right: "10",
	    bottom: "10",
	    containLabel: true
	  },
	  xAxis: [
	    {
	      type: "category",
	      boundaryGap: false,
	      // x轴更换数据
	      data:xAxis ,
	      // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
	      axisLabel: {
	        textStyle: {
	          color: "rgba(255,255,255,.6)",
	          fontSize: 12
	        }
	      },
	      // x轴线的颜色为   rgba(255,255,255,.2)
	      axisLine: {
	        lineStyle: {
	          color: "rgba(255,255,255,.2)"
	        }
	      }
	    }
	  ],
	  yAxis: [
	    {
	      type: "value",
	      axisTick: { show: false },
	      axisLine: {
	        lineStyle: {
	          color: "rgba(255,255,255,.1)"
	        }
	      },
	      axisLabel: {
	        textStyle: {
	          color: "rgba(255,255,255,.6)",
	          fontSize: 12
	        }
	      },
	      // 修改分割线的颜色
	      splitLine: {
	        lineStyle: {
	          color: "rgba(255,255,255,.1)"
	        }
	      }
	    }
	  ],
	  series: [
	    {
	      name: "死亡人数",
	      type: "line",
	      smooth: true,
	      // 单独修改当前线条的样式
	      lineStyle: {
	        color: "#0184d5",
	        width: "2"
	      },
	      // 填充颜色设置
	      areaStyle: {
	        color: new echarts.graphic.LinearGradient(
	          0,
	          0,
	          0,
	          1,
	          [
	            {
	              offset: 0,
	              color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
	            },
	            {
	              offset: 0.8,
	              color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
	            }
	          ],
	          false
	        ),
	        shadowColor: "rgba(0, 0, 0, 0.1)"
	      },
	      // 设置拐点
	      symbol: "circle",
	      // 拐点大小
	      symbolSize: 8,
	      // 开始不显示拐点， 鼠标经过显示
	      showSymbol: false,
	      // 设置拐点颜色以及边框
	      itemStyle: {
	        color: "#0184d5",
	        borderColor: "rgba(221, 220, 107, .1)",
	        borderWidth: 12
	      },
	      data:series1
	    },
	    {
	      name: "治愈人数",
	      type: "line",
	      smooth: true,
	      lineStyle: {
	        normal: {
	          color: "#00d887",
	          width: 2
	        }
	      },
	      areaStyle: {
	        normal: {
	          color: new echarts.graphic.LinearGradient(
	            0,
	            0,
	            0,
	            1,
	            [
	              {
	                offset: 0,
	                color: "rgba(0, 216, 135, 0.4)"
	              },
	              {
	                offset: 0.8,
	                color: "rgba(0, 216, 135, 0.1)"
	              }
	            ],
	            false
	          ),
	          shadowColor: "rgba(0, 0, 0, 0.1)"
	        }
	      },
	      // 设置拐点 小圆点
	      symbol: "circle",
	      // 拐点大小
	      symbolSize: 5,
	      // 设置拐点颜色以及边框
	      itemStyle: {
	        color: "#00d887",
	        borderColor: "rgba(221, 220, 107, .1)",
	        borderWidth: 12
	      },
	      // 开始不显示拐点， 鼠标经过显示
	      showSymbol: false,
	      data:series2
	    }
	  ]
	};
	return option;
}
//大洲感染人数饼状图
export function setOption5(continentStatisNow){
	
	let data = [];
	for(let key in continentStatisNow.statis){
		data.push({
			value:continentStatisNow.statis[key],
			name:key
		})
	}
	
	let option={
    color: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6","#f8142b","#3ff806"],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },

    legend: {
      bottom: "0%",
      // 修改小图标的大小
      itemWidth: 10,
      itemHeight: 10,
      // 修改图例组件的文字为 12px
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "各州感染人数",
        type: "pie",
        // 这个radius可以修改饼形图的大小
        // radius 第一个值是内圆的半径 第二个值是外圆的半径
        radius: ["40%", "60%"],
        center: ["50%", "40%"],
        avoidLabelOverlap: false,
        // 图形上的文字
        label: {
          show: false,
          // position: "center"
        },
        // 链接文字和图形的线是否显示
        labelLine: {
          show:false
        },
        data: data
      }
    ]
  }
	return option;
}
//境外输入病情top10省份
export function setOption6(importStatis){
	
	let data = [];
	for(let value of importStatis.TopList){
		data.push({name:value.province,value:value.importedCase})
	}
	let option ={
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff",
	  "#ff9f7f",
	  "#0096ff",
    ],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // legend: {
    //   bottom: "0%",
    //   itemWidth: 10,
    //   itemHeight: 10,
    //   textStyle: {
    //     color: "rgba(255,255,255,.5)",
    //     fontSize: "12"
    //   }
    // },
    series: [
      {
        name: "地区分布",
        type: "pie",
        radius: ["10%", "80%"],
        center: ["50%", "50%"],
        roseType: "radius",
        // 图形的文字标签
        label: {
          fontSize: 10
        },
        // 链接图形和文字的线条
        labelLine: {
          // length 链接图形的线条
          length: 6,
          // length2 链接文字的线条
          length2: 8
        },
        data:data
      }
    ]
  };
	return option
}
//世界疫情图
export function worldMapOption(){
	let option = {
		    // 设置提示信息
		    tooltip: {
		        // 设置提示信息触发源
		        trigger: 'item',
		        // 设置提示信息格式
		        formatter: function (params) {
		            return params.name + " : " + (params.value ? params.value : 0);
		        }
		    },
		    // 视觉映射组件
		    visualMap: {
		        // 设置映射类型：piecewise分段型、continuous连续性
		        type: 'piecewise',
		        pieces: [
		            { max: 0, label: '0', color: '#eee' },
		            { min: 1, max: 499, label: '1-499', color: '#fff7ba' },
		            { min: 500, max: 4999, label: '500-4999', color: '#ffc24b' },
		            { min: 5000, max: 9999, label: '5000-9999', color: '#ff7c20' },
		            { min: 10000, max: 100000, label: '1万-10万', color: '#fe5e3b' },
		            { min: 100000, max: 500000, label: '10万-50万', color: '#e2482b' },
		            { min: 500000, label: '50万以上', color: '#b93e26' },
		        ],
		        itemHeight: 10,
		        itemWidth: 10,
		        inverse: true,
				bottom:"20%",
				textStyle: {
				  color: "rgba(255,255,255,.5)",
				  fontSize: "12"
				}
		    },
		    // 系列列表
		    series: [{
		        // 数据名称
		        name: '',
		        // 设置数据
		        data: '',
		        // 绘制的图表类型
		        type: 'map',
		        // 指定地图名称
		        mapType: 'world',
		        // 地区名称映射
		        nameMap: '',
		        // 图表所绘制区域样式
		        itemStyle: {
		            emphasis: {
		                areaColor: '#c9ffff',
		                label: {
		                    show: false
		                }
		            }
		        },
		        // 设置位置：保持地图高宽比的情况下把地图放在容器的正中间
		        layoutCenter: ['48%','50%'],
		        // 地图缩放
		        layoutSize: "80%",
		    }]
		};
	return option
}
export function setForeignData(foreignList){
	let confirmData = [];
	let nowConfirmData = [];
	let foreignData = {};
	for(let value of foreignList){
		confirmData.push({name:value.name,value:value.confirm})
		nowConfirmData.push({name:value.name,value:value.nowConfirm})
	}
	foreignData = {confirmData,nowConfirmData}
	return foreignData
}