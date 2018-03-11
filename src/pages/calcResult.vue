<template>
	<div style="background-color:#3C4451;min-height:100%;min-width:1200px;padding:1px">
		<a class="pull-left check-back" @click="goback" key="addBack"></a>
		<div>
			<result-sliderbar
				:startTime="sliderBar.startTime"
				:endTime="sliderBar.endTime"
				:cycTime = "sliderBar.cycTime"
				@on-change = "toggleBarTime($event)"
	   			>
	   		</result-sliderbar>
		</div>
		<section style="color:#f7f7f7;padding:10px" class="charts-section">
			<div >
				<h4 class="section-title">投入</h4>
				<result-charts v-for="item in resourceInput"  :chartsData="item"></result-charts>
			</div>
			<div >
				<h4 class="section-title">收益</h4>
				<result-charts v-for="item in incomeFoc" :chartsData="item"></result-charts>
			</div>
			<div>
				<h4 class="section-title">汇总</h4>
				<div class="sum-tab">
					<div class="sum-income">
						<div class="sum-income-content">
							<h4 class="sum-header">收益<span class="sum-header-sub">-是否显示计算结果</span></h4>
							<ul class="sum-income-list">
								<li v-for="(item,key) in sumTab.income">
									<radio-input :radioData = "item" :ref="item.name"></radio-input>
								</li>
							</ul>
						</div>
					</div>
					<div class="sum-input">
						<div class="sum-income-content" style="width:600px">
							<h4 class="sum-header">投入<span class="sum-header-sub">-是否显示计算结果</span></h4>
							<ul class="sum-income-list">
								<li v-for="(item,key) in sumTab.input">
									<radio-input  :radioData = "item" :ref="item.name"></radio-input>
								</li>
							</ul>
						</div>
					</div>
					<div class="clacIncome-btn"><div class="confirmRatio" @click="clacIncome()">确定设置</div></div>
				</div>
				<ul class="collectTitle" >
		            <li v-for="(item,index) in sumDetial.total">
		              	<div class="collectDiv">
			                <p class="collectPFirst">{{item.desc}}</p>
			                <p  class="collectPSecond collectPSecondL">{{item.value}}<span class="unit" >万元</span></p>
			                <p class="collectPThree" v-if="item.name.indexOf('0')==-1">
			                	*注：总净收入=总净收入-总投入(目前只包含话费，流量，语音的计算)
			                </p>
			                <p class="collectPThree" v-else>
			                	*注：该年总净收入=该年总净收入-该年总投入(目前只包含话费，流量，语音的计算)
			                </p>
		            	</div>
		            </li>
	          	</ul><ul class="collectTitle" >
		            <li v-for="(item,index) in sumDetial.mon">
		              	<div class="collectDiv">
			                <p class="collectPFirst">{{item.desc}}</p>
			                <p  class="collectPSecond collectPSecondR">{{item.value}}<span class="unit" >万元</span></p>
			                <p class="collectPThree" v-if="item.name.indexOf('0')==-1">
			                	*注：月均净收益=总净收益/活动展开月数(目前只包含话费，流量，语音的计算)
			                </p>
			                <p class="collectPThree" v-else>
			                	*注：该年月均净收益=该年总净收益/该年活动展开月数(目前只包含话费，流量，语音的计算)
			                </p>
		            	</div>
		            </li>
	          	</ul>
			</div>
		</section>
		<div style="text-align:center;padding:20px;">
			<button class="calc-btn" v-show="isSaveBtn" @click="function(){isShowSave=true}" >保存</button>
			<button class="calc-btn" v-show="!isSaveBtn" @click="toTopDownPdf()" >导出</button>
		</div>
		<my-dialog :is-show="isShowSave" >
			<div class="save-content">
				<div class="calcName-label">
					<label for=""><span style="color:#FFAB00;vertical-align:middle;padding:5px;">*</span>测算结果名称：</label>
					<input type="text" placeholder="请输入测算群名称" v-model="calcName">
				</div>
				<div class="btn-group">
					<button type="button" style="background:#01c0c8" @click="savecalcResult()">确定</button>
					<button type="button"  style="background:#4684E9" @click="function(){isShowSave=false}">取消</button>
				</div>
			</div>
		</my-dialog>
	</div>
