<template>
  <div id="vmheader">
	<h1>新型冠状肺炎实时监测</h1>
	<ZpTime class="time"></ZpTime>
	  
  </div>
</template>

<script>
	import ZpTime from './common/ZpTime.vue'
	export default {
		name:'vmheader',
		components:{
			ZpTime
		},
	}
</script>
<style scoped>
	#vmheader{
		height: 100px;
		position: relative;
		background: url(~assets/image/head_bg.png) no-repeat top center;
		background-size: 100% 100%;  /* 制定背景图像大小 */
	}
	
	#vmheader h1{
		color: white;
		font-size: 38px;
		line-height: 80px;
		text-align: center;
	}
	
	.time{
		position: absolute;
		top: 0;
		right:30px
	}
</style>
