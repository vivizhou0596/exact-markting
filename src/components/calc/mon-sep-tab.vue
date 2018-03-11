<template>
	<div>
		<ul class="monNum-label">
			<li><p class="radioBtn "
					 :class="[radioCheck ? 'radioBtnCheck' : '']"
					 @click="toggleMonNum('everage')">
				</p>月均值
			</li>
			<li><p class="radioBtn" 
					:class="[!radioCheck ? 'radioBtnCheck' : '']" 
					@click="toggleMonNum('trend')">
				</p>月趋势值
			</li>
			<li class="pull-right" style="margin-right:100px" v-show="userScale.isConfig">
				<button type="button" 
						class="calc-save-eidt"
						:class="[userScale.isEdit?'':'calc-save']"  
						@click="updateUserScaleConfig('save',mountedItems)" >保存
				</button>
				<button type="button"
						class="calc-save-eidt"
						:class="[userScale.isEdit?'calc-edit':'']" 
						@click="updateUserScaleConfig('eidt',null)">修改
				</button>
			</li>
		</ul>
		<ul class="monNum-box">
			<li v-for="(item,index) in mountedItems">
				<p >{{item.time}}</p>
				<p style="color:#676B73">第{{index+1}}个月</p>
				<div>
					<input type="text" class="calc-smallInput" 
						:disabled="(radioCheck||disableForm)?true:false" 
						v-model="item.value"
					>
					<label>{{userScale.unit}}</label>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		props:{
			userScale:{
				type:Object,
				default:function(){
					return {
						isConfig:false,
						isEdit:false,
						calcBatchNum:"1596.0",
						items:[],
						unit:"万人"
					}
				}
			},
			disableForm:{
				type:Boolean,
				default:false
			},
			calcBatchNum:{
				type:String,
				default:'0'
			},
			cycTimes:{
				type:Array,
				default:function(){
					return []
				}
			},
		},
		data(){
			return{
				inputData:'',
				radioCheck:true,
				mountedItems:[]
			}
		},
		watch:{
			cycTimes:{
				handler(newVal,oldVal){
					this.userScale.isConfig = true
					this.mountedItems = this.monItemConfig(this.calcBatchNum,newVal,this.radioCheck)
				},
				deep:true
			},
			calcBatchNum(value){
				this.mountedItems = this.monItemConfig(value,this.cycTimes,this.radioCheck)
			}
		},
		methods:{
			updateUserScaleConfig(str,data){
				let sum = 0
				if(str == 'save'){
					for(let i=0;i<data.length;i++){
						if(data[i].value == ''){
							alert('存在空数据')
							return
						}
						sum += data[i].value*1
						data[i].value = data[i].value+'';
					}
					if(sum == 0){
						alert('请先完善活动用户群规模相关参数')
						return
					}
					//console.log(parseInt(this.calcBatchNum))
					if(sum>this.calcBatchNum){
						alert('月趋势总和大于用户预估参与规模');
		            	return
		          	}
					this.userScale.isEdit = true
				}else if(str == 'eidt'){
					this.userScale.isEdit = false
				}
				this.$emit('on-change',data)
			},
			monItemConfig(batchNum,items,isAver){
				let arr = []
				for(let i=0;i<items.length;i++){
					arr.push({
						time:items[i],
						value:''
					})
				}
				let value = ''
				if(isAver){
					value = Math.floor((batchNum*1/arr.length)*10)/10
				}
				for(let i=0;i<arr.length;i++){
					arr[i].value = value
				}
				return arr
			},
			toggleMonNum(str){
				if(this.disableForm == false){
					this.radioCheck = this.radioCheck?false:true
					this.mountedItems = this.monItemConfig(this.calcBatchNum,this.cycTimes,this.radioCheck)
				}
			}
		},
	}
</script>
<style>

</style>