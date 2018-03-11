<template>
	<div class="cheeck-contioner" id="#check-content">
		<div class="title">
			<a class="pull-left check-back" @click="goback" key="addBack"></a>
			<div class="title-top">用户群洞察结果</div>
			<ul class="title-list">
				<li class="title-content">
					<h4><span>{{targetUser}}</span>人</h4>
					<p class="text-over" style="width:100px;margin:0 auto" :title="targetUserName">{{targetUserName}}</p>
				</li>
				<li><img src="../common/img/vs.png" alt=""></li>
				<li class="title-content check-filter" @click="getCompareUser()">
				<h4><span>{{allUser}}</span>人</h4>
					<p class="text-over" style="width:100px;margin:0 auto" :title="allUserName">{{allUserName}}</p>
				</li>
			</ul>
			<!-- <a class="pull-right check-filter" @click="()=>{isShowfilter=true}" key="addFilter"></a> -->
		</div>
		<div class="charts-list" v-show="!isShow">
			<!-- <div class="bisc-line"></div> -->
			<div class="bisc">
				<div class="bisc-content" ref="basic">
					<!--  用户基础分析  -->
					<div class="bisc-title-text">
						<img src="../common/img/check/besic.png" alt="" class="bisc-title-img">
						<ul class="bisc-title-content">
							<li class="title-zh" style="color:#27A5EF">用户基础分析</li>
							<li class="title-en">USER BASE ANALYSIS</li>
						</ul>
					</div>
					<div class="component-content" >
						
						<component
					  	v-for="(item, index) in biscData"
						:is="getComp(item)"
						:key="item.thirdName"
						:data = "item"
						:allUserName = "allUserName"
					>
					</component>
					</div>
				</div>
				<!--  消费特征分析 -->
				<div class="consumption" ref="consumption" style="background-color:rgba(44,51,62,0.3)">
					<div class="bisc-title-text">
						<img src="../common/img/check/consum.png" alt="" class="bisc-title-img">
						<ul class="bisc-title-content">
							<li class="title-zh" style="color:#00fbff">消费特征分析</li>
							<li class="title-en">ANALYSIS OF CONSUMPION</li>
						</ul>
					</div>
					<!-- <h4 class="bisc-title-text">消费特征分析</h4> -->
					<div class="component-content">
						<component
						  	v-for="(item, index) in consumption"
							:is="getComp(item)"
							:key="item.thirdName"
							:data = "item"
							:allUserName = "allUserName"
						>
						</component>
					</div>
				</div>
				<!--  通信特征分析 -->
				<div class="padTp100" ref="communication">
					<div class="bisc-title-text">
						<img src="../common/img/check/corre.png" alt="" class="bisc-title-img">
						<ul class="bisc-title-content">
							<li class="title-zh" style="color:#fbf700">通信特征分析</li>
							<li class="title-en">CORRESPONDENCE ANALYSIS</li>
						</ul>
					</div>
					<div class="component-content">
						<component
						  	v-for="(item, index) in communication"
							:is="getComp(item)"
							:key="item.thirdName"
							:data = "item"
							:allUserName = "allUserName"
						>
						</component>
					</div>
				</div>
				<!-- 流量特征分析 -->
				<div ref="surf" style="background-color:rgba(44,51,62,0.3)">
					<div class="bisc-title-text">
						<img src="../common/img/check/traffic.png" alt="" class="bisc-title-img">
						<ul class="bisc-title-content">
							<li class="title-zh" style="color:#00fdfe">流量特征分析</li>
							<li class="title-en">TRNFFIC ANALYSIS</li>
						</ul>
					</div>
					<div class="component-content">
						<component
						  	v-for="(item, index) in surf"
							:is="getComp(item)"
							:key="item.thirdName"
							:data = "item"
							:allUserName = "allUserName"
						>
						</component>
					</div>
				</div>
				<!-- 上网偏好分析 -->
				<div class="net-preference" ref="preference">
					<div class="bisc-title-text">
						<img src="../common/img/check/internet.png" alt="" class="bisc-title-img">
						<ul class="bisc-title-content">
							<li class="title-zh" style="color:#ffeb70">上网偏好分析</li>
							<li class="title-en">INTERNET PREFERRENCE ANALYSIS</li>
						</ul>
					</div>
					<div class="component-content">
						<component
						  	v-for="(item, index) in preference"
							:is="getComp(item)"
							:key="item.thirdName"
							:data = "item"
							:allUserName = "allUserName"
						>
						</component>
					</div>
				</div>
			</div>
		</div>
		<div class="catalog" >
			<ul class="cata-list" ref="cateList" @click="menuScroll">
				<li class="cata-item basic active"><a><span class="cata-icon"></span>基础属性分析</a></li>
				<li class="cata-item consumption"><a><span class="cata-icon"></span>消费特征分析</a></li>
				<li class="cata-item communication"><a><span class="cata-icon"></span>通信特征分析</a></li>
				<li class="cata-item surf"><a><span class="cata-icon"></span>流量特征分析</a></li>
				<li class="cata-item preference"><a><span class="cata-icon"></span>上网偏好分析</a></li>
			</ul>
			<div class="save" @click="toSave"  title="导出对比结果"  style="cursor:pointer"><img src="../common/img/save.png" alt="导出" ></div>
			<div class="to-top" @click="toBisc" title="回到顶部" style="cursor:pointer"><img src="../common/img/toTop.png" alt="回到顶部"></div>
		</div>
		<div class="footer"></div>
		<my-dialog :is-show="isShow" >
			<div class="check-calamodal"><span>正在加载页面，请稍等</span><img src="../common/img/timg2.gif" ></div>
		</my-dialog>
		<my-dialog :is-show="isShowfilter" >
			<filter-batch  @on-change="togbatchMod($event)" :comTabData="comTabData" :meTabData="meTabData"></filter-batch>
		</my-dialog>
		<my-dialog :is-show="isShowDown" >
			<div class="check-calamodal"><span>PDF文件正在渲染中，请稍等...</span><img src="../common/img/timg2.gif" ></div>
		</my-dialog>
	</div>
