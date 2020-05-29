<template>

	<div id="app">
		<VmHeader></VmHeader>
		<div id="content">
			<VmLeft class='left' 
			:option1 = 'option1'
			:option3 = 'option3'
			:option5 = 'option5'></VmLeft>
			<VmCenter class='center' 
			:centerTop ='centerTop'
			:foreignData = 'foreignData'>
			</VmCenter>
			<VmRight class='right' 
			:option2 = 'option2'
			:option4 = 'option4'
			:option6 = 'option6'></VmRight>
		</div>

	</div>
</template>

<script>
	import VmHeader from 'components/VmHeader.vue'
	import VmLeft from 'components/VmLeft.vue'
	import VmCenter from 'components/VmCenter.vue'
	import VmRight from 'components/VmRight.vue'
	
	import {
		getForeinData,
	} from 'commonfun/charts.js'

	export default {
		name: 'app',
		data() {
			return {
				option1:{},
				option2:{},
				option3:{},
				option4:{},
				option5:{},
				option6:{},
				centerTop:{},
				foreignData:{},
			}
		},
		methods: {
		},
		components: {
			VmHeader,
			VmLeft,
			VmCenter,
			VmRight
		},
		mounted() {
			getForeinData().then(res => {
				this.option1 = res.option1;
				this.option2 = res.option2;
				this.option3 = res.option3;
				this.option4 = res.option4;
				this.option5 = res.option5;
				this.option6 = res.option6;
				this.centerTop = res.centerTop;
				this.foreignData = res.foreignData;
			})
		}
	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	@font-face {
		font-family: electronicFont;
		src: url(assets/font/DS-DIGIT.TTF);
	}

	li {
		list-style: none;
	}
	#app {
		/* height: 100vh; */
		width: calc(100vw - 17px);
		/* height: 100vh; */
		background: url(assets/image/bg.jpg) top center;
	}
	#content {
		/* width: 100vw; */
		/* height: 100px; */
		/* background-color: pink; */
		padding: 10px 10px 0;
		display: flex;
	}
	#content .left {
		flex: 3
	}
	#content .center {
		flex: 5
	}
	#content .right {
		flex: 3
	}

</style>
