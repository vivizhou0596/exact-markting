<template>
	<div class="calc-item-list">
		<div class="calc-subTitle">
			<span class="no-choose " :class="[resources.isConfig?'choosed':'']" ></span>
			<p class="calc-subTitle-text" @click="toggleContenShow()">{{resources.name}}<span style="position:absolute;top:5px;right: 0;" class="show-hide-icon" :class="[isShowContent?'show-icon':'hide-icon']"></span></p>
			<div class="pull-right" style="margin-right:100px" v-show="isShowContent">
				<button 
					class="calc-save-eidt " 
					:class="[resources.isConfig?'':'calc-save']" 
					@click="updateResourceConfig(resources)" >
					保存
				</button>
				<button 
					class="calc-save-eidt " 
					:class="[resources.isConfig?'calc-edit':'']" 
					@click="function(){resources.isConfig = false}">
					修改
				</button>
			</div>
		</div>
		<div class="calc-item-form" v-show="isShowContent">
			<div class="form-group">
				<label>赠送周期：</label>
				<input type="text" 
						class="calc-bigInput" 
						:disabled="resources.isConfig" 
						v-model="resources.cycleTimes" 
						@change="toggleMonNum('month',resources.cycleTimes)">
				<span>个月</span>
			</div>
			<div class="form-group">
				<label>赠送开始时间：</label>
				<select class="calc-bigInput"  v-model="resources.startTimes" :disabled="resources.isConfig" @change="toggleMonNum('startTime',resources.startTimes)"> 
					<option value="0" >参与当月</option>
					<option value="1">参与次月</option>
					<option value="2">参与三月</option>
					<option value="3">参与四月</option>
				</select>
			</div>
			<div class="form-group">
				<label>{{busLabel}}：</label>
				<input type="text" class="calc-bigInput" :disabled="resources.isConfig" v-model="resources.giveSum" @change="toggleMonNum('giveSum',resources.giveSum)"> <span>{{busUnit}}</span>
			</div>
			<ul class="monNum-label">
				<li><p class="radioBtn " :class="[radioCheck ? 'radioBtnCheck' : '']"  @click="toggleRadioCheck('everage')"></p>月均值</li>
				<li><p class="radioBtn" :class="[!radioCheck ? 'radioBtnCheck' : '']" @click="toggleRadioCheck('trend')"></p>月趋势值</li>
			</ul>
			<ul class="monNum-box">
				<li v-for="(item,index) in resources.months">
					<p style="color:#676B73">参与第{{index+1}}个月</p>
					<div>
						<input type="text" class="calc-smallInput" 
							v-model="resources.months[index]"
							:disabled="(radioCheck||resources.isConfig)?true:false"
						>
						<label>{{busUnit}}</label>
					</div>
				</li>
			</ul>
			<div v-if="resources.name=='送其他业务'?true:false">
				<div class="form-group">
					<label>赠送业务编码：</label><input type="text" class="calc-bigInput" v-model="resources.busCode">
				</div>
				<div class="form-group">
					<label>赠送业务名称：</label><input type="text" class="calc-bigInput" v-model="resources.busName">
				</div>
				<div class="form-group">
					<label>赠送业务月租：</label><input type="text" class="calc-bigInput" v-model="resources.busMonrent"> <span>元</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			resources:{
				type:Object,
				default:function(){
					return {name:'送话费',cycleTimes:'',startTimes:'0',sumTime:'0',giveSum:'',isConfig:false,months:[]}
				},
			}
		},
		data(){
			return{
				isShowContent:false,
				radioCheck:true
			}
		},
		computed:{
			busLabel(){
				let biz = ''
				switch (this.resources.enName) {
					case 'fee': biz = '赠送金额'; break;
					case 'flow': biz = '赠送流量'; break;
					case 'call': biz = '赠送通话'; break;
					case 'discount': biz = '赠送金额'; break;
					default: biz = '赠送金额'; break;
				}
				return biz
			},
			busUnit(){
				let uint = ''
				switch (this.resources.enName) {
					case 'fee': uint = '元'; break;
					case 'flow': uint = 'MB'; break;
					case 'call': uint = '分钟'; break;
					case 'discount': uint = '元'; break;
					default: uint = '元'; break;
				}
				return uint
			}
		},
		methods:{
			updateResourceConfig(data){
				//console.log(data)
				let sum=0;
				if(data.cycleTimes == ""){
					alert('请填写赠送周期')
					return
				}
				if(data.giveSum == ""){
					alert('请填写赠送金额')
					return
				}
				for(let i=0;i<data.months.length;i++){
					if(data.months[i] == ''){
						alert('赠送趋势存在空')
						return
					}
					sum += Number(data.months[i])
					data.months[i] = data.months[i]+'';
				}
				if(sum>data.giveSum){
		          alert('月赠送之和大于赠送总额');
		          return;
		        }
				if(data.busCode != undefined && data.busCode == ''){
					alert('请填写赠送业务编码')
					return
				}
				if(data.busName != undefined && data.busName == ''){
					alert('请填写赠送业务名称')
					return
				}
				if(data.busMonrent != undefined && data.busMonrent == ''){
					alert('请填写赠送业务月租')
					return
				}
				this.resources.isConfig = true
				this.resources.sumTime = this.resources.startTimes*1+this.resources.cycleTimes*1
				this.$emit('on-change',data)
			},
			toggleRadioCheck(str){
				if(!this.resources.isConfig){
					if(str == 'everage'){
						this.radioCheck = true
						this.toggleMonNum(null,null)
					}else if(str == 'trend'){
						this.radioCheck = false
						this.toggleMonNum(null,null)
					}
				}
			},
			toggleMonNum(str,data){
				let bool = this.radioCheck?true:false
				if(this.resources.giveSum!=''){
					this.resources.months = this.configMonths(bool)
				}
			},
			configMonths(bool){
				let data = bool?Math.floor((this.resources.giveSum*1/this.resources.cycleTimes)*10)/10:'';
				//let arrLength = (this.resources.cycleTimes*1 + resources.startTimes*1)
				let arr1 = new Array( this.resources.startTimes*1 )
				let arr2 = new Array( this.resources.cycleTimes*1 )
				for(let i=0;i<arr1.length;i++){
					arr1[i] = '不送'
				}
				for(let i=0;i<arr2.length;i++){
					arr2[i] = data
				}
				return arr1.concat(arr2)
			},
			toggleContenShow(){
				this.isShowContent = this.isShowContent?false:true
			}
		}
	}
</script>
