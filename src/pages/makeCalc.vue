<template>
	<div style="min-height:100%;min-width:1200px;background-color:#3C4451;padding-bottom:10px;">
		<a class="pull-left check-back" @click="goback" key="addBack"></a>
		<ul class="calc-nav">
			<li class="pull-left batch-label">
				<label>用户群名称：</label>
				<p style="cursor:pointer;line-height:40px;padding-left:10px" >
					<span class="batch-label-text" :title="batcher.batchName">{{batcher.batchName}}</span>
					<span @click="getCompareUser()" class="batch-label-btn">导入</span>
				</p>
			</li>
			<li class="pull-right batch-msg">
				<p>编码：<span>{{batcher.batchNo}}</span></p>
				<div type="button" @click="showCityList()" style="display:none">成都市 <span class="angle-down" style="position:absolute; top:15px;right:10px;"></span></div>
				<ul class="city-list" v-if="isShowCity">
					<li data-id="1" class="city-active">成都</li>
				</ul>
			</li>
		</ul>
		<section style="padding:0 40px">
			<!-- 活动用户规模 -->
			<div class="calc-item-box">
				<div class="calc-title">
					<!-- <span class="no-choose " :class="[states.userScale?'choosed':'']" @click= "function(){states.userScale=states.userScale?false:true}"></span> -->
					<span class="no-choose " :class="[states.userScale?'choosed':'']"></span>
					<p class="calc-title-text">活动用户规模</p>
				</div>
				<ul class="calc-bisc-cont">
					<li>
						<input type="text" :value="batcher.batchNum" class="calc-bigInput" readonly>
						<span class="ml-20">万人</span>
					</li>
					<li>
						<label class="mr-20">预估参与率：</label>
						<!-- <input type="text" class="calc-bigInput" v-model="calcBatchRate" :disabled="states.userScale" @change="toggleCalcBatch('rate',calcBatchRate)"> -->
						<input type="text" class="calc-bigInput" v-model="calcBatchRate" @change="toggleCalcBatch('rate',calcBatchRate)">
						<span class="ml-20">%</span>
					</li>
					<li>
						<label class="mr-20">预估参与用户：</label>
						<!-- <input type="text" class="calc-bigInput" v-model="calcBatchNum" :disabled="states.userScale" @change="toggleCalcBatch('num',calcBatchNum)"> -->
						<input type="text" class="calc-bigInput" v-model="calcBatchNum" @change="toggleCalcBatch('num',calcBatchNum)">
						<span class="ml-20">万人</span>
					</li>
				</ul>
			</div>
			<!-- 计划开始时间 -->
			<div class="calc-item-box">
				<div class="calc-title">
					<span class="no-choose" :class="[states.planTime?'choosed':'']" @click= "function(){states.planTime=states.planTime?false:true}"></span>
					<p class="calc-title-text">计划开始时间</p>
				</div>
				<ul class="calc-bisc-cont">
					<li style="position:relative">
						<label class="mr-20">活动开始时间：</label>
						<!-- 时间选择器 -->
						<v-date-picker @on-change="getStartTime($event)" ></v-date-picker>
						<img src="../common/img/calc/calendar.png" class="calendar-icon">
					</li>
					<li style="position:relative">
						<label class="mr-20">活动结束时间：</label>
						<!-- 时间选择器 -->
						<v-date-picker @on-change="getEndTime($event)" ></v-date-picker>
						<img src="../common/img/calc/calendar.png" class="calendar-icon">
					</li>
					<li>
						<label class="mr-20">活动开展周期：</label>
						<input type="text" class="calc-bigInput" :value="cycTimes.length"><span class="ml-20">个月</span>
					</li>
				</ul>
			</div>
			<!-- 发展规模预估 -->
			<div class="calc-item-box">
				<div class="calc-title">
					<span class="no-choose" :class="[states.scale?'choosed':'']" ></span>
					<p class="calc-title-text">发展规模预估</p>
				</div>
				<div class="scale-content" >
					<form >
						<mon-sep-tab
							:userScale ='userScale'
							@on-change="updateScaleconfig($event)"
							:cycTimes = "cycTimes"
							:calcBatchNum = "calcBatchNum"
							:disableForm="states.scale">
						</mon-sep-tab>
					</form>
				</div>
			</div>
			<!-- 单用户资源投入 -->
			<div class="calc-item-box">
				<div class="calc-title">
					<span class="no-choose" :class="[states.resource?'choosed':'']"></span>
					<p class="calc-title-text">单用户资源投入</p>
				</div>
				<div class="scale-content" >
					<resource-input v-for="(value,key) in resInput"  :resources="value" @on-change="configResource($event)"></resource-input>
				</div>
			</div>
			<!-- 单用户收益预估 -->
			<div class="calc-item-box">
				<div class="calc-title">
					<span class="no-choose" :class="[states.income?'choosed':'']"></span>
					<p class="calc-title-text">单用户收益预估</p>
				</div>
				<div class="scale-content" >
					<incom-forecast
						v-for="(value,key) in incomeFoc"
						:cycleTimes="cycTimes.length"
						:giveTime = "resInput[key]&&resInput[key].sumTime"
						:maxGiveTime = "maxGiveTime"
						:income ="value"
						@on-change="updateIncomeConfig($event)">
						{{key}}
					</incom-forecast>
				</div>
			</div>
			<!-- 单用户酬金投入 -->
			<div class="calc-item-box">
				<div class="calc-title">
					<span class="no-choose" :class="[states.reward?'choosed':'']"></span>
					<p class="calc-title-text">单用户酬金投入</p>
				</div>
				<div class="scale-content" >
					<div class="calc-item-list">
						<div class="calc-item-form">
							<form>
								<reward-input :rewardPut="rewardPut" @on-change="updateRewardConfig($event)"></reward-input>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div style="text-align:center;padding:20px;">
			<button type="button" class="calc-btn" @click="toTopDownPdf()" >导出配置</button>&nbsp;&nbsp;&nbsp;
			<button type="button" class="calc-btn" @click="submitCalc()">开始计算</button>
		</div>
		<div>
		<my-dialog :is-show="isShowfilter" >
			<filter-batch  @on-change="togbatchMod($event)" :comTabData="comTabData" :meTabData="meTabData"></filter-batch>
		</my-dialog>
		</div>
	</div>