</template>
<script>
	import message from 'vue-multiple-message'
	import myDialog from '../components/base/dialog'
	import echartsVueBar from '../components/base/echarts-vueBar'
	import echartsBreadPie from '../components/base/echarts-breadPie'
	import echartsLine from '../components/base/echarts-line'
	import echartsPie from '../components/base/echarts-pie'
	import singleBar from '../components/base/single-bar'
	import textBar from '../components/base/text-bar'
	import appLeftbar from '../components/base/app-leftbar'
	import appRightbar from '../components/base/app-rightbar'
	import genBar from '../components/base/gen-bar'
	import echartsBar from '../components/base/echarts-bar'
	import echartsDubleBar from '../components/base/echarts-duble-bar'
	import filterBatch from '../components/filter-batch'
	import {getCompareData,getCompareUser} from 'api/targets'
	import {checkData} from '../common/js/checkData'
	import axios from 'axios'
	//import {downPdf} from "../common/js/public"
	var html2canvas = require("../common/js/html2canvas.js")
	var jsPDF = require("../common/js/jsPdf.debug.js")
	var pdf =null
const genderBar ={//性别柱图
	name:'gender-bar',
	props:['data'],
	computed:{
		titleTag(){
			if(this.data.secondId.slice(0,1)=='1'){
				return 'bg-blue'
			}
		}
	},
	template:`
			<div class="component-box">
				<p class="title-table title-table-center" :class="titleTag"><span class="title-cell">性别比例</span></p>
				<div class="chart-content">
					<gen-bar :targetData="data && data.data.target" :allData="data && data.data.all"></gen-bar>
				</div>
			</div>
	`,
	components: {
		genBar
	},
	mounted(){
		//console.log(this.data,this.titleTag)
	}
}
const breadPie = {
	name:'bread-pie',
	props:['data'],
	template:`
		<div class="component-box">
			<h4 class="bisc-title-text clearfix" v-if="data.secondShow">{{data.secondName}}</h4>
			<p class="title-table title-table-center bg-blue"><span class="title-cell">{{data && data.thirdName}}</span></p>
			<div class="chart-content">
				<div class="chart-content-half">
					<echarts-breadPie :forPieData = "data.data.target"></echarts-breadPie>
				</div>
				<div class="chart-content-half">
					<echarts-breadPie :forPieData = "data.data.all"></echarts-breadPie>
				</div>
			</div>
		</div>
	`,
	components:{
		echartsBreadPie
	},
	mounted(){
		//console.log(this.data)
	}
}
const verticalBars={
	name:'vertical-bars',
	props:['data'],
	template:`
		<div class="component-box">
			<h4 class="bisc-title-text clearfix" v-if="data.secondShow">{{data.secondName}}</h4>
			<p class="title-table title-table-center bg-blue" ><span class="title-cell">{{data && data.thirdName}}</span></p>
			<div class="chart-content">
				<div class="chart-content-half">
					<echarts-vueBar :forBarData = "data.data.target" :xAixs="data.data.xaxis" :num="data.thirdId" :unit="data.data.unit"></echarts-vueBar>
				</div>
				<div class="chart-content-half">
					<echarts-vueBar :forBarData = "data.data.all" :xAixs="data.data.xaxis" :num="data.thirdId" :unit="data.data.unit"></echarts-vueBar>
				</div>
			</div>
		</div>
	`,
	components:{
		echartsVueBar
	},
	mounted(){
		//console.log(this.data)
	}
} 
const nomalPie = {
	name:'nomal-pie',
	props:['data'],
	template:`
		<div class="component-box">
			<h4 class="bisc-title-text clearfix" v-if="data.secondShow">{{data.secondName}}</h4>
			<p class="title-table title-table-center bg-blue"><span class="title-cell">{{data && data.thirdName}}</span></p>
			<div class="chart-content">
				<div class="chart-content-half">
					<echarts-pie :forPieData="data.data.target"></echarts-pie>
				</div>
				<div class="chart-content-half">
					<echarts-pie :forPieData="data.data.all"></echarts-pie>
				</div>
			</div>
		</div>
	`,
	components:{
		echartsPie
	},
}
const singlebarComp = {
	name:'singlebar-comp',
	props:['data'],
	computed:{
		titleTag(){
			let sedId = this.data.secondId.slice(0,1)
			let bgImg  = ''
			switch(sedId){
				case '2': bgImg = 'bg-green';break;
				case '3': bgImg = 'bg-yellow'; break;
				case '4': bgImg = 'bg-green2'; break;
				default: bgImg = 'bg-blue'
			}
			return bgImg
		}
	},
	template:`
			<div class="component-box" style="margin-bottom:20px">
				<h4 class="title-table title-table-top" :class="titleTag" v-if="data.secondShow">{{data.secondName}}</h4>
				<p class="title-table title-table-top" :class="titleTag" v-if="!data.secondShow"><span class="title-cell">{{data.thirdName}}</span></p>
				<div class="chart-content">
					<single-bar :barData="data.data" :uint="data.uint" :sedId="data.secondId" :title="data.thirdName"></single-bar>
				</div>
			</div>
	`,
	components:{
		singleBar
	},
	mounted(){
		//console.log(this.titleTag)
	}
}
const chartLine = {
	name:'chart-line',
	props:['data','allUserName'],
	computed:{
		titleTag(){
			let sedId = this.data.secondId.slice(0,1)
			let bgImg  = ''
			switch(sedId){
				case '2': bgImg = 'bg-green';break;
				case '3': bgImg = 'bg-yellow'; break;
				case '4': bgImg = 'bg-green2'; break;
				default: bgImg = 'bg-blue'
			}
			return bgImg
		},
		showTitle(){
			if(this.data.secondId.slice(0,1)=='3'|| (this.data.secondId.slice(0,1)=='4' && this.data.secondShow)){
				return false
			}else{
				return true
			}
		}
	},
	template:`
		<div class="component-box">
			<h4 class="title-table title-table-top test" :class="titleTag" v-if="data.secondShow" >{{data.secondName}}</h4>
			<p class="title-table title-table-top" :class="titleTag" v-if="showTitle" ><span class="title-cell">{{data.secondName}}</span></p>
			<div class="chart-content">
				<echarts-line :allUserName="allUserName" :forLineData="data.data" :id="data.thirdId" :uint="data.uint" :title="data.thirdName"></echarts-line>
			</div>
		</div>
	`,
	components:{
		echartsLine
	},
	mounted(){
		//console.log(this.data)
	}
}
const textbarComp ={
	name:'textbar-comp',
	props:['data'],
	template:`
		<div class="component-text-bar">
			<text-bar   :barData="data.data" :uint="data.uint" :sedId="data.secondId"></text-bar>
		</div>
	`,
	components:{
		textBar
	},
	updated(){
		//console.log(this.data)
	}
}
const appbarComp ={
	name:'appbar-comp',
	props:['data'],
	template:`
		<div class="component-box" style="height:700px;">
			<p class="title-table title-table-top bg-org" ><span class="title-cell">{{data.thirdName}}</span></p>
			<div class="chart-content">
				<div class="app-bar-content" >
					<div class="chart-content-half">
						<app-leftbar v-for="item in data.data.target.value" :barData="item" :key="item.divid"></app-leftbar>
					</div>
					<div class="chart-content-half">
						<app-rightbar v-for="item in data.data.all.value" :barData="item" :key="item.divid"></app-rightbar>
					</div>
				</div>
			</div>
		</div>
	`,
	components:{
		appLeftbar,
		appRightbar
	},
}
const echartsDbbar = {
	name:'echarts-dbbar',
	props:['data','allUserName'],
	template:`
		<div class="component-box">
			<h4 class="bisc-title-text clearfix" v-if="data.secondShow">{{data.secondName}}</h4>
			<p class="title-table title-table-center bg-blue"><span class="title-cell">{{data && data.thirdName}}</span></p>
			<div class="chart-content">
				<echarts-duble-bar :allUserName="allUserName" :forBarData="data.data" :id="data.thirdId" :uint="data.uint" :title="data.thirdName"></echarts-duble-bar>
			</div>
		</div>
	`,
	components:{
		echartsDubleBar
	}
}
const echartsSigxBar = {
	name:'echarts-sigx-bar',
	props:['data','allUserName'],
	template:`
		<div class="component-box">
			<h4 class="bisc-title-text clearfix" v-if="data.secondShow">{{data.secondName}}</h4>
			<p class="title-table title-table-center bg-blue"><span class="title-cell">{{data && data.thirdName}}</span></p>
			<div class="chart-content">
				<echarts-bar :allUserName="allUserName" :forBarData="data.data" :id="data.thirdId" :uint="data.uint" :title="data.thirdName"></echarts-bar>
			</div>
		</div>
	`,
	components:{
		echartsBar
	},
	mounted(){
		//console.log(this.data)
	}
}
	export default{
		components:{
			myDialog,
			genderBar,
			breadPie,
			verticalBars,
			nomalPie,
			singlebarComp,
			chartLine,
			textbarComp,
			appbarComp,
			filterBatch,
			echartsDbbar,
			echartsSigxBar
		},
		data(){
			return {
				isShow:true,
				targetUser:0,//目标用户群数量
				allUser:0,//全网用户群数量
				targetUserName:'',//目标用户群名称
				allUserName:'选中用户',//右侧名称
				batchId:'',
				compareId:'0',
				fromPath:'',
				offsetTops: {
					basic: 0,
					consumption: 0,
					communication: 0,
					surf: 0,
					preference: 0
				},
				biscData:[],//基础属性
				consumption:[],//消费
				communication:[],//通信
				surf:[],//流量
				preference:[],//上网偏好
				isShowfilter:false,//选择对比用户群
				isShowDown:false,
				comTabData:[],
				meTabData:[]
			}
		},
		methods: {
			getCompareUser(){//点击页面获取对比用户群的按钮
				getCompareUser(this.batchId).then(({resultCode, resultContent})=>{
					//console.log(resultContent)
					if( resultCode == '001'){
			   			this.isShowfilter = true
			   			document.body.style.overflow = 'hidden'
			   			this.comTabData = resultContent.sysCommandUsers
			   			this.meTabData  = resultContent.mytargetUsers
			   		}else{
			   			message.error('对比用户群获取失败，请稍后重试')
			   			//console.log( resultContent )
			   		}
				}).catch((err)=>{
				    	message.error('数据请求失败，请稍后重试')
				})
			},
			togbatchMod(data){//选中对比用户群后的操作
				if(data.type == 'submit'){
					if(!data.val.batchId){
						message.warning('请选择要对比的用户群')
						return
					}
					this.isShowfilter = false
					document.body.style.overflow = 'auto'
					sessionStorage.setItem("compareId", data.val.batchId) //将新的值存入缓存
					this.compareId = sessionStorage.getItem("compareId") //从缓存中去值
					//console.log(this.compareId)
					getCompareData(this.batchId,this.compareId).then(({resultCode, resultContent}) => {
						this.mountedPage(resultCode,resultContent) // 传入参数调用页面渲染函数
						window.location.reload()//更新数据后要刷新页面
				    }).catch((err)=>{
				    	message.error('数据请求失败，请稍后重试')
				    })
				}else{
					this.isShowfilter = false
					document.body.style.overflow = 'auto'
				}
			},
			goback(){
				if( this.fromPath == '/upload' ){
					this.$router.push({
						path: '/index'
					})
				}else{
					this.$router.go(-1)
				}
			},
			getComp(item) { // 得到欲渲染的子组件类型
				const type = item.chartType
				switch (type) {
					case '8': return 'gender-bar'; break;
					case '3': return 'bread-pie'; break;
					case '4': return 'vertical-bars'; break;
					case '2': return 'nomal-pie'; break;
					case '7': return 'singlebar-comp'; break;
					case '1': return 'chart-line'; break;
					case '5': return 'textbar-comp'; break;
					case '6': return 'appbar-comp'; break;
					case '9': return 'echarts-dbbar'; break;
					case '10': return 'echarts-sigx-bar'; break;
					default: return '' ;break;
				}
			},
			menuScroll(e){
				let ref = e.target.parentNode.className.split(' ')[1]
				if(!ref){
					return
				}
				document.body.scrollTop = this.offsetTops[ref]
				if(document.body.scrollTop == 0){
					document.documentElement.scrollTop = this.offsetTops[ref]
				}
			},
			toBisc(){
				document.body.scrollTop =10
				if(document.body.scrollTop == 0){
					document.documentElement.scrollTop = 10
				}
			},
			toSave(){
				this.isShowDown = true
				window.scrollTo(0,0)
				this.downPdf()//将页面转换成pdf 的方法
			},
			calcOffsetTop(elem) {
				let t = 0, curElem = elem
				do {
					t += curElem.offsetTop
					curElem = curElem.offsetParent
				} while (curElem)
				return t
			},
			removeClass(elem, clsName) {
				const toString = Object.prototype.toString
				// 如果是HTMLCollection
				if (toString.call(elem) === '[object HTMLCollection]') {
					Array.prototype.forEach.call(elem, item => {
						let allClass = item.className.split(' ')
						allClass = allClass.filter(clsItem => {
							return clsItem !== clsName
						})
						item.className = allClass.join(' ')
					})
				} else if (elem instanceof HTMLElement) { // 如果是单个元素
					let allClass = elem.className.split(' ')
					allClass = allClass.filter(clsItem => {
						return clsItem !== clsName
					})
					elem.className = allClass.join(' ')
				} else {
					return false
				}
			},
			addClass(elem, clsName) {
				if (!elem.className.includes(clsName)) {
					elem.className = elem.className + ' ' + clsName
				}
			},
			scrollHandler(event) {
  				const context = this, cateList = context.$refs.cateList, innerHeight = window.innerHeight
				// 计算并存储索引部分的 offsetTop 到 data 的状态里
				const offsetTopRefs = ['basic', 'consumption', 'communication', 'surf', 'preference'] // 注意这里的顺序很重要，因为乱序的话会导致找正确的当前激活区域出错

				const curTop = document.body.scrollTop || document.documentElement.scrollTop
				let activeRef
				let activeRefNext = offsetTopRefs.findIndex(ref => {
					return curTop + innerHeight / 2 < context.offsetTops[ref]
				})
				if (activeRefNext === -1) {
					activeRefNext	= offsetTopRefs.length
				}
				activeRef = offsetTopRefs[activeRefNext - 1]
				if (activeRef) {
					context.removeClass(cateList.children, 'active')
					context.addClass(cateList.querySelector(`.${activeRef}`), 'active')
				} else {
					context.removeClass(cateList.children, 'active')
					context.addClass(cateList.querySelector('.basic'), 'active')
				}
			},
			mountedPage( resultCode, resultContent ){
				if(resultCode == '001'){
						this.allUser = resultContent.allUser
						this.targetUser = resultContent.targetUser
						this.targetUserName = resultContent.targetUserName
			            this.allUserName = resultContent.allUserName
						let checkData = resultContent.data
						for(let i=0; i < checkData.length; i++){
				   			if(checkData[i].indexUp.indexId == "1000000"){
				   				this.biscData = checkData[i].indexValue
				   			}else if(checkData[i].indexUp.indexId == "2000000"){
				   				this.consumption = checkData[i].indexValue
				   			}else if(checkData[i].indexUp.indexId == "3000000"){
				   				this.communication = checkData[i].indexValue
				   			}else if(checkData[i].indexUp.indexId == "4000000"){
				   				this.surf = checkData[i].indexValue
				   			}else if(checkData[i].indexUp.indexId == "5000000"){
				   				this.preference = checkData[i].indexValue
				   			}
				   		}
					}else if(resultCode == '009') {
			        	this.$router.push({
			        		path:'./fail',
			        		name:'fail',
			        		params:{msg:resultContent}
			        	})
			        }else{
						message.error(resultContent)
						return
		      		}
			},
			downPdf(){//将页面保存成pdf的方法
				var context = this
			      html2canvas(document.body, {
			      onrendered:function(canvas) {
			          var contentWidth = canvas.width;
			          var contentHeight = canvas.height;
			          //一页pdf显示html页面生成的canvas高度;
			          var pageHeight = contentWidth / 592.28 * 841.89;
			          //未生成pdf的html页面高度
			          var leftHeight = contentHeight;
			          //pdf页面偏移
			          var position = 0;
			          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
			          var imgWidth = 595.28;
			          var imgHeight = 592.28/contentWidth * contentHeight;

			          var pageData = canvas.toDataURL('image/jpeg', 1.0);

			          pdf = new jsPDF('', 'pt', 'a4');
			          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
			          //当内容未超过pdf一页显示的范围，无需分页
			          if (leftHeight < pageHeight) {
			              pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
			          } else {
			              while(leftHeight > 0) {
			                  pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
			                  leftHeight -= pageHeight;
			                  position -= 841.89;
			                  //避免添加空白页
			                  if(leftHeight > 0) {
			                      pdf.addPage();
			                  }
			              }
			          }
			          if (pdf!=null) {
			            //console.log('本组件的pdf渲染完成')
			            context.isShowDown = false
			            pdf.save('result.pdf');
			          }
			          
			      }
			  })
			}
		},
		mounted(){
			const params = this.$route.params
			if(params.batchId){
				sessionStorage.setItem("compareId",'0')
				sessionStorage.setItem("batchId", params.batchId) 
			}
			this.batchId = sessionStorage.getItem("batchId")
			this.compareId = sessionStorage.getItem("compareId")
			let batchId = this.batchId
			getCompareData(batchId,this.compareId).then(({resultCode, resultContent}) => {
				//console.log(resultCode)
				this.mountedPage(resultCode,resultContent) // 传入参数调用页面渲染函数
		    }).catch((err)=>{
		    	message.error('数据请求失败，请稍后重试')
		    })
		 	// 为窗口滚动添加事件，实时计算当前进入的是哪部分
		    document.addEventListener('scroll', this.scrollHandler, false)
		},
		beforeRouteEnter(to, from, next) {
			// console.log(from)
			// alert( from )
			next(vm=>{
				vm.fromPath = from.path
			})
		},
		updated() {//因为数据是动态追加，所以要在更改后再获取页面DOM定位情况
			this.isShow = false
			const context = this, cateList = context.$refs.cateList, innerHeight = window.innerHeight
			// 计算并存储索引部分的 offsetTop 到 data 的状态里
			const offsetTopRefs = ['basic', 'consumption', 'communication', 'surf', 'preference'] // 注意这里的顺序很重要，因为乱序的话会导致找正确的当前激活区域出错
			offsetTopRefs.forEach(ref => {
				context.offsetTops[ref] = context.calcOffsetTop(context.$refs[ref])
			})
		},
		beforeDestroy() {
			document.removeEventListener('scroll', this.scrollHandler, false)
		}
	}
