<template>
	<div class="app-chart-item">
		<div class="text-bar-content">
				<p class="text-msg" style="width:45px;">{{barData.name}}</p>
				<p class="text-msg app-name" :title="barData.app">{{barData.app}}</p>
				<!-- <img src="../../common/img/app-icon/qita.png" class="text-msg" > -->
				<img :src = "imgUrl[barData.img]" class="text-msg">
				<div style="width:180px;text-align:left;margin-right: 10px;"><p class="text-bar bg-orange" ref="tarBar"></p></div>
				<p class="text-msg" style="width:72px">{{this.barData.value}} %</p>
		</div>
	</div>
</template>
<script>
import {imgUrl} from '../../common/js/checkData'
	export default{
		props:{
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
		methods:{
			calaWidth(value){
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
	.all{
		/*text-align: right;*/
		justify-content: flex-end;
	}
	.bg-blue{
		background-color:#3bb9fe;
		margin-left: 10px;
	}
	.bg-orange{
		background-color:#ff7f00;
		/*margin-right: 10px;*/
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