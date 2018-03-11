<template>
	<div >
		<ul class="bar-content">
			<li class="bar-item">
				<div class="mr-b20">{{target.name}}</div>
				<div class="cons-num mr-b20">{{target.value}}&nbsp;{{uint}}</div>
				<div :style="{backgroundColor:barClor.tar}" class="bar" ref="tarBar"></div>
			</li>
			<li class="bar-item">
				<div class="bar" :style="{backgroundColor:barClor.all}" ref="allBar"></div>
				<div class="cons-num mr-b20">{{all.value}}&nbsp;{{uint}}</div>
				<div class="mr-b20">{{all.name}}</div>
			</li>
		</ul>
		<div class="sgleBar-title">{{showTitle}}</div>
	</div>
</template>
<script>
	export default{
		props:{
			uint:{
				type:String,
				default:'角'
			},
			sedId:{
				type:String,
				default:'1'
			},
			title:{
				type:String,
				default:''
			},
			barData:{
				type:Object,
				default(){
					return {
				        "xaxis": ["月人均消费"],
				        "target": {
				          "value": [{"name": "月人均消费","value": "172"}],
				          "divid": "57ba98ea-3201-4c2d-ab59-8a0dcb23f291",
				          "type": 1
				        },
				        "all": {
				          "value": [{"name": "月人均消费","value": "172"}],
				          "divid": "ab3820cb-94ff-41b1-82fb-b8d515261c47",
				          "type": 2
				        }
				      }
				}
			}
		},
		computed:{
			target(){
				return this.barData.target.value[0]
			},
			all(){
				return this.barData.all.value[0]
			},
			barClor(){
				let obj = {tar:'',all:''}
				switch(this.sedId.slice(0,1)){
					case '2':obj.tar='#17f0ed';obj.all='#1883e7';break;
					case '3':obj.tar='#fff701';obj.all='#ff7f00'; break;
					case '4': obj.tar='#17f0ed';obj.all='#1883e7'; break;
					default: obj.tar='#ff7f00';obj.all='#35a0ee';
				}
				return obj
			},
			showTitle(){
				let title =''
				if(this.sedId.slice(0,1) != '2'){
					title = this.title
				}
				return title
			}
		},
		methods:{
			calaWidth(value){
				let val = parseInt(value)
				return parseInt( (200*val)/(val+100) )
			}
		},
		mounted(){
			this.$refs.tarBar.style.height = this.calaWidth( this.target.value )+'px'
			this.$refs.allBar.style.height = this.calaWidth( this.all.value )+'px'
		}
	}
</script>
<style scoped>
	.mr-b20{
		margin-bottom: 20px;
	}
	.bar-content{
		width:800px;
		height:220px;
		border-bottom:1px solid #aaa;
		display: flex;
		flex-direction: row;
		justify-content:space-around;
		position: relative;
		z-index: 50;
	}
	.bar-item{
		display: flex;
		flex-direction: row;
		justify-content:space-around;
		align-items: flex-end;
	}
	.cons-num{
		font-size: 16px;
		margin-left:20px;
		margin-right:20px;
	}
	.bar{
		width: 30px;
		height:125px;
	}
	.sgleBar-title{
		text-align: center;
		padding-top: 15px;
		font-size: 16px;
	}
</style>