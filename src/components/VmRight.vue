<template>
  <div id="vmright">
	  <VmPanel>
		  <div slot='panelcontent'>
		  	<h2>主要疫情国家治愈率</h2>
		  	<div class="chart curerates"></div>
		  </div>
	  </VmPanel>
	  <VmPanel>
		  <div slot='panelcontent'>
		  	<h2>世界每周新增治愈和死亡人数</h2>
		  	<div class="chart deadheal"></div>
		  </div>
	  </VmPanel>
	  <VmPanel>
		  <div slot='panelcontent'>
		  	<h2>境外输入病情top10省份</h2>
		  	<div class="chart toptenimported"></div>
		  </div>
	  </VmPanel>
  </div>
</template>

<script>
	import VmPanel from './common/VmPanel.vue'
	
	import {
		addChart,
	} from 'commonfun/charts.js'
	
	export default {
		name:'vmright',
		props:{
			option2:{},
			option4:{},
			option6:{}
		},
		components:{
			VmPanel
		},
		watch:{
			option2(){
				let curerates = document.querySelector('.curerates');
				addChart(curerates, this.option2)
			},
			option4(){
				let deadheal = document.querySelector('.deadheal');
				addChart(deadheal, this.option4)
			},
			option6(){
				let toptenimported = document.querySelector('.toptenimported');
				addChart(toptenimported, this.option6)
			},
		}
		
	}
</script>
<style scoped>
</style>