</script>
<style >
.check-filter{
	background: url('../common/img/check/filter.png') 240px 30px no-repeat;
	cursor:pointer;
}
.check-calamodal{
	width: 500px;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px 20px;
    text-align: center;
    color: #333;
}
.check-calamodal span{
	vertical-align:text-bottom;
	margin-right: 10px;
	font-size: 14px;
}
.check-back{
	width: 40px;
	height: 40px;
	background-image: url('../assets/imgs/back.png');
	background-size: 40px 40px;
	background-position: center;
	background-repeat: no-repeat;
	display: inline-block;
	cursor: pointer;
	position:absolute;
	top:40px;
	left: 60px;
	margin-top: 10px;
}
.component-content{
	padding-top:50px;
}
.component-box{
	height:340px;
	position: relative;
}
.bisc-title-text{
		height:60px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-left: 40px;
		padding-top:40px;
	}
.bisc-title-img{
	width:60px;
	height:60px;
	border-right:2px solid #fff;
	padding-right: 8px;
	margin-right: 10px;
}
.title-zh{
	font-size:28px;
	font-weight: 500;
	padding-bottom: 10px;
}
.title-en{
	font-size: 12px;
	color: #fff;
}
.chart-content{
	width:90%;
	display: flex;
	justify-content: space-around;
}
.bar-content{
		height: 180px;
		position: relative;
		z-index: 50;
		padding-top: 50px;
	}
