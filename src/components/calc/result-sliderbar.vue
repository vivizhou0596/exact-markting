<template>
	<div class="slidebar">
		<ul class="year-tab">
			<li
				v-for="(value,key) in barDataObj"
				:class="[value.isActive?'activeYear':'']"
				@click = "barDataConfig(key)"
			>{{key}}年</li>
		</ul>
		<div class="slidebar-content" id="barCont" :style="{width:barBoxWidth}">
	        <ul class="slidebar-box">
	        	<li v-for="(item,index) in barData" @mousedown="mouseDownAtPointer($event)">
	        		<p class="slidebar-year" v-show="item.month=='01月'|| index==0">{{item.year}}</p>
	        		<div class="slidebar-month" :class="[item.isActive?'slidebar-active':'']">
	        			{{parseInt(item.month)}}月
	        		</div>
	        		<label :class="[item.isCycTime?'slidebar-cycTime':'']">
	        			第{{item.index+1}}月
	        			<span v-show="item.time == cycTime">(结束)</span>
	        		</label>
	        	</li>
	        </ul>
	        <div class="slidebar-bar" :style="{width:slidebarWith}"></div>
	        <span class="drag-btn"  :style="{left:slidebarWith}" @mousedown="mouseDownAtPointer($event)">||</span>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			startTime:{//活动开始时间
				type:String,
				default:'2017-12'
			},
			cycTime:{//活动结束时间
				type:String,
				default:'2018-05'
			},
			endTime:{//总时间（活动时间加赠送的）
				type:String,
				default:'2019-01'
			}
		},
		data(){
			return {
				dragBtnX:0,
				isDragNow: false, // 表示是否处于拖拽状态
				step:100,
				activeYear:'',
				barData:[],//拖动调的渲染数据
				barOffSet:0
			}
		},
		watch:{
			startTime(newData){
			  	//console.log(newData)
			  	let activeYear = newData.split("-", 2)[0]
				this.barData = this.barDataObj && this.barDataObj[activeYear].bar
				//console.log(this.barData)
				this.slideBarInit()//初始化拖动条样式
			}
		},
		computed:{
			slidebarWith(){//拖动条及按钮的定位可公用该变量
				return this.dragBtnX+'px'
			},
			barBoxWidth(){
				return this.barData.length*this.step +'px'
			},
			barDataObj(){//根据开始时间，结束时间处理整个拖动组件的数据对象
				let obj = {}
				let biscTimes = this.timeSep (this.startTime,this.endTime)
				let cycTime = this.timeSep (this.startTime,this.cycTime)
				this.activeYear = this.cycTime.split("-", 2)[0]
				let lastYear = null
				let startYear = biscTimes[0].split("-", 2)[0]
				//console.log(startYear,this.activeYear)
				for(let i=0;i<biscTimes.length;i++){
					let year = biscTimes[i].split("-", 2)[0]
					let month = biscTimes[i].split("-", 2)[1]
					if( year !== lastYear  ){
						obj[year] = {}
						obj[year].bar = []
						if(year == startYear ){//设置年份选项卡的第一年为激活年
							obj[year].isActive = true
						}else{
							obj[year].isActive = false
						}
					}
					if(biscTimes[i] == cycTime[i] ){
						obj[year].bar.push({
							year:year+'年',
							month:month+'月',
							time:year+'-'+month,
							isCycTime:true,
							isActive:true,
							index:i
						})
					}else{
						obj[year].bar.push({
							year:year+'年',
							month:month+'月',
							time:year+'-'+month,
							isCycTime:false,
							isActive:false,
							index:i
						})
					}
					lastYear = year
				}
				return obj
			},
		},
		methods:{
			barDataConfig(year){
				//console.log(this.endCycFlag)
				this.barData = this.barDataObj[year].bar
				for(let i in this.barDataObj){
					this.barDataObj[i].isActive = false
				}
				this.barDataObj[year].isActive = true
				this.dragBtnX =  this.barData.length*this.step
				this.barData.forEach( function(element, index) {
					element.isActive = true
				});
				this.$emit('on-change',this.barData[this.barData.length-1].time)
			},
			timeSep (startTime, endTime) {
	            let result = [];
	            if(startTime && endTime){
	            	let startTimeArr = startTime.split("-", 2);
		            let endTimeArr = endTime.split("-", 2);
		            let startYear = startTimeArr[0]; let startMonth = startTimeArr[1];
		            let endYear = endTimeArr[0]; let endMonth = endTimeArr[1];
		            let count = 0; let flag = true; //结束循环标志位
		            for (let month = startMonth, year = startYear; flag; month++) {
		                if(year==endYear&&month>endMonth){
		                	flag=false;
		                }else{
		                    if (month > 12) {
		                        year++;
		                        if (year <= endYear) { month = 0; } else { flag=false; }
		                    } else {
		                       if(month<10){ month="0"+month; }
		                        result[count] = year + "-" + month;
		                        count++;
		                    }
		                }
		            }
	            }
	            return result
	        },
	        slideBarInit(){//拖动条计算样式计算方法
				let width = 0
				for(let i=0;i<this.barData.length;i++){
					width += this.step
					this.barData[i].isActive = true
				}
				this.dragBtnX = width
			},
			mouseDownAtPointer(event){
				this.isDragNow = true
			},
			mousemoveListener(event){
				this.barOffSet = document.getElementById('barCont').offsetLeft
	        	//console.log( this.barOffSet )
				const context =this
				let max = this.barData.length*this.step
				if(this.isDragNow){
					if( (event.clientX-this.barOffSet)>max || event.clientX<this.barOffSet){
						console.log('超出有效范围值')
						return
					}else{
						this.dragBtnX = event.clientX-this.barOffSet
					}
				}
			},
			mouseupListener(event) {
				this.barOffSet = document.getElementById('barCont').offsetLeft
        		//console.log( this.barOffSet )
		      let max = this.barData.length*this.step
		      let index = 0
		      if(this.isDragNow){
		      	  if((event.clientX-this.barOffSet)>max){
			      	console.log('超出最大有效范围')
			      	index = this.barData.length-1
			      }else if( event.clientX<this.barOffSet ){
			      	console.log('超出最小有效范围')
			      	index = 0
			      }else{
			      	index = parseInt( (event.clientX-this.barOffSet)/this.step )
			      }
			      this.dragBtnX = (index+1)*this.step
			      this.barData[index].isActive = true
			      let i=index
			      while ( i<this.barData.length ) {
			      	this.barData[i].isActive = false;
			      	i++;
			      }
			      let j = index
			      while ( j>=0 ) {
			      	this.barData[j].isActive = true;
			      	j--;
			      }
			      let newEndTime = this.barData[index].time
			      this.$emit('on-change',newEndTime)
		      }
		      this.isDragNow = false
		    }
		},
		mounted(){
			//console.log(this.startTime)
			//设置第一年为激活年，拖动条默认显示第一年
			let activeYear = this.startTime && this.startTime.split("-", 2)[0]
			this.barData = this.barDataObj && this.barDataObj[activeYear].bar
			this.slideBarInit()//初始化拖动条样式
			const context = this
		    // 处理拖动选择范围
		    document.addEventListener('mousemove', context.mousemoveListener, false)
		    // 处理鼠标松开事件，取消拖动的效果
		    document.addEventListener('mouseup', context.mouseupListener, false)
		},
		beforeDestroy() {
		    const context = this
		    // 处理拖动选择范围
		    document.removeEventListener('mousemove', context.mousemoveListener, false)
		    // 处理鼠标松开事件，取消拖动的效果
		    document.removeEventListener('mouseup', context.mouseupListener, false)
		}
	}
