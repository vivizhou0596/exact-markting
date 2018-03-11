<template>
	<div>
		<ul class="bisc-gen chart-item">
			<li class="chart-item-gen-content">
				<div class="chart-item-gen">
					<img src="../../common/img/male.png" alt="">
					<div class="out-bar"><p class="in-bar-male" ref="tarMale" ></p></div>
					<span class="gen-num">{{target.male}}%</span>
				</div>
				<div class="chart-item-gen">
					<img src="../../common/img/fmale.png" alt="">
					<div class="out-bar"><p class="in-bar-fmale" ref="tarFmale"></p></div>
					<span class="gen-num">{{target.fmale}}%</span>
				</div>
			</li>
			<li class="chart-item-gen-content">
				<div class="chart-item-gen">
					<img src="../../common/img/male.png" alt="">
					<div class="out-bar"><p class="in-bar-male" ref="allmale" ></p></div>
					<span class="gen-num">{{all.male}}%</span>
				</div>
				<div class="chart-item-gen">
					<img src="../../common/img/fmale.png" alt="">
					<div class="out-bar"><p class="in-bar-fmale" ref="allFmale"></p></div>
					<span class="gen-num">{{all.fmale}}%</span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		props:{
			targetData:{
				type:Object,
				default(){
					return {"type":"1","divid":"001011","value":[{"name":"男","value":"15"},{"name":"女","value":"59"}]}
				}
			},
			allData:{
				type:Object,
				default(){
					return {"type":"2","divid":"001011","value":[{"name":"男","value":"25"},{"name":"女","value":"69"}]}
				}
			}
		},
		computed:{
			target(){
				let obj = {male:'',fmale:''}
				this.targetData.value.forEach((item,index)=>{
					if(item.name=='男'){
						obj.male = item.value
					}else if(item.name=='女'){
						obj.fmale = item.value
					}
				})
				return obj
			},
			all(){
				let obj = {male:'',fmale:''}
				this.allData.value.forEach((item,index)=>{
					if(item.name=='男'){
						obj.male = item.value
					}else if(item.name=='女'){
						obj.fmale = item.value
					}
				})
				return obj
			}
		},
		mounted(){
			this.$refs.tarMale.style.width = this.target.male*2+'px'
			this.$refs.tarFmale.style.width = this.target.fmale*2+'px'
			this.$refs.allmale.style.width = this.all.male*2+'px'
			this.$refs.allFmale.style.width = this.all.fmale*2+'px'
			console.log(this.targetData,this.all)
		}
	}
</script>
<style scoped>
	.align-right{
		text-align:right;
	}
	.chart-item{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 300px;
		width: 100%;
	}
	.chart-item-gen{
		display: flex;
		flex-direction: row;
		justify-content:center;
		align-items: center;
		margin:10px 0;
	}
	.chart-item-genAll{
		justify-content: flex-end;
	}
	.chart-item-gen-content{
		width:700px;
	}
	.out-bar{
		width:200px;
		height: 15px;
		background-color: #16203c;
		margin:0 20px;
	}
	.in-bar-male{
		width:100px;
		height: 100%;
		background-color: #3bb9fe;
		display: inline-block;
	}
	.in-bar-fmale{
		width:100px;
		height: 100%;
		background-color: #ff98c6;
		display: inline-block;
	}
	.bisc-titles{
		width:60px;
		height: 60px;
		border-radius: 50%;
		border:1px solid #fff;
		background-color:#0a1022;
		z-index: 30;
		text-align: center;
		font-size: 12px;
		display: table;
	}
	.title-cell{
		display: table-cell;
		vertical-align: middle;
	}
	.gen-num{
		width:40px;
		text-align:center;
	}
</style>