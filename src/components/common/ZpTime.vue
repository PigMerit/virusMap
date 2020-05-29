<template>
  <div id="zptime">
	 {{setDate}}
  </div>
</template>

<script>
	export default {
		name:'zptime',
		data(){
			return{
				date:new Date(),
			}
		},
		computed:{
			setDate(){
				return `当前时间: ${this.date.getFullYear()}年${this.date.getMonth()+1}月${this.date.getDate()}-${this.date.getHours()}时${this.date.getMinutes()}分${this.date.getSeconds()}秒`
			}
		},
		mounted(){
			setInterval(()=>{this.date = new Date()}, 1000);
		},
		
	}
</script>
<style scoped>
	#zptime{
		line-height: 75px;
		color: rgba(255, 255, 255, 0.7);
		font-size: 20px;
	}
</style>
