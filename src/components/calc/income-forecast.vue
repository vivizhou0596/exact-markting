<template>
	<div class="calc-item-list">
		<div class="calc-subTitle">
			<span class="no-choose" :class="[income.isConfig?'choosed':'']" @click="updateIncomeConfig(income)" ></span>
			<p class="calc-subTitle-text"  @click="toggleContenShow()">{{income.name}}<span style="position:absolute;top:5px;right: 0;" class="show-hide-icon" :class="[isShowContent?'show-icon':'hide-icon']"></span></p>
			<div class="pull-right" style="margin-right:100px" v-show="isShowContent">
				<button class="calc-save-eidt "  :class="[(income.isConfig || income.months.length==0) ?'':'calc-save']" @click="updateIncomeConfig(income)" >保存</button>
				<button class="calc-save-eidt " :class="[income.isConfig?'calc-edit':'']"  @click="function(){income.isConfig = false,income.isEdit=true}">修改</button>
			</div>
		</div>
		<div class="calc-item-form" v-show="isShowContent">
			<ul class="monNum-label">
				<li><p class="radioBtn " :class="[isAver ? 'radioBtnCheck' : '']"  @click="toggleMonNum('everage')"></p>月均值</li>
				<li><p class="radioBtn" :class="[!isAver ? 'radioBtnCheck' : '']" @click="toggleMonNum('trend')"></p>月趋势值</li>
			</ul>
			<ul class="monNum-box">
				<li v-for="(item,index) in income.months" :key="index">
					<p style="color:#676B73">参与第{{index+1}}个月</p>
					<div>
						<input type="text" 
							class="calc-smallInput"  
							name="item" 
							v-model="income.months[index]" 
							:disabled="((index>0&&isAver)||income.isConfig)?true:false" 
							@change="avegConfig(isAver,index,income.months[index])">
							<label>{{busUnit}}</label>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	//import resMonTab from "./res-mon-tab"
	//import Vue from 'vue'
	export default{
		props:{
			income:{
				type:Object,
				default:function(){
					return{
						name:'收入',
						isConfig:false,
						enName:'fee',
						isEdit:false,
						months:[]
					}
				}
			},
			cycleTimes:{
				type:Number,
				default:12,
			},
			giveTime:{
				type:Number,
				default:0
			},
			maxGiveTime:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				isShowContent:false,
				isAver:true
			}
		},
		watch:{
			cycleTimes(val){
				let time = this.clacTimes(val,this.giveTime)
				this.income.months =this.monthsConfig(time,null)
			},
			giveTime(val){
				let time = this.clacTimes(this.cycleTimes,val)
				this.income.months =this.monthsConfig(time,null)
			},
			maxGiveTime(val){
				if(this.income.enName == 'retention'){
					let time = this.clacTimes(this.cycleTimes,val)
					this.income.months =this.monthsConfig(time,null)
				}
			}
		},
		created(){
			let time = this.clacTimes(this.cycleTimes,this.giveTime)
			this.income.months = this.monthsConfig(time,null)
			//console.log(this.income.months.length)
		},
		computed:{
			busUnit(){
				let uint = ''
				switch (this.income.enName) {
					case 'fee': uint = '元'; break;
					case 'call': uint = '分钟'; break;
					case 'flow': uint = 'MB'; break;
					case 'retention': uint = '%'; break;
					default: uint = '元'; break;
				}
				return uint
			},
		},
		methods:{
			clacTimes(cyctime,giveTime){
				let sumTime = 0
				if(giveTime > 0){
					sumTime =  cyctime + giveTime
				}
				return sumTime-1
			},
			updateIncomeConfig(data){
				//console.log(data.months.length)
				if(data.months.length == 0){
					return
				}
				for(let i=0;i<data.months.length;i++){
					if(data.months[i]==''){
						alert('配置数据存在空')
						return
					}
				}
				this.income.isConfig = true
				this.income.isEdit = false
				this.$emit('on-change',data)
			},
			monthsConfig(data,val){
				let value = val ? val:''
				let arr=[]
				for(let i=0;i<data;i++){
					arr[i] = value
				}
				return arr
			},
			toggleContenShow(){
				this.isShowContent = this.isShowContent?false:true
			},
			toggleMonNum(){
				let time = ''
				if(!this.income.isConfig){
					this.isAver = this.isAver?false:true
					if(this.income.enName == 'retention'){
						time = this.cycleTimes+this.maxGiveTime-1
					}else{
						time = this.cycleTimes+this.giveTime-1
					}

					this.income.months = this.monthsConfig(time,null)
				}
			},
			avegConfig(isAver,index,value){
				let time = ''
				if(this.income.enName == 'retention'){
					time = this.cycleTimes+this.maxGiveTime-1
				}else{
					time = this.cycleTimes+this.giveTime-1
				}
				if(isAver){
					if(value){
						this.income.months = this.monthsConfig(time,value)
					}
				}
			}
		}
	}
</script>
