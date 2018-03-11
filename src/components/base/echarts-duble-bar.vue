<template>
  <div class="line-charts" style="margin-left:100px">
    <div :id="id" style="width:1000px;height:240px;margin:0 auto"></div>
  </div>
</template> 
<script>
  // 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'hello',
  props:{
   id:{
      type:String,
      default:'1040100'
    },
    title:{
      type:String,
      default:''
    },
    allUserName:{
      type:String,
      default:'全网用户'
    },
    forBarData:{
      type:Object,
      default(){
          return {
                "xaxis": ["<=0", "0-20", "20-50", "50-100", "100-200", "200-300", "300-500", "500-800", "800-1000", "1000-"],
                "target": {
                  "value": [{"name": "苹果","value": "74"},{"name": "oppo","value": "54"},{"name": "vivo","value": "45"},{"name": "华为","value": "62"},{"name": "小米","value": "74"}],
                  "divid": "c7b8443f-3195-41ee-8b9d-515fd6ed8628",
                  "type": 1
                },
                "all": {"value": [{"name": "vivo","value": "45"},{"name": "华为","value": "62"},{"name": "苹果","value": "74"},{"name": "oppo","value": "54"},{"name": "小米","value": "74"}],
                  "divid": "a9bc4121-a984-4118-ae03-298caa1ae197",
                  "type": 2
                }
              }
        }
    },
    uint:{
      type:String,
      default:''
    }
  },
  computed:{
    xAxis(){
        let target = []
        let all = []
        this.forBarData.target.value.forEach((elem,index)=>{
          target.push(elem.name)
        });
        this.forBarData.all.value.forEach((elem,index)=>{
          all.push(elem.name)
        });
        return  {target,all}
    },
    target(){ return this.forBarData.target.value },
    all(){ return this.forBarData.all.value },
    colors(){
      let arr 
      switch(this.id.slice(0,1)){
          case '1':arr = ['#3bb9fe','#b3e4fe']; break;
          case '2':arr = ['#17f0ed','#1883e7']; break;
          case '3': arr = ['#fff701','#ff7f00']; break;
          case '4': arr = ['#17f0ed','#1883e7']; break;
          default: arr = ['#ff7f00','#35a0ee'];
        }
        return arr
    },
    maxVal(){
      let arr = this.target.concat(this.all)
      for(let i=0;i<arr.length;i++){
        arr[i] = arr[i].value
      }
      let maxNum = Math.max.apply(null, arr)+5
      return maxNum
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      //document.getElementById(this.id).innerHTML = ''
      let myChart = echarts.init(document.getElementById(this.id))
      // 绘制图表
      var myChartOption = {
         grid: [
              {x: '6%', y: '7%', width: '90%', height: '60%',top:'20%'},
              {x2: '7.5%', y: '7%', width: '90%', height: '60%',top:'20%'},
          ],
          title: {
            //text: this.title,
            bottom:10,
            left: "50%",
            textAlign: "center",
            textStyle: {
              color: "#fff",
              fontSize:16,
              fontWeight: 'normal',
            }
          },
        tooltip: {},
        color:this.colors,
        legend:{
          orient:'horizontal',
          top:0,
          left:0,
          itemWidth:14,
          data:[
                {name:'目标用户',icon:'rect',textStyle:{color:'#f7f7f7'}},
                {name:this.allUserName,icon:'rect',textStyle:{color:'#f7f7f7'}}
              ]
        },
        xAxis:[
          {//全网
            type: 'category',
            boundaryGap:0,
            gridIndex: 0,
            position:'bottom',
            axisLabel: { margin:10,interval:0, rotate:-10,textStyle:{fontSize:14,color:'#f7f7f7'},
                formatter:function(val){
                    if(val.length>2){
                        if(/^[a-zA-Z]/.test(val)){
                          //console.log('首字母是英语')
                          return val.substring(0,6)+'...'
                        }else{
                          return val.substring(0,2)+'...'
                        }
                    }else{
                        return val;
                    }
                }
            },
            axisLine: { show: true,lineStyle:{color:'#6C727D'} }, // X轴线默认true
            axisTick: { show: true, alignWithLabel: true }, //坐标刻度默认显示true
            splitLine: { show: false }, //取消与X轴平行的标准线
            //data: ["oppo","华为", "小米", "苹果","vivo"]
            data:this.xAxis.all
          },{//目标
            type: 'category',
            boundaryGap:0,
            gridIndex: 1,
            position:'bottom',
            axisLabel: { margin:18,interval:0, rotate:-10,textStyle:{fontSize:14,color:'#f7f7f7'},
                formatter:function(val){
                    if(val.length>6){
                        return val.substring(0,6)+'...'
                    }else{
                        return val;
                    }
                }
            },
            axisLine: { show: true,lineStyle:{color:'#6C727D'} }, // X轴线默认true
            axisTick: { show: false, alignWithLabel: false }, //坐标刻度默认显示true
            splitLine: { show: false }, //取消与X轴平行的标准线
            //data: ["华为", "小米", "苹果", "oppo", "vivo"]
            data:this.xAxis.target
          }
        ],
        yAxis:[
          {
            gridIndex: 0,
             max:this.maxVal,
            position:'left',
            nameTextStyle:{color:'#fff'},
            type: 'value',
            axisLabel: { show:false,margin:0,interval:0, textStyle:{ fontSize:14,color:'#fff'} },
            axisLine: { show: false }, // y轴线默认true
            axisTick: { show: false }, //坐标刻度默认显示true
            splitLine: { show: false }, //取消与X轴平行的标准线
          },{
            gridIndex:1,
             max:this.maxVal,
            position:'left',
            nameTextStyle:{color:'#fff'},
            type: 'value',
            axisLabel: { show:false,margin:0,interval:0, textStyle:{ fontSize:14,color:'#fff'} },
            axisLine: { show: false }, // y轴线默认true
            axisTick: { show: false }, //坐标刻度默认显示true
            splitLine: { show: false }, //取消与X轴平行的标准线
          }
        ] ,
        series: [{
          name: this.allUserName,
          xAxisIndex:0,
          yAxisIndex:0,
          type: 'bar',
          barWidth:30,
          areaStyle: {normal: {opacity:0.2}},
          label: {
            normal: {
              position: "top",
              show: true,
              textStyle: {
                color: '#f7f7f7',
                fontSize:14,
                fontWeight:200,
              },
              formatter: function(obj) {
                return obj.value+'%';
              }
            }
          },
          //data: [30, 36, 60, 20, 90]
          data:this.all
        },{
          name:'目标用户',
          type: 'bar',
          xAxisIndex:1,
          yAxisIndex:1,
          barWidth: 30,
          label: {
            normal: {
              position: "top",
              show: true,
              textStyle: {
                color: '#f7f7f7',
                fontSize:14,
                fontWeight:200,
              },
              formatter: function(obj) {
                return obj.value+'%';
              }
            }
          },
          //data: [90, 70,60, 76, 50]
          data:this.target
        }
        ]
      }
      myChart.setOption( myChartOption );
    }

  }
}
</script> 
<style scoped>
  .line-charts{
    margin-top:20px;
  }
</style>