.app-bar-content{
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
}
.title-table{
	font-size:16px;
	display: table;
	width:85%;
	height:50px;
	line-height:50px;
	margin:0 auto;
	background-size: 100% 100%;
	padding-left:60px;
	background-repeat: no-repeat;
}
.bg-blue{
	background-image:url(../common/img/check/blue-title.png);
}
.bg-green{
	background-image:url(../common/img/check/green-title.png);
}
.bg-yellow{
	background-image:url(../common/img/check/yellow-title.png);
}
.bg-green2{
	background-image:url(../common/img/check/green2-title.png);
}
.bg-org{
	background-image:url(../common/img/check/org-title.png);
}
.title-cell{
	display: table-cell;
	vertical-align: middle;
}
.title-table-center{
	/*top: 60%;
	left: 50%;
	transform: translate(-50%,-50%);*/
}
.title-table-top{
	/*left: 50%;
	top:20%;
	transform: translate(-50%,0);*/
}
.net-preference{
	position: relative;
}
.app-component-content{
	position: absolute;
	top:50px;
}
.component-text-bar{
	position: relative;
	z-index: 50;
	padding:1px;
	width:90%;
}
.footer{
	width:100%;
	height:40px;
	position:fixed;
	bottom:0;left:0;
	z-index:50;
	/*background-color:#0a1022;*/
}

	.cheeck-contioner{
		width: 100%;
		background-color: #0a1022;

	}
	.charts-list{
		/*width:1200px;*/
		/*height: 2200px;*/
		margin:0px auto;
		margin-top: 104px;
		padding-top: 20px;
		position: relative;
		overflow: hidden;
		/*border:1px solid #f00;*/
	}
	.catalog{
		position: fixed;
		top:200px;
		right:0px;
		z-index: 50;
		margin-right:10px;
	}

	.cata-item{
		width:120px;
		height: 30px;
		font-size:16px;
	}
	.cata-item>a{
		cursor:pointer;
	}
	.cata-icon{
		display: inline-block;
		width: 5px;
		height: 5px;
		background-color: #fff;
		border-radius:50%;
		margin-right:10px; 
	}
	.active{
		color:  #3badff;
	}
	.active span{
		background-color: #3badff;
	}
	.title{
		height: 104px;
		width: 100%;
		margin:0px auto;
		background: url(../common/img/check-title.png) #0a1022;
		background-size: 100% 100%;
		position: fixed;
		top: 0px;
		left:50%;
		transform: translate(-50%,0);
		z-index: 200;
	}
	.title-top{
		height: 40px;
		text-align: center;
		line-height: 40px;
	}
	.title-list{
		height: 64px;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.title-list li{
		width: 320px;
		text-align: center;
	}
	.title-content{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.title-content span{
		color: #fbff00;
		font-size: 24px;
		padding:0 5px;
	}
	.title-content h4{
		color: #5dcce2;
		padding-bottom:5px;
	}
	.to-top{
		margin-top:10px;
	}
	/* === 图形列表 === */
	.bisc{
		width: 100%;
	}
	.bisc-content{
		position: relative;
	}
	
	.bisc-line{
		height: 100%;
		width: 1px;
		height: 100%;
		position: absolute;
		top:40px;
		left: 50%;
		background-color: #fff;
		z-index: 10;
	}
	.chart-item{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 260px;
		width: 100%;
	}
	.chart-itemTp{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 320px;
		width: 100%;
	}
	.chart-item-single{
		position: relative;
		text-align: center;
		height: 260px;
		width: 100%;
		z-index: 50;
		/*background-color: #0a1022;*/
	}
	.chart-item-single1{
		position: relative;
		text-align: center;
		height:360px;
		width: 100%;
		z-index: 50;
	}
	.chart-item-single .bisc-titles-top,.chart-item-single1 .bisc-titles-top{
		/*display: inline-block;*/
		display:table;
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
	.chart-item-gen{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin:10px 0;
	}
	.chart-item-genAll{
		justify-content: flex-end;
	}
	/*.chart-item-gen-content{
		width: 500px;
	}*/
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
		margin:0 auto;
		position: relative;
	}
	
</style>