</script>
<style scoped>
	.activeYear{
		color: #01c0c8;
	}
	.year-tab{
		position: absolute;
		top:30px;
		left: 50px;
	}
	.year-tab li{
		display: inline-block;
		width: 100px;
		text-align: center;
		cursor:pointer;
	}
	.slidebar-month{
		width: 100%;
		border-right: 1px solid #275461;
		height: 32px;
		line-height: 32px;
		margin:20px 0;
		cursor: default;
	}
	.slidebar-box li:last-child .slidebar-month{
		border:none;
	}
	.slidebar-cycTime{
		color: #01c0c8;
	}
	.slidebar-active{
		color: #fff;
	}
	 .slidebar-bar{
	    width:300px;
	    height: 32px;
	    background-color: #01c0c8;
	    position: absolute;
	    top:0px;
		left: 0px;
		z-index:5;
	  }
	.slidebar-box{
	    width: 100%;
	    position: absolute;
		top: -34px;
		left: 0px;
		z-index: 10;
		-webkit-user-select:none;
		-moz-user-select:none;
		-o-user-select:none;
		user-select:none;
	  }
  	.slidebar-box li{
		display: inline-block;
		width: 100px;
		text-align: center;
  	}
	.slidebar-content{
	    display: inline-block;
	    width:100%;
	    /*overflow-x:scroll; */
	    height: 32px;
	    background: #3e4654;
	    position: relative;
	    /*margin-left: 50px;*/
	    color: #959698;
	}
	.slidebar{
		height: 200px;
		width:100%;
		min-width: 1300px;
		/*margin: 0px auto;*/
		background-color: #4E5664;
		padding-top:100px;
		padding-bottom:40px;
		position: relative;
		text-align:center; 
	}
	.drag-btn{
	    display: inline-block;
	    width: 15px;
	    height: 34px;
	    position: absolute;
	    top:-1px;
	    left:300px;
	    cursor: pointer;
	    background-color: #FFAB00;
	    line-height: 34px;
	    text-align: center;
		z-index: 11;
		border-radius: 2px;
	  }


</style>
