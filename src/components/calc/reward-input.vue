<template>
	<div>
		<ul class="monNum-label">
			<li><p class="radioBtn " :class="[rewardPut.isConfig ? 'radioBtnCheck' : '']" @click="toggleReward()"></p>&nbsp;&nbsp;有</li>
			<li><p class="radioBtn" :class="[!rewardPut.isConfig ? 'radioBtnCheck' : '']"  @click="updateRewardConfig('no',null)" ></p>&nbsp;&nbsp;无</li>
			<li class="pull-right" style="margin-right:100px" v-show="rewardPut.isConfig">
				<button 
					type="button" class="calc-save-eidt"
					:class="[rewardPut.isEdit?'':'calc-save']"   
			 	  	@click="updateRewardConfig('save',rewardPut)" >
				 	保存
				</button>
				<button 
					type="button" class="calc-save-eidt" 
					:class="[rewardPut.isEdit?'calc-edit':'']" 
			 		@click="updateRewardConfig('edit',null)">
					 修改
				</button>
			</li>
		</ul>
		<div v-if="rewardPut.isConfig">
			<ul class="reward-option" >
				<li><label>单笔酬金金额：</label>
					<input type="text" class="calc-bigInput" 
					v-model="rewardPut.giveSum" 
					:disabled="disableForm?true:false"
					@change="updateRatio('giveSum',rewardPut.giveSum)">&nbsp;元
				</li>
				<li><label>支付开始时间：</label>
					<select class="calc-bigInput" 
						v-model="rewardPut.startTimes"
						:disabled="disableForm?true:false"
						@change="updateRatio('start',rewardPut.startTimes)"> 
					<option value="0" >参与当月</option>
					<option value="1">参与次月</option>
					<option value="2">参与三月</option>
					<option value="3">参与四月</option>
					<option value="4">参与五月</option>
					<option value="5">参与六月</option>
					</select>
				</li>
				<li><label>支付方式：分&nbsp;</label>
					<input type="text" class="calc-bigInput"
					 v-model="rewardPut.cycleTimes" 
					 :disabled="disableForm?true:false"
					 @change="updateRatio('times',rewardPut.cycleTimes)">&nbsp;次支付
				</li>
			</ul>
			<div class="form-group">
				<label>每次支付比例：</label>
				<ul class="reward-ratio" id="rewardRatio">
					<li v-for="(item,index) in rewardPut.ratio">
						<input type="text" class="calc-middleInput" :disabled="disableForm?true:false" v-model="rewardPut.ratio[index]"><span class="ratio-rep" v-show="index<rewardPut.cycleTimes-1">:</span>
					</li>
					<li><div @click="getRatioVal()" class="confirmRatio">确定设置比例</div></li>
				</ul>
			</div>
			<ul class="monNum-box">
				<li v-for="(item,index) in rewardPut.ratioNum">
					<p style="color:#676B73">参与第{{index+1}}个月</p>
					<div><input type="text" class="calc-smallInput"  :disabled="true" v-model="rewardPut.ratioNum[index]"><label>元</label></div>
				</li>
		</ul>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			rewardPut:{
				type:Object,
				default:function(){
					return {
						giveSum:'',
						name:'酬金',
						cycleTimes:'',
						startTimes:'0',
						isConfig:false,
						isEdit:false,
						ratio:[],
						ratioNum:[]
					}
				}
			}
		},
		data(){
			return{
				disableForm:false,
			}
		},
		methods:{
			updateRewardConfig(str,data){
				console.log(data)
				let bool = false
				if(str == 'save'){
					if(data.giveSum == ''){
						alert('请填写酬金')
						return
					}
					if(data.cycleTimes == ''){
						alert('请填写酬金支付次数')
						return
					}
					for(let i=0;i<data.ratio.length;i++){
						if(data.ratio[i]==''){
							alert('请填写酬金支付比例')
							return
						}
					}
					for(let i=0;i<data.ratioNum.length;i++){
						if(data.ratioNum[i]==''){
							alert('请确定设置酬金支付比例')
							return
						}
					}
					bool = true
					this.disableForm = true
					this.rewardPut.isEdit = true
				}else if(str == 'edit'){
					this.rewardPut.isEdit = false
					this.disableForm = false
					bool = false
				}else if(str == 'no'){
					//console.log(no)
					this.rewardPut.isConfig = false
					this.rewardPut.giveSum = ''
					this.rewardPut.cycleTimes = ''
					this.rewardPut.ratio = []
					this.rewardPut.ratioNum = []
					bool = false
				}
				this.$emit('on-change',bool)
			},
			updateRatio(str,data){
				if(str == "times"){
					this.rewardPut.ratio = this.configRatio(data)
					this.rewardPut.ratioNum = this.configRatio(data)
				}
			},
			configRatio(data){
				let arr = []
				for(let i=0;i<data;i++){
					arr[i] = ''
				}
				return arr
			},
			getRatioVal(){
				let arr1 = new Array( this.rewardPut.startTimes*1 )
				let arr2 = new Array( this.rewardPut.ratio.length )
				let arr = this.rewardPut.ratio
				for(let i=0;i<arr1.length;i++){
					arr1[i] = '不送'
				}
				let ratioSum = 0
				for(let i=0;i<arr.length;i++){
					if(arr[i] == ''){
						alert('请填写比例')
						return
					}
					ratioSum += arr[i]*1
				}
				let sum = 0
				for(let i=0;i<arr2.length;i++){
					arr2[i] = Math.round(this.rewardPut.giveSum*(arr[i]/ratioSum))+''
				}
				let j = 0
				while(j < arr2.length) {
					sum+=arr2[j]*1
					j++;
				}
				if( sum > this.rewardPut.giveSum){
					arr2[arr2.length-1] = (arr2[arr2.length-1]-1)+''
				}
				this.rewardPut.ratioNum = arr1.concat(arr2)
			},
			toggleReward(){
				//this.rewardPut.isConfig = this.rewardPut.isConfig?false:true
				this.rewardPut.isConfig = true
				this.disableForm  = false
			}
		}
	}
</script>
<style>
	.confirmRatio{
		height: 36px;
	    line-height: 36px;
	    padding: 0 10px;
	    background-color: #4684E9;
	    margin-left: 10px;
	    cursor: pointer;
	}
</style>