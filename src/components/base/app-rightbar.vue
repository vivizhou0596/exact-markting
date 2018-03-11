<template>
	<div class="app-chart-item">
		<div class="text-bar-content">
			<p class="text-msg" style="width:72px;">{{this.barData.value}} %</p>
			<div style="width:180px;text-align:right;margin-left:10px;"><p class="text-bar" ref="tarBar" style=" background-color:#3bb9fe;"></p></div>
			<!-- <img src="../../common/img/app-icon/weibo.png" class="text-msg" > -->
			<img :src = "imgUrl[barData.img]" class="text-msg">
			<p class="text-msg app-name" :title="barData.app">{{barData.app}}</p>
			<p class="text-msg" style="width:45px;">{{barData.name}}</p>
		</div>
	</div>
</template>
<script>
	import {imgUrl} from '../../common/js/checkData'
	export default{
		props:{
			rank:{
				type:String,
				default:''
			},
			barData:{
				type:Object,
				default(){
					return{
                            "app": "即时通讯",
                            "name": "TOP1",
                            "img": "tongxun",
                            "value": "300"
                        }
				}
			}
		},
		// computed:{
		// 	barValue(){
		// 		if(parseInt(this.barData.value)<10000){
		// 			return this.barData.value
		// 		}else{
		// 			return parseInt(this.barData.value/10000)+'万'
		// 		}
		// 	}
		// },
		methods:{
			calaWidth(value){
				//let val = parseInt(value/10000)
				//console.log()
				return parseInt(180*value/100)
			}
		},
		created(){
			this.imgUrl = imgUrl()
		},
		mounted(){
			let barWidth = 0
			if( this.calaWidth(this.barData.value) == 0 ){
				barWidth = 1
			}else{
				barWidth = this.calaWidth(this.barData.value)
			}
			this.$refs.tarBar.style.width = barWidth +'px'
		}
		
	}
</script>
<style scoped>	
	.app-chart-item{
		width:400px;
		padding: 5px 0;
	}
	.text-bar{
		width: 145px;
		height: 10px;
		display: inline-block;
	}
	.text-bar-content{
		width:500px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.text-msg{
		display: inline-block;
		margin:0 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.app-name{
		width:60px;
		overflow:hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		cursor: default;
		text-align: center;
	}
</style>