</template>
<script>
	//import echartBarLine from "../components/base/echarts-bar-line"
	//import axios from 'axios'
	import $ from 'jquery'
	import message from 'vue-multiple-message'
	import resultSliderbar from '../components/calc/result-sliderbar'
	import resultCharts from "../components/calc/result-charts"
	import radioInput from "../components/calc/radio-input"
	import myDialog from '../components/base/dialog'
	import {downPdf} from "../common/js/public"
	import { getClacResult,updateCalcResult,saveCalcResult } from 'api/targets'
	export default{
		components:{resultSliderbar,resultCharts,radioInput,myDialog},
		data(){
			return{
				batchNo:'',
				sliderBar:{
					startTime:'2017-12',
					cycTime:'2018-05',
					endTime:'2019-01'
				},
				resourceInput:{},
				incomeFoc:{},
				sumTab:{},
				sumDetial:{},
				newEndTime:'',
				calcName:'',
				isShowSave:false,
				isSaveBtn:true,
				action:''
			}
		},
		methods:{
			savecalcResult(){
				let context = this
				if(this.calcName == ''){
					alert('请输入测算结果名称')
					return
				}
				let ajaxData ='measure_id='+this.batchNo+'&measure_name='+this.calcName
				//console.log(ajaxData)
				saveCalcResult(this.batchNo,this.calcName).then(({resultCode,resultContent})=>{
					//console.log(resultContent)
					if( resultCode == '001'){
			   			message.success(resultContent)
			   			context.$router.push({
			   				path:'/calcGroup',
  							name:'calcGroup',
			   			})
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
			   		message.error('对比用户群获取失败，请稍后重试')
			    })
			},
			clacAgin(){
				this.$router.push({
					path:'/makeCalc',
      				name:'makeCalc',
					//params: { batchNo:batchNo }
				})
			},
			
			toggleBarTime(time){
				this.newEndTime = time
				this.toggleResult(this.newEndTime,this.sumTab)
			},
			clacIncome(){
				let context = this
				let income = this.sumTab.income
				let input  = this.sumTab.input
				for(let i in income){
					let ref = income[i].name
					income[i].initValue = context.$refs[ref][0].value
				}
				for(let i in input){
					let ref = input[i].name
					input[i].initValue = context.$refs[ref][0].value
					//console.log(input[i].name,input[i].value)
				}
				this.toggleResult(this.newEndTime,this.sumTab)
			},
			toggleResult(time,sumTabObj){//修改结果
				let context = this
				let ajaxData = {
					batchNo:this.batchNo,
					action:this.action,
					startTime:this.sliderBar.startTime,
					cycTime:this.sliderBar.cycTime,
					endTime:time,
					subTab:sumTabObj
				}
				//console.log(ajaxData)
				updateCalcResult(ajaxData).then(({resultCode,resultContent})=>{
					//console.log(resultContent)
					if( resultCode == '001'){
			   			context.dataConfig(resultContent)
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
			   		message.error('对比用户群获取失败，请稍后重试')
			    })
			},
			getResult(){//获取结果
				const params = this.$route.params
				if(params.batchNo){
					sessionStorage.setItem("batchId", params.batchNo)
					sessionStorage.setItem("action", params.action)
				}
				this.batchNo = sessionStorage.getItem("batchId")
				this.action = sessionStorage.getItem("action")
				this.isSaveBtn = this.action=='result'?false:true
				//console.log(this.batchNo)
				let context = this
				getClacResult(this.batchNo,this.action).then(({resultCode,resultContent})=>{
					//console.log(resultContent)
					if( resultCode == '001'){
			   			context.dataConfig(resultContent)
			   			context.newEndTime = context.sliderBar.endTime
			   			//console.log(context.newEndTime)
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
			   		message.error('对比用户群获取失败，请稍后重试')
			    })
			},
			dataConfig(resultContent){
				//console.log(resultContent.cycTime)
				this.sliderBar.startTime =resultContent.startTime?resultContent.startTime:this.sliderBar.startTime
	   			this.sliderBar.endTime = resultContent.endTime?resultContent.endTime:this.sliderBar.endTime
	   			this.sliderBar.cycTime = resultContent.cycTime?resultContent.cycTime:this.sliderBar.cycTime
	   			this.resourceInput = resultContent.bardata.input
	   			this.incomeFoc = resultContent.bardata.income
	   			this.sumTab = resultContent.sumTab
	   			this.sumDetial = this.sumDetialConfig(resultContent.sumDetial)
	   			//console.log(this.sliderBar.endTime)
			},
			sumDetialConfig(arr){
				let obj = { total:[],mon:[] }
				for(let i=0;i<arr.length;i++){
					if(arr[i].tag == 'total' && arr[i].name.split('2')[1]!=undefined ){
						obj.total.push(arr[i])
					}else if(arr[i].tag == 'mon' &&  arr[i].name.split('2')[1]!=undefined){
						obj.mon.push(arr[i])
					}
				}
				obj.total.sort((a,b)=>{
            		return a.name.split('2')[1]-b.name.split('2')[1]
            	});
            	obj.mon.sort((a,b)=>{
            		return a.name.split('2')[1]-b.name.split('2')[1]
            	});
            	for(let i=0;i<arr.length;i++){
            		if(arr[i].tag == 'total' && arr[i].name.split('2')[1]==undefined ){
						obj.total.unshift(arr[i])
					}else if(arr[i].tag == 'mon' &&  arr[i].name.split('2')[1]==undefined){
						obj.mon.unshift(arr[i])
					}
            	}
            	return obj
			},
			toTopDownPdf(){//下载pdf时先将页面置顶
				window.scrollTo(0,0)
				downPdf()//将页面转换成pdf 的方法，该方法放置于common/js/public.js
			},
			goback(){
				this.$router.go(-1)
			}
		},
		created(){
			this.getResult()//获取页面参数
		}
	}
</script>
<style scoped>
	.calcName-label{
		position: absolute;
		top:20%;
		left:10%;
	}
	.calcName-label label{
		font-size: 16px;
		color: #333;
	}
	.calcName-label input{
		width: 200px;
		border-radius:5px;
		border:1px solid #ddd;
		padding:8px 5px;
		background: transparent;

	}
	.btn-group{
		position: absolute;
		bottom: 5%;
		text-align: center;
		width: 100%;
	}
	.btn-group button{
		border: none;
		width:50px;
		height:30px;
		line-height: 30px;
		margin:10px;
		color: #fff;
		border-radius:5px;
		/*padding: 5px 5px;*/
	}
	.save-content{
		width: 400px;
		height: 150px;
		background-color:#fff;
		border-radius: 5px;
		color: #333;
		position: relative;
	}
	.sum-income-list{
		margin:20px;
	}
	.sum-income-list li{
		display: inline-block;
		margin: 5px 0;
		margin-left: 20px;
	}
	.sum-income-list li label{
		display: inline-block;
		width:60px;
	}
	.sum-header-sub{
		font-size: 14px;
		color:#A5A5A5;
	}
	.sum-header{
		margin:20px 0;
		font-size: 20px;
		font-weight: bold;
	}
	.sum-income-content{
		width:300px;
		/*border: 1px solid #ddd;*/
		margin:0px auto;
	}
	.sum-income{
		flex-grow:1;
		border-right: 1px solid #282E3A;
		padding: 20px 0;
	}
	.sum-input{
		flex-grow:1.5;
		padding: 20px 0;
	}
	.sum-tab{
		background-color: #353B47;
		min-width: 1200px;
		display: flex;
		margin: 20px 0;
		position: relative;
	}
	.clacIncome-btn{
		position: absolute;
		bottom:20px;
		right: 100px;
	}
	.charts-section{
		margin: 10px 0;
		padding: 0px 20px;
	}
	.section-title{
		border-left: 3px solid #fff;
		padding-left: 5px;
		font-size: 16px;
		margin: 10px 0px;
		font-weight:bold;
	}
	.collectTitle{
    	/*border-bottom: 1px solid #282e3a ;*/
    	background-color: #353b47;
    	display: inline-block;
    	width: 49.9%;
  	}
  	.collectTitle li{
  		border-bottom: 1px solid #282e3a ;
  		/*display: inline-block;*/
  		/*width: 45%;*/
  	}
  .collectPFirst{
    line-height: 50px;
    font-weight: bold;
    font-size:18px;
    vertical-align: baseline;
  }
  .collectPThree{
    line-height: 40px;
    vertical-align: top;
    font-size: 14px;
    color: #959698;
  }
  .collectPThree span{
  	color: #fff;
  	font-size: 14px;
  }
  .collectPSecond{
    font-size: 60px ;
    color:#ffab00;
    line-height: 108px;
    font-weight: bold ;
    text-align: center
  }
  .unit{
  	font-size: 30px ;
    line-height: 108px;
    font-weight: bold;
  }
  .collectPSecondL{
    border-right:1px solid #282e3a;
    color:#01c0c8;
  }
  .collectPSecondR{
  	color:#ffab00;
  }
  .collectDiv{
    width:100%;
    padding-left:55px;
  }
  .collectDivRight{
    display: inline-block; width:49%; padding-left:55px;
  }
</style>