</template>
<script>
	import message from 'vue-multiple-message'
	import myDialog from '../components/base/dialog'
	import VDatePicker from '../components/datepicker'
	import filterBatch from '../components/filter-batch'
	import axios from 'axios'
	import { batchCalcNumFactory } from "../common/js/common"
	import monSepTab from "../components/calc/mon-sep-tab"
	import resourceInput from '../components/calc/resource-input'
	import incomForecast from "../components/calc/income-forecast"
	import rewardInput from "../components/calc/reward-input"
	import {downPdf} from "../common/js/public"
	import {getCompareUser,calcScreen} from 'api/targets'
	export default {
		components:{VDatePicker,myDialog,filterBatch,
			monSepTab,resourceInput,incomForecast,rewardInput
		},
		data(){
			return{
				states:{
					userScale:false,
					planTime:false,
					scale:false,
					resource:false,
					income:false,
					reward:false
				},
				isShowfilter:false,
				isShowCity:false,
				comTabData:[],//系统推荐用户群
				meTabData:[],//我的用户群
				batcher:{
					batchId:"ddj223",
					batchName:"",//用户群名称
					batchNo:"",//测算群编码
					batchNum:"",//用户规模万人
					creatTime:"",
					isChecked:true
				},
				isShowContent:false,
				userScale:{//用户预计发展规模
					isConfig:false,
					isEdit:false,
					unit:'万人',
					calcBatchNum:'',
					items:[],
				},
				resInput:{//单用户预计投入
					fee:{name:'送话费',enName:'fee',cycleTimes:'',startTimes:'0',sumTime:0,giveSum:'',isConfig:false,months:[]},
					flow:{name:'送流量',enName:'flow',cycleTimes:'',startTimes:'0',sumTime:0,giveSum:'',isConfig:false,months:[]},
					call:{name:'送语音',enName:'call',cycleTimes:'',startTimes:'0',sumTime:0,giveSum:'',isConfig:false,months:[]},
					discount:{name:'送优惠',enName:'discount',cycleTimes:'',startTimes:'0',sumTime:0,giveSum:'',isConfig:false,months:[]},
					other:{name:'送其他业务',enName:'other',cycleTimes:'',startTimes:'0',sumTime:0,giveSum:'',busCode:'',busName:'',busMonrent:'',isConfig:false,months:[]}
				},
				incomeFoc:{//单用户预估收益
					fee:{name:'话费收入',enName:'fee',isConfig:false,isEdit:false,months:[]},
					flow:{name:'流量收入',enName:'flow',isConfig:false,isEdit:false,months:[]},
					call:{name:'语音收入',enName:'call',isConfig:false,isEdit:false,months:[]},
					retention:{name:'客户保有',enName:'retention',isConfig:false,isEdit:false,months:[]}
				},
				rewardPut:{//单用户酬金
					name:'酬金',
					giveSum:'',
					cycleTimes:'',
					ratio:[],
					startTimes:'0',
					isConfig:false,
					isEdit:false,
					ratioNum:[]
				},
				maxGiveTime:0,
				calcBatchRate:'',//用户群参与率
				calcBatchNum:'',//用户群参与人数，万人
				startTime:'',//活动开始时间
				endTime:'',//活动结束时间
				cycTimes:[]//活动时间表
			}
		},
		watch:{
			startTime(){
				this.timeSep (this.startTime, this.endTime)
			},
			endTime(){
				this.timeSep (this.startTime, this.endTime)
			},
			cycTimes(val){
				this.cycTimes = val
				for (let i in this.incomeFoc){
					this.incomeFoc[i].isConfig = false
				}
				this.states.scale = false
				this.states.income = false
        		this.userScale.isEdit=false
				this.states.planTime = true
			}
		},
		methods:{
			submitCalc(){
				if(this.$data.calcBatchNum=="" || this.$data.calcBatchRate==""){
					alert('预估参与情况不能为空')
					return
				}
				if(this.$data.startTime=="" || this.$data.endTime==""){
					alert('活动时间不能为空')
					return
				}
				if(this.states.scale == false){
					alert('请确认活动期间每月用户发展')
					return
				}
				let resourceArr = {}
				if(this.states.resource){//将满足配置条件的单用户资源加入临时对象暂存
					for(let i in this.resInput ){
						if(this.resInput[i].isConfig==false && (this.resInput[i].cycleTimes!=''||this.resInput[i].giveSum!='')){
							alert('请保存单用户资源投入-'+this.resInput[i].name+'-的相关配置再行提交')
							return
						}else if(this.resInput[i].isConfig==true){
							//console.log(this.resInput[i])
							resourceArr[i] = this.resInput[i]
						}
					}
				}
				let incomeArr = {}
				if(this.states.income){//将满足配置条件的预计收益加入临时对象暂存
					for(let i in this.incomeFoc){
						//console.log(this.incomeFoc[i].isConfig)
						if(this.incomeFoc[i].isConfig == false && this.incomeFoc[i].isEdit == true){
							alert('请保存单用户收益预估-'+this.incomeFoc[i].name+'-的相关配置再行提交')
							return
						}else if(this.incomeFoc[i].isConfig == true){
							incomeArr[i] = this.incomeFoc[i]
						}
					}
				}
				for(let i in resourceArr){
					//console.log(i)
					if(this.incomeFoc[i] && this.incomeFoc[i].isConfig ==false){
						alert('请配置单用户收益预估-'+this.incomeFoc[i].name+'-的相关参数再行提交')
						return
					}
				}
				let rewardObj = {}
				if(this.states.reward == false && this.rewardPut.isConfig == true){
					alert('请保存单用户酬金投入的相关配置再行提交')
					return
				}
				if(this.states.reward){
					rewardObj = this.rewardPut
				}
				//console.log(resourceArr)
				let submitData = {
					batchNum:this.batcher.batchNum,
					batchName:this.batcher.batchName,
					batchId:this.batcher.batchId,
					batchNo:this.batcher.batchNo,
					calcBatchNum:this.calcBatchNum,
					calcBatchRate:this.calcBatchRate,
					startTime:this.startTime,
					endTime:this.endTime,
					cycTimes:this.cycTimes.length,
					userScale:this.userScale,
					resInput:resourceArr,
					incomeFoc:incomeArr,
					rewardPut:rewardObj
				}
				//console.log(submitData)
				let batchNo = '201709111'
				calcScreen(submitData).then(({resultCode,resultContent})=>{
					//console.log(resultContent)
					if( resultCode == '001'){
			   			batchNo = resultContent
			   			this.$router.push({
							path: '/calcResult',
							name:'calcResult',
							params: { batchNo:batchNo,action:'log' }
						})
						this.batcher.batchNo = batchCalcNumFactory()
			   		}else if(resultCode == '009') {
			        	this.$router.push({
			        		path:'./fail',
			        		name:'fail',
			        		params:{msg:resultContent}
			        	})
			        }else{
			   			message.error('对比用户群获取失败，请稍后重试')
			   			console.log( resultContent )
			   			this.batcher.batchNo = batchCalcNumFactory()
			   		}
			   		this.batcher.batchNo = batchCalcNumFactory()
				}).catch((err)=>{
					console.log(err)
					message.error('请求失败请稍后重试！')
				})
			},
			getCompareUser(){//点击页面获取对比用户群的按钮
				let batchId = ''
				getCompareUser(batchId).then(({resultCode, resultContent})=>{
					//console.log(resultContent)
					if( resultCode == '001'){
			   			this.isShowfilter = true
			   			document.body.style.overflow = 'hidden'
			   			this.comTabData = resultContent.sysCommandUsers
			   			this.meTabData  = resultContent.mytargetUsers
			   			this.calcBatchRate = ''//用户群参与率
						this.calcBatchNum = ''//用户群参与人数
			   		}else if(resultCode == '009') {
			        	this.$router.push({
			        		path:'./fail',
			        		name:'fail',
			        		params:{msg:resultContent}
			        	})
			        }else{
			   			message.error('对比用户群获取失败，请稍后重试')
			   			console.log( resultContent )
			   		}
				}).catch((err)=>{
					console.log(err)
				    message.error('数据请求失败，请稍后重试')
				})
			},
			updateRewardConfig(item){
				if(item){
					this.states.reward = true
				}else{
					this.states.reward = false
				}
			},
			updateIncomeConfig(item){
				if(item){
					this.states.income = true
				}
			},
			configResource(item){
				if(item.sumTime > this.maxGiveTime){
					this.maxGiveTime = item.sumTime
				}
				if(item){
					this.states.resource = true
				}
			},
			updateScaleconfig(item){
				if(item){
					this.states.scale = true
					this.userScale.items = item
				}else{
					this.states.scale = false
				}
			},
			timeSep (startTime, entTime) {
				//console.log(startTime.split("-").join(''))
				//console.log(entTime.split("-").join(''))
	            let result = [];
	            if(startTime && entTime){
	            	if(startTime.split("-").join('')>=entTime.split("-").join('')){
	            		message.error('活动开始时间必须小于活动结束时间')
	            		this.cycTimes = []
	            		return
	            	}
	            	let startTimeArr = startTime.split("-", 2);
		            let entTimeArr = entTime.split("-", 2);
		            let startYear = startTimeArr[0]; let startMonth = parseInt(startTimeArr[1]);
		            let entYear = entTimeArr[0]; let entMonth = parseInt(entTimeArr[1]);
		            let count = 0; let flag = true; //结束循环标志位
		           // console.log(startMonth)
		            for (let month = startMonth, year = startYear; flag; month++) {
		                if(year==entYear&&month>entMonth){ flag=false; }else{
		                    if (month > 12) {
		                        year++;
		                        if (year <= entYear) { month = 0; } else { flag=false; }
		                    } else {
		                        if(month<10){ month="0"+month;}
		                        result[count] = year + "." + month;
		                        count++;
		                    }
		                }
		            }
	            }
	            this.cycTimes = result
	        },
			toggleCalcBatch(flag,data){ // 参与率和参与人数的转换函数
				//console.log(flag,data)
				if(flag == 'rate'){
					if(data>100){
						message.error('参与率必须小于100')
						this.calcBatchRate = ''
						this.calcBatchNum = ''
						return
					}
					this.calcBatchNum = (this.batcher.batchNum * (data/100)).toFixed(1,10)
				}else if(flag == 'num'){
					console.log(data,this.batcher.batchNum)
					if(data>this.batcher.batchNum*1){
						message.error('参与用户数超出总用户数')
						this.calcBatchNum = ''
						this.calcBatchRate = ''
						return
					}
					this.calcBatchRate = (data/this.batcher.batchNum).toFixed(2,10)*100;
				}
				this.userScale.calcBatchNum = this.calcBatchNum
				this.states.userScale =true
			},
			getStartTime(data){
				this.startTime = data
			},
			getEndTime(data){
				this.endTime = data
			},
			togbatchMod(data){
				if(data.type == 'submit'){
					if(!data.val.batchId){
						message.warning('请选择要对比的用户群')
						return
					}
					this.isShowfilter = false
					document.body.style.overflow = 'auto'
					this.batcher =  data.val
					this.batcher.batchNo = batchCalcNumFactory()
					this.batcher.batchNum = (this.batcher.batchNum/10000).toFixed(1)
					//console.log(this.batcher)
					//console.log(this.batchCalcNumFactory())
				}else{
					this.isShowfilter = false
					document.body.style.overflow = 'auto'
				}
			},
			showCityList(){
				this.isShowCity = this.isShowCity == true?false:true
			},
			toggleContenShow(){
				this.isShowContent = this.isShowContent?false:true
				console.log(this.isShowContent)
			},
			toTopDownPdf(){//下载pdf时先将页面置顶
				window.scrollTo(0,0)
				downPdf()//将页面转换成pdf 的方法，该方法放置于common/js/public.js
			},
		    goback(){
				this.$router.push({
					path:'/calcIndex',
      				name:'calcIndex'
				})
			},
		}
	}
