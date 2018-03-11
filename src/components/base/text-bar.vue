<template>
	<div>
		<ul class="chart-item">
			<li class="text-bar-content">
				<p class="text-bar bg-orange" ref="tarBar" :style="{backgroundColor:barClor.tar}"></p>
				<p class="text-msg"  :title="target+uint">{{target+uint}}</p>
			</li>
			<li class="text-bar-title" >{{xaxis}}</li>
			<li class="text-bar-content all">
				<p class="text-msg" style="text-align:right" :title="all+uint">{{all+uint}}</p>
				<p class="text-bar" ref="allBar" style="margin-left:10px;" :style="{backgroundColor:barClor.all}"></p>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		props:{
			uint:{
				type:String,
				default:''
			},
			sedId:{
				type:String,
				default:''
			},
			barData:{
				type:Object,
				default(){
					return {
				        "xaxis": ["通话用户数"],
				        "target": {
				          "value": [{"name": "通话用户数","value": "35"}],
				          "divid": "ba433e8d-635f-40fb-9c2d-2b19b22a7459",
				          "type": 1
				        },
				        "all": {
				          "value": [{"name": "通话用户数","value": "35"}],
				          "divid": "c0b79576-6f4d-4564-b762-872e103696b7",
				          "type": 2
				        }
				      }
				}
			}
		},
		computed:{
			target(){
				if(this.barData.target.value[0].value>10000){
					return parseFloat(this.barData.target.value[0].value/10000).toFixed(1)+'万'
				} else {
					return this.barData.target.value[0].value
				}
			},
			all(){
				if(this.barData.all.value[0].value>10000){
					return parseFloat(this.barData.all.value[0].value/10000).toFixed(1)+'万'
				}else{
					return this.barData.all.value[0].value
				}
			},
			xaxis(){
				return this.barData.xaxis[0]
			},
			barClor(){
				let obj = {tar:'',all:''}
				switch(this.sedId.slice(0,1)){
					case '2':obj.tar='#5dd5d1';obj.all='#87c9ff';break;
					case '3':obj.tar='#fff701';obj.all='#ff7f00'; break;
					case '4': obj.tar='#00fdfd';obj.all='#00c1fc'; break;
					default: obj.tar='#ff7f00';obj.all='#35a0ee';
				}
				return obj
			},
			barDonmi(){
				let num = 0
				let target = parseInt(this.target)
				let all = parseInt(this.all)
				if(target<=100 && all<=100 ){
					num = 100
				}else{
					num = all >= target ? all : target
				}
				return num
			}
		},
		methods:{
			calaWidth(value){
				let val = parseInt(value)
				return parseInt(280*val/this.barDonmi)
			}
		},
		mounted(){
			//console.log(this.$refs)
			this.$refs.tarBar.style.width = this.calaWidth(this.target)+'px'
			this.$refs.allBar.style.width = this.calaWidth(this.all)+'px'
			//console.log( this.$refs.allBar.style.width )
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
		margin:10px 0;
		height:20px;
	}
	.text-bar{
		width: 300px;
		height: 10px;
		display: inline-block;
	}
	.all{
		text-align: right;
		justify-content:flex-end;
	}
	.text-bar-title{
		height: 20px;
		width:120px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		z-index: 50;
		text-align: center;
	}
	.text-bar-content{
		width:400px;
		display: flex;
		align-items: center;
	}
	.bg-orange{
		background-color:#ff7f00;
		margin-right: 10px;
	}
	.text-msg{
		display: inline-block;
		overflow:hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: default;
	}
</style>