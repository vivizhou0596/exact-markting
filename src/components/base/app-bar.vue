<template>
	<div>
		<ul class="chart-item">
			<li class="text-bar-content">
				<p class="text-msg" style="width:40px">{{rank}}</p>
				<p class="text-msg" style="width:60px">{{barData.target.type}}</p>
				<!-- <img src="../../common/img/app-icon/else.png" class="text-msg"> -->
				<img :src = "imgUrl[barData.target.typeIcon]" class="text-msg">
				<p class="text-bar bg-orange" ref="tarBar"></p>
				<p class="text-msg">{{barData.target.val}}万</p>
			</li>
			<li class="text-bar-content all">
				<p class="text-msg">{{barData.all.val}}万</p>
				<p class="text-bar bg-blue" ref="allBar"></p>
				<!-- <img src="../../common/img/app-icon/qita.png" class="text-msg"> -->
				<img :src="imgUrl[barData.all.typeIcon]" class="text-msg">
				<p class="text-msg" style="width:60px">{{barData.all.type}}</p>
				<p class="text-msg" style="width:40px">{{rank}}</p>
			</li>
		</ul>
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
				default:{}
			}
		},
		computed:{
			
		},
		methods:{
			calaWidth(val){
				return parseInt(300*val/(val+20))
			}
		},
		created(){
			this.imgUrl = imgUrl()
			//console.log(this.imgUrl[this.barData.target.typeIcon])	
		},
		mounted(){
			this.$refs.tarBar.style.width = this.calaWidth(this.barData.target.val)+'px'
			this.$refs.allBar.style.width = this.calaWidth(this.barData.all.val)+'px'
		}
		
	}
</script>
<style scoped>	
	.chart-item{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		/*margin:1px 0;*/
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
	    justify-content: flex-start;
	    align-items: center;
	    margin:5px 0;
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
		margin-right: 10px;
	}
	.text-msg{
		display: inline-block;
		margin:0 5px;
	}
</style>