</script>
<style >
	.check-back{
		width: 40px;
		height: 40px;
		background-image: url('../assets/imgs/back-white.png');
		background-size: 40px 40px;
		background-position: center;
		background-repeat: no-repeat;
		display: inline-block;
		cursor: pointer;
		position:absolute;
		top:0px;
		left:15px;
		margin-top: 10px;
		z-index: 1;
	}
	.show-hide-icon{
		display: inline-block;
		width: 14px;
		height: 10px;
	}
	.show-icon{
		background-image: url(../common/img/calc/calc-show.png);
	}
	.hide-icon{
		background-image: url(../common/img/calc/calc-hide.png);
	}
	.calendar-icon{
		position: absolute;
	    top: 38px;
	    right:70px;
	}
	.calc-save-eidt{
		border:none;
		background-color: #B6B6B6;
		color:#fff;
		/*padding:3px 6px;*/
		margin-right: 20px;
		cursor: pointer;
		height: 24px;
		line-height: 20px
	}
	.calc-save{
		background-color: #6DB92C;
	}
	.calc-edit{
		background-color: #457EDA;
	}
	.reward-ratio>li .ratio-rep{
		display: inline-block;
		padding:0 5px;
		font-size:16px;
		font-weight:bold;
	}
	.reward-ratio{
		display: inline-block;
		overflow: hidden;
		vertical-align: middle;
	}
	.reward-ratio>li{
		float:left;
		margin-top:5px;
	}
	.calc-btn{
		border:none;
		width: 100px;
		height: 40px;
		background-color: #4684E9;
		color:#fff;
		cursor: pointer;
	}
	.reward-option{
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
	}
	.form-group{
		padding: 10px 0px;
		display: inline-block;
		margin-right: 40px;
	}
	.calc-item-form{
		margin-left: 40px;
	}
	.calc-item-list{
		padding-left: 40px;
	}
	.calc-subTitle-text{
		display: inline-block;
		position: relative;
		margin-left: 20px;
		width: 100px;
	}
	.calc-subTitle{
		margin:10px 0;
	}
	.scale-content{
		background-color:#353B47;
		padding:20px 40px;
	}
	.monNum-label{
		height: 30px;
		line-height: 30px;
	}
	.monNum-label>li{
		float: left;
		margin-right: 20px;
	}
	.monNum-box{
		display: flex;
		justify-content:flex-start;
		flex-wrap:wrap;
		width: 1200px;
		margin-left:80px;
		/*margin:0 auto;*/
	}
	.monNum-box>li{
		text-align: left;
		margin-top:10px;
		width:130px;
	}
	.monNum-box>li>p{
		height:25px;
		line-height:25px;
	}
	.monNum-box>li>div{
		margin-top:5px;
	}
	.monNum-box>li label{
		margin-left: 10px;
	}
	.radioBtn{
		width: 12px;
		height: 12px;
		display: inline-block;
		border:1px solid #ddd;
		border-radius: 50%;
	}
	.radioBtn.radioBtnCheck{
		border:3px solid  #4684E8;
		background-color: #fff;
	}
	.calc-bisc-cont{
		display: flex;
		justify-content: space-between;
		min-width:1200px;
		margin-top: 20px;
	}
	.calc-bisc-cont>li{
		background-color: #353B47;
		width:32%;
		text-align: center;
		height:90px;
		line-height:90px;
	}
	.calc-bigInput{
		background-color: transparent;
		height:36px;
		width:160px;
		border:1px solid #797979;
		color: #fff;
		text-align: center;
	}
	.calc-bigInput>option{
		background-color: #797979;
		border: none;
	}
	.calc-middleInput{
		background-color: transparent;
		height:36px;
		width:80px;
		border:1px solid #797979;
		color: #fff;
		text-align: center;
	}
	.calc-smallInput{
		background-color: transparent;
		height:30px;
		width:50px;
		border:1px solid #797979;
		color: #fff;
		background-color: #545A64;
		text-align: center;
	}
	.calc-item-box{
		margin-top: 20px;
	}
	.calc-title{
		height: 20px;
		margin:10px 40px;
	}
	.no-choose{
		display: inline-block;
		width: 18px;
		height: 18px;
		/*border: 1px solid #D84A4A;*/
		background-image: url(../common/img/calc/no-choose.png);
		border-radius: 50%;
		vertical-align: bottom;

	}
	.no-choose.choosed{
		border:none;
		background-image: url(../common/img/calc/choosed.png);
	}
	.calc-title-text{
		display: inline-block;
		font-weight: bold;
		font-size: 18px;
		margin-left: 20px;
		padding-left: 10px;
		border-left: 5px solid #fff;
	}
	.calc-nav{
		height:70px;
		background-color: #457EDA;
		padding:15px 0;
		min-width: 1200px;
	}
	.batch-label{
		min-width: 500px;
		margin-left:80px;
	}
	.batch-label>label{
		height: 40px;
		line-height: 40px;
		vertical-align:top;
		display: inline-block;
	}
	.batch-label>p{
		width: 400px;
		background-color: #5D95F0;
		height: 40px;
		display: inline-block;
	}
	.batch-label-text{
		width:280px;
		display: inline-block;
		/*line-height: 0px;*/
		white-space: nowrap;
		overflow-x: hidden;
		text-overflow: ellipsis;
	}
	.batch-label-btn{
		display: inline-block;
		float: right;
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		letter-spacing: 2px;
		background-color: #00CAD2;
	}
	.batch-msg{
		min-width: 500px;
		text-align: right;
		margin-right: 40px;
		position: relative;
	}
	.city-list{
		position: absolute;
		top:40px;
		right:10px;
		background-color:#fff;
		width:80px;
		color:#545A64;
		text-align: center;
	}
	.city-list>li{
		padding: 5px 0;
		cursor: pointer;
		/*border-bottom: 1px solid rgb(103, 107, 115);*/
	}
	.city-list>li.city-active{
		color:#fff;
		background-color: #457EDA;
	}
	.batch-msg>p{
		display: inline-block;
		height: 40px;
		line-height: 40px
	}
	.batch-msg>div{
		display: inline-block;
		height: 34px;
		line-height:34px;
		width: 100px;
		border: 1px solid #fff;
		border-radius:20px;
		text-align: center;
		margin-left: 20px;
		position: relative;
		cursor: pointer;
	}


</style>
