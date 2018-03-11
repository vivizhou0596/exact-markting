<template>
	<div class="charts-content">
		<div class="charts-header">
			<span class="pull-left">{{chartsData.desc}}</span>
			<ul class="charts-year-tab">
				<li v-for = "(value,key) in chartsData.data" 
					:class="[value.isActive?'activeYear':'']"
					@click="toggleActiveYear(key)"
				>{{key}}年</li>
				<!-- <li >2018年</li> -->
			</ul>
			<span class="pull-right show-hide-icon " 
					style="margin-top:16px"
					:class="[isShowContent?'show-icon':'hide-icon']"
					@click="function(){ isShowContent = isShowContent?false:true}">
			</span>
		</div>
		<div style="min-width:1200px;" v-show="isShowContent">
			<div class="line-charts">
				<!-- <div :class="id" data-id="222">{{id}}</div> -->
		    	<div :id="id"  style="width:100%;height:280px;margin:0 auto"></div>
		    	<!-- <div :id="id"  style="width:100%;height:280px;margin:0 auto"></div> -->
		  	</div>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery'
	import echartBarLine from "../base/echarts-bar-line"
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	require('echarts/lib/chart/line')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	export default{
		//components:{echartBarLine},
		props:{
			chartsData:{
				type:Object,
				default:function(){
					return {
                    "desc":"收入",
                    "name":"fee",
                    "data":{
                        "2017":{
                            "isActive":true,
                            "id":"income2017",
                            "value":{
                                "users":{
                                    "desc":"累计参与用户",
                                    "value":[
                                        {"name":"1月","value":"74"},
                                        {"name":"2月","value":"54"},
                                        {"name":"3月","value":"45"},
                                        {"name":"4月","value":"62"},
                                        {"name":"5月","value":"74"},
                                        {"name":"6月","value":"84"},
                                        {"name":"7月","value":"97"},
                                        {"name":"8月","value":"33"},
                                        {"name":"9月","value":"74"},
                                        {"name":"10月","value":"70"},
                                        {"name":"11月","value":"54"},
                                        {"name":"12月","value":"50"}
                                    ]
                                },
                                "money":{
                                    "desc":"当月投入",
                                    "value":[
                                        {"name":"1月","value":"74"},
                                        {"name":"2月","value":"54"},
                                        {"name":"3月","value":"45"},
                                        {"name":"4月","value":"62"},
                                        {"name":"5月","value":"74"},
                                        {"name":"6月","value":"84"},
                                        {"name":"7月","value":"97"},
                                        {"name":"8月","value":"33"},
                                        {"name":"9月","value":"74"},
                                        {"name":"10月","value":"70"},
                                        {"name":"11月","value":"46"},
                                        {"name":"12月","value":"76"}
                                    ]
                                }
                            }
                        },
                        "2018":{
                            "isActive":false,
                            "id":"income2018",
                            "value":{
                                "users":{
                                    "desc":"累计参与用户",
                                    "value":[
                                        {"name":"1月","value":"74"},
                                        {"name":"2月","value":"54"},
                                        {"name":"3月","value":"45"},
                                        {"name":"4月","value":"62"},
                                        {"name":"5月","value":"74"}
                                    ]
                                },
                                "money":{
                                    "desc":"当月投入",
                                    "value":[
                                        {"name":"1月","value":"74"},
                                        {"name":"2月","value":"54"},
                                        {"name":"3月","value":"45"},
                                        {"name":"4月","value":"62"},
                                        {"name":"5月","value":"74"}
                                    ]
                                }
                            }
                        }
                    }
                }
				}
			}
		},
		computed:{
			barLineData(){
				return this.tempData.data[this.activeYear]
			},
			id(){ return this.barLineData.id },
		    xAxis(){
		    	let value = this.barLineData.value
		        let arr = []
		        this.barLineData.value.users.value.forEach((elem,index)=>{
		          arr.push(elem.name)
		        });
		        return  arr
		    },
		    chartsdata(){ return this.barLineData.value},
		    unit(){
		    	let str = ''
		    	switch (this.chartsData.name) {
		    		case 'retention': str ='%'; break;
		    		default:str = '万'; break;
		    	}
		    	return str
		    }
		},
		data(){
			return{
				activeYear:'2017',
				tempData:{},
				isShowContent:true
			}
		},
		created(){
			this.tempData = this.chartsData
			for(let i in this.tempData.data){
				if(this.tempData.data[i].isActive){
					this.activeYear = i+''
				}
			}
		},
		mounted(){
			this.$nextTick(function () {//异步更新队列，回调函数在 DOM 更新完成后就会调用
			/*不知道vue里存在什么bug，直接调用this.drawLine()，会有一个dom非法的报错，所以使用异步更新队列在dom更新完成后调用渲染方法*/
		        this.drawLine();//渲染图表
		    })
			//this.drawLine();//渲染图表
			
		},
		watch:{
			chartsData:{
				handler(newValue, oldValue) {
					this.tempData = newValue
					//console.log(this.activeYear)
					for(let i in this.tempData.data){
						if(this.tempData.data[i].isActive){
							this.activeYear = i+''
						}
					}
					this.$nextTick(function () {//异步更新队列，回调函数在 DOM 更新完成后就会调用
					//不知道vue里存在什么bug，直接调用this.drawLine()，会有一个dom非法的报错，所以使用异步更新队列在dom更新完成后调用渲染方法
				        this.drawLine();//渲染图表
				    })
		　　　　},
	　　　　	deep: true
			}
		},
		methods:{
			toggleActiveYear(year){
				this.activeYear = year
				for(let i in this.tempData.data){
					this.tempData.data[i].isActive = false
				}
				this.tempData.data[year].isActive = true
			},
			drawLine() {
		      // 基于准备好的dom，初始化echarts实例
		      let myChart = echarts.init(document.getElementById(this.id))
		      // 绘制图表
		      var myChartOption = {
		        grid: {
		          bottom:20,
		          containLabel: true
		          // left:'10%',
		          // right:50,
		        },
		        color:['#4684E9','#01c0c8','#FFAB00'],
		        legend:{
		          orient:'horizontal',
		          left:100,
		          itemWidth:14,
		          data:[
		          		{name:this.chartsdata.monTrend&&this.chartsdata.monTrend.desc,
		          		 icon:'rect',
		          		 textStyle:{color:'#f7f7f7'}},
		                {name:this.chartsdata.users.desc,icon:'rect',textStyle:{color:'#f7f7f7'}},
		                {name:this.chartsdata.money.desc,textStyle:{color:'#f7f7f7'}},
		              ]
		        },
		        xAxis: {
		          type: 'category',
		          //max:120,
		          boundaryGap:0,
		          axisLabel: { margin:20,interval:0, textStyle:{fontSize:14,color:'#959698'} },
		          axisLine: { show: true,lineStyle:{color:'#6C727D'} }, // X轴线默认true
		          axisTick: { show: false }, //坐标刻度默认显示true
		          splitLine: { show: false }, //取消与X轴平行的标准线
		          //data: ["201701", "201702", "201703", "201704", "201705", "201706"]
		          data:this.xAxis
		        },
		        yAxis:[
		          {
		            //name:'人',
		            //max:this.getMaxNum.users,
		            position:'left',
		            nameTextStyle:{color:'#fff'},
		            type: 'value',
		            axisLabel: { show:false,margin:0,interval:0, textStyle:{ fontSize:14,color:'#fff'} },
		            axisLine: { show: false }, // y轴线默认true
		            axisTick: { show: false }, //坐标刻度默认显示true
		            splitLine: { show: false }, //取消与X轴平行的标准线
		          },
		          {
		           // name:'元',
		           // max:this.getMaxNum.money,
		            position:'right',
		            nameTextStyle:{color:'#fff'},
		            type: 'value',
		            axisLabel: { show:false,margin:10,interval:0, textStyle:{ fontSize:14,color:'#fff'} },
		            axisLine: { show: false }, // y轴线默认true
		            axisTick: { show: false }, //坐标刻度默认显示true
		            splitLine: { show: false }, //取消与X轴平行的标准线
		          },
		        ] ,
		        series: [{
		          name: this.chartsdata.monTrend&&this.chartsdata.monTrend.desc,
		          yAxisIndex:0,
		          type: 'bar',
		          barWidth:20,
		          areaStyle: {normal: {opacity:0.2}},
		          symbol: 'diamond',
		          symbolSize:4,
		          smooth:true,
		          label: {
		            normal: {
		              position: "inside",
		              show: true,
		              textStyle: {
		                color: '#f7f7f7',
		                fontSize:10,
		                fontWeight:200,
		              },
		              formatter: function(obj) {
		                return obj.value+'万';
		              }
		            }
		          },
		          //data: [5, 30, 36, 60, 20, 90]
		          data:this.chartsdata.monTrend&&this.chartsdata.monTrend.value
		        },
		        {
		          name: this.chartsdata.users.desc,
		          yAxisIndex:0,
		          type: 'bar',
		          barWidth:20,
		          areaStyle: {normal: {opacity:0.2}},
		          symbol: 'diamond',
		          symbolSize:4,
		          smooth:true,
		          label: {
		            normal: {
		              position: "inside",
		              show: true,
		              textStyle: {
		                color: '#f7f7f7',
		                fontSize:10,
		                fontWeight:200,
		              },
		              formatter: function(obj) {
		                return obj.value+'万';
		              }
		            }
		          },
		          //data: [5, 30, 36, 60, 20, 90]
		          data:this.chartsdata.users.value
		        },{
		          name:this.chartsdata.money.desc,
		          type: 'line',
		          yAxisIndex:1,
		          //areaStyle: {normal: {opacity:0.2}},
		          // barWidth: 10,
		          symbol: 'circle',
		          symbolSize:4,
		          smooth:true,
		          label: {
		            normal: {
		              //position: "bottom",
		              position: "top",
		              show: true,
		              textStyle: {
		                color: '#f7f7f7',
		                fontSize:10,
		                fontWeight:200,
		              },
		              formatter: (obj)=>{
		                return obj.value+this.unit;
		              }
		            }
		          },
		          //data: [5, 60, 76, 50, 90, 70]
		          data:this.chartsdata.money.value
		        }
		        ]
		      }
		      myChart.setOption( myChartOption );
		    }
		},

	}
</script>
<style scoped>
	.activeYear{
		color: #01c0c8;
	}
	.charts-content{
		background-color: #353B47;
		margin-bottom: 20px;
	}
	.charts-header{
		height: 40px;
		border-bottom: 1px solid #2B313D;
		line-height: 40px;
		padding: 0px 30px;
	}
	.charts-year-tab{
		display: inline-block;
		margin-left: 20px;
	}
	.charts-year-tab>li{
		display: inline-block;
		font-size: 12px;
		padding: 0 10px;
		cursor: pointer;
	}
	.line-charts{
	    margin-top:20px;
	}
